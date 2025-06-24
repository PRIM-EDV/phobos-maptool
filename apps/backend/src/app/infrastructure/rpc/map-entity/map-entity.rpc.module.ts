import { Module } from '@nestjs/common';
import { MapEntityRpcAdatper } from './map-entity.rpc.adapter';
import { WinstonLoggerModule } from 'src/app/infrastructure/logger/winston/winston.logger.module';


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