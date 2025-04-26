import { Module } from '@nestjs/common';
import { MapApiController } from './map.api.controller';
import { MapEntityDtoModule } from 'src/common/dtos/map-entity/map-entity.dto.module';
import { MapEntityModule } from 'src/core/map-entity/map-entity.module';
import { WinstonLoggerModule } from 'src/infrastructure/logger/winston/winston.logger.module';

@Module({
    imports: [
        MapEntityModule,
        MapEntityDtoModule,
        WinstonLoggerModule,
    ],
    providers: [
        MapApiController,
    ],
    exports: []
})
export class MapApiModule { }