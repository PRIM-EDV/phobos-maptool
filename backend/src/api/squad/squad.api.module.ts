import { Module } from '@nestjs/common';
import { SquadApiController } from './squad.api.controller';
import { CoreModule } from 'src/core/core.module';

@Module({
    imports: [
        CoreModule
    ],
    providers: [
        SquadApiController
    ],
})
export class SquadApiModule {
}