import { Module } from '@nestjs/common';
import { SquadRpcAdapter } from './squad.rpc.adapter';
import { WinstonLoggerModule } from 'src/infrastructure/logger/winston/winston.logger.module';

@Module({
    imports: [
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