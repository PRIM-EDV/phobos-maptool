import { Module } from '@nestjs/common';
import { MapApiController } from './map.api.controller';
import { MapEntityModule } from 'src/core/map-entity/map-entity.module';
import { WinstonLoggerModule } from 'src/infrastructure/logger/winston/winston.logger.module';

@Module({
    imports: [
        MapEntityModule,
        WinstonLoggerModule,
    ],
    providers: [
        MapApiController,
    ],
    exports: []
})
export class MapApiModule { }