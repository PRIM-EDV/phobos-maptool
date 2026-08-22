import { Module } from '@nestjs/common';
import { WinstonLoggerModule } from '@phobos/infrastructure';

import { TrackerApiController } from './tracker.api.controller';
import { TrackerModule } from 'src/app/core/tracker/tracker.module';

@Module({
    imports: [
        TrackerModule,
        WinstonLoggerModule
    ],
    providers: [
        TrackerApiController
    ],
})
export class TrackerApiModule {
}
