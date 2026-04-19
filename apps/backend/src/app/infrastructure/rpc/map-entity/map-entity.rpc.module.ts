import { Module } from '@nestjs/common';
import { WinstonLoggerModule } from '@phobos/infrastructure';

import { MapEntityRpcAdatper } from './map-entity.rpc.adapter';


@Module({
    imports: [
        WinstonLoggerModule
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