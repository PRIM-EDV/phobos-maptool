import { Module } from '@nestjs/common';
import { MapEntityRpcAdatper } from './map-entity.rpc.adapter';
import { MapEntityRpcService } from './map-entity.rpc.service';


@Module({
    providers: [
        MapEntityRpcService,
        {
            provide: 'MapEntityRpcAdapter',
            useClass: MapEntityRpcAdatper
        }
    ],
    exports: [
        {
            provide: 'MapEntityRpcAdapter',
            useClass: MapEntityRpcAdatper
        }
    ]
})
export class MapEntityRpcModule { }