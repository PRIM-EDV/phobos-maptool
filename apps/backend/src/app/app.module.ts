import { Global, MiddlewareConsumer, Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { join } from 'node:path';
import { parseArgs } from 'node:util';

import { AppGateway } from './app.gateway';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { WinstonLoggerModule } from './infrastructure/logger/winston/winston.logger.module';
import { MapEntityModule } from './core/map-entity/map-entity.module';
import { SquadModule } from './core/squad/squad.module';
import { MapApiModule } from './api/map/map.api.module';
import { SquadApiModule } from './api/squad/squad.api.module';
import { AuthModule } from './infrastructure/auth/auth.module';

import environment  from 'src/environments/environment';
import environmentDevelopment from 'src/environments/environment.development';

const { values } = parseArgs({
  options: {
    configuration: { type: 'string' },
  },
});

const MONGO_DB_HOST = process.env.MONGO_DB_HOST ? process.env.MONGO_DB_HOST : 'localhost'

@Global()
@Module({
  imports: [
    AuthModule,
    MapApiModule,
    SquadApiModule,
    MapEntityModule,
    SquadModule,
    WinstonLoggerModule,
    EventEmitterModule.forRoot(),
    MongooseModule.forRoot(`mongodb://${MONGO_DB_HOST}/prim`),
    ConfigModule.forRoot({
      load: [ values.configuration == "development" ? environmentDevelopment : environment ],
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'public'),
      exclude: ['/auth/'],
    }),
  ],
  controllers: [],
  providers: [AppGateway],
  exports: [AppGateway]
})
export class AppModule {
}
