import { Module } from '@nestjs/common';
import { MapEntityService } from './map-entity.service';
import { MapEntityRepositoryModule } from 'src/app/infrastructure/repositories/map-entity/map-entity.repository.module';
import { MapEntityRpcModule } from 'src/app/infrastructure/rpc/map-entity/map-entity.rpc.module';

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