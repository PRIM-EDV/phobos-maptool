import { Module } from '@nestjs/common';
import { MapEntityRpcAdatper } from './map-entity.rpc.adapter';


@Module({
    providers: [{
        provide: 'MapEntityRpcAdapter',
        useClass: MapEntityRpcAdatper
    }],
    exports: [{
        provide: 'MapEntityRpcAdapter',
        useClass: MapEntityRpcAdatper
    }]
})
export class MapEntityRpcModule {}