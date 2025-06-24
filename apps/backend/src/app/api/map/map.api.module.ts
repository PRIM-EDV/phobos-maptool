import { Module } from '@nestjs/common';
import { MapApiController } from './map.api.controller';
import { MapEntityModule } from 'src/app/core/map-entity/map-entity.module';
import { WinstonLoggerModule } from 'src/app/infrastructure/logger/winston/winston.logger.module';

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