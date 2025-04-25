import { Module } from '@nestjs/common';
import { MapEntityService } from './map-entity.service';
import { MapEntityRepositoryModule } from 'src/infrastructure/repositories/map-entity/map-entity.repository.module';
import { MapEntityRpcModule } from 'src/infrastructure/rpc/map-entity/map-entity.rpc.module';

@Module({
    imports: [
        MapEntityRepositoryModule,
        MapEntityRpcModule
    ],
    providers: [
        MapEntityService
    ],
    exports: [
        MapEntityService
    ]
})
export class MapEntityModule {}