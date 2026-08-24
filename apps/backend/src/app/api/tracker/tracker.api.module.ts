import { Module } from '@nestjs/common';
import { WinstonLoggerModule } from '@phobos/infrastructure';
import { MapEntityModule } from 'src/app/core/map-entity/map-entity.module';

import { TrackerApiController } from './tracker.api.controller';
import { TrackerModule } from 'src/app/core/tracker/tracker.module';

@Module({
    imports: [
        MapEntityModule,
        TrackerModule,
        WinstonLoggerModule
    ],
    providers: [
        TrackerApiController
    ],
})
export class TrackerApiModule {
}
