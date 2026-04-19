import { Module } from '@nestjs/common';
import { WinstonLoggerModule } from '@phobos/infrastructure';

import { SquadApiController } from './squad.api.controller';
import { SquadModule } from 'src/app/core/squad/squad.module';

@Module({
    imports: [
        SquadModule,
        WinstonLoggerModule
    ],
    providers: [
        SquadApiController
    ],
})
export class SquadApiModule {
}