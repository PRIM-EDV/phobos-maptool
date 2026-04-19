import { Module } from '@nestjs/common';
import { WinstonLoggerModule } from '@phobos/infrastructure';

import { SquadRpcAdapter } from './squad.rpc.adapter';

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