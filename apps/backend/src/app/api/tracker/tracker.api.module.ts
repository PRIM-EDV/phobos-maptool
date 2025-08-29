import { Module } from '@nestjs/common';
import { WinstonLoggerModule } from 'src/app/infrastructure/logger/winston/winston.logger.module';
import { TrackerApiController } from './tracker.api.controller';
import { MapEntityModule } from 'src/app/core/map-entity/map-entity.module';

@Module({
    imports: [
        MapEntityModule,
        WinstonLoggerModule
    ],
    providers: [
        TrackerApiController
    ],
})
export class TrackerApiModule {
}