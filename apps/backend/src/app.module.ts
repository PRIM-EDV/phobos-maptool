import { join } from 'path';
import { Global, MiddlewareConsumer, Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';

import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppGateway } from './app.gateway';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { WinstonLoggerModule } from './infrastructure/logger/winston/winston.logger.module';
import { MapEntityModule } from './core/map-entity/map-entity.module';
import { SquadModule } from './core/squad/squad.module';
import { WebSocketAuthMiddleware } from './api/auth/websocket-auth.middleware';
import { MapApiModule } from './api/map/map.api.module';
import { SquadApiModule } from './api/squad/squad.api.module';
import { AuthModule } from './infrastructure/auth/auth.module';

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
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
  controllers: [AppController],
  providers: [AppGateway],
  exports: [AppGateway]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(WebSocketAuthMiddleware).forRoutes(AppGateway);
  }
}
