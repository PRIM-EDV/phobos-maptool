import { Global, Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AuthModule, WinstonLoggerModule } from '@phobos/infrastructure';

import { join } from 'node:path';

import { AppGateway } from './app.gateway';
import { MapEntityModule } from './core/map-entity/map-entity.module';
import { SquadModule } from './core/squad/squad.module';
import { MapApiModule } from './api/map/map.api.module';
import { SquadApiModule } from './api/squad/squad.api.module';
import { TrackerApiModule } from './api/tracker/tracker.api.module';

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
}
