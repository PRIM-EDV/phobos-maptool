import { Module } from '@nestjs/common';
import { SquadService } from './squad.service';
import { SquadRepositoryModule } from 'src/app/infrastructure/repositories/squad/squad.repository.module';
import { SquadRpcModule } from 'src/app/infrastructure/rpc/squad/squad.rpc.module';

@Module({
    imports: [
        SquadRepositoryModule,
        SquadRpcModule
    ],
    providers: [
        SquadService
    ],
    exports: [
        SquadService
    ]
})
export class SquadModule {}