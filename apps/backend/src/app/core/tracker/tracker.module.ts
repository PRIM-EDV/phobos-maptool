import { Module } from '@nestjs/common';
import { TrackerService } from './tracker.service';
import { TrackerRepositoryModule } from 'src/app/infrastructure/repositories/tracker/tracker.repository.module';
import { TrackerRpcModule } from 'src/app/infrastructure/rpc/tracker/tracker.rpc.module';

@Module({
    imports: [
        TrackerRepositoryModule,
        TrackerRpcModule
    ],
    providers: [
        TrackerService
    ],
    exports: [
        TrackerService
    ]
})
export class TrackerModule {}
