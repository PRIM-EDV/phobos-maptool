import { Module } from '@nestjs/common';
import { SquadApiController } from './squad.api.controller';
import { SquadModule } from 'src/app/core/squad/squad.module';
import { WinstonLoggerModule } from 'src/app/infrastructure/logger/winston/winston.logger.module';

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