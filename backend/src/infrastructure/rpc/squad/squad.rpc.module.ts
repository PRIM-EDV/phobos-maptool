import { Module } from '@nestjs/common';
import { SquadRpcAdapter } from './squad.rpc.adapter';
import { SquadDtoModule } from 'src/common/dtos/squad/squad.dto.module';
import { WinstonLoggerModule } from 'src/infrastructure/logger/winston/winston.logger.module';

@Module({
    imports: [
        SquadDtoModule,
        WinstonLoggerModule
    ],
    providers: [{
        provide: 'SquadRpcAdapter',
        useClass: SquadRpcAdapter 
    }],
    exports: [{
        provide: 'SquadRpcAdapter',
        useClass: SquadRpcAdapter 
    }]
})
export class SquadRpcModule {}