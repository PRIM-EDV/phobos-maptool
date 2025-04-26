import { Module } from '@nestjs/common';
import { SquadApiController } from './squad.api.controller';
import { SquadModule } from 'src/core/squad/squad.module';
import { SquadDtoModule } from 'src/common/dtos/squad/squad.dto.module';
import { WinstonLoggerModule } from 'src/infrastructure/logger/winston/winston.logger.module';

@Module({
    imports: [
        SquadModule,
        SquadDtoModule,
        WinstonLoggerModule
    ],
    providers: [
        SquadApiController
    ],
})
export class SquadApiModule {
}