import { Module } from '@nestjs/common';
import { SquadRpcAdapter } from './squad.rpc.adapter';
import { SquadDtoModule } from 'src/common/dtos/squad/squad.dto.module';

@Module({
    imports: [
        SquadDtoModule
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