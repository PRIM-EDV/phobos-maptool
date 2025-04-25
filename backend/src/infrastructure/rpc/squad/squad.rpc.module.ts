import { Module } from '@nestjs/common';
import { SquadRpcAdapter } from './squad.rpc.adapter';

@Module({
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