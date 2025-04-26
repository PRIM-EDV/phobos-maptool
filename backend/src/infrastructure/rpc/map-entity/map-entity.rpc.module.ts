import { Module } from '@nestjs/common';
import { MapEntityRpcAdatper } from './map-entity.rpc.adapter';
import { MapEntityDtoModule } from 'src/common/dtos/map-entity/map-entity.dto.module';


@Module({
    imports: [
        MapEntityDtoModule
    ],
    providers: [{
        provide: 'MapEntityRpcAdapter',
        useClass: MapEntityRpcAdatper
    }],
    exports: [
        {
            provide: 'MapEntityRpcAdapter',
            useClass: MapEntityRpcAdatper
        }
    ]
})
export class MapEntityRpcModule { }