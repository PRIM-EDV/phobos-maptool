import { Module } from '@nestjs/common';
import { SquadApiController } from './squad.api.controller';
import { SquadModule } from 'src/core/squad/squad.module';
import { SquadDtoModule } from 'src/common/dtos/squad/squad.dto.module';

@Module({
    imports: [
        SquadModule,
        SquadDtoModule
    ],
    providers: [
        SquadApiController
    ],
})
export class SquadApiModule {
}