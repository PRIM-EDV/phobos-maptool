import { Global, Inject, MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AngularDevProxyMiddleware, AuthModule, WinstonLogger, WinstonLoggerModule } from '@phobos/infrastructure';

import { join } from 'node:path';

import { AppGateway } from './app.gateway';
import { MapEntityModule } from './core/map-entity/map-entity.module';
import { SquadModule } from './core/squad/squad.module';
import { MapApiModule } from './api/map/map.api.module';
import { SquadApiModule } from './api/squad/squad.api.module';
import { TrackerApiModule } from './api/tracker/tracker.api.module';

import { parseArgs } from 'node:util';

const MONGO_DB_HOST = process.env.MONGO_DB_HOST ? process.env.MONGO_DB_HOST : 'localhost'

@Global()
@Module({
  imports: [
    AuthModule,
    MapApiModule,
    SquadApiModule,
    MapEntityModule,
    TrackerApiModule,
    SquadModule,
    WinstonLoggerModule,
    EventEmitterModule.forRoot(),
    MongooseModule.forRoot(`mongodb://${MONGO_DB_HOST}/maptool`),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'public'),
    }),
  ],
  controllers: [],
  providers: [AppGateway],
  exports: [AppGateway]
})
export class AppModule {
  constructor(private readonly logger: WinstonLogger) {
    this.logger.setContext(AppModule.name);
  }

  configure(consumer: MiddlewareConsumer) {
    const { values } = parseArgs({ options: { configuration: { type: 'string' } } });
    const configurations = values.configuration ? values.configuration.split(',') : [];

    // Workaround: mirrord Community Edition supports mirroring only one process.
    // This middleware enables the NestJS server to proxy requests to the local Angular Dev Server,
    // allowing both to run in parallel in development mode during local development.
    if (configurations.includes('proxy')) {
      this.logger.log('Using Angular Dev Proxy Middleware');
      consumer
        .apply(AngularDevProxyMiddleware)
        .forRoutes({ path: '*', method: RequestMethod.ALL });
    }
  }
}
