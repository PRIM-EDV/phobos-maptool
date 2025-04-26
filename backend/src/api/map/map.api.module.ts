import { Module } from '@nestjs/common';
import { MapApiController } from './map.api.controller';
import { MapEntityDtoModule } from 'src/common/dtos/map-entity/map-entity.dto.module';
import { MapEntityModule } from 'src/core/map-entity/map-entity.module';

@Module({
    imports: [
        MapEntityModule,
        MapEntityDtoModule
    ],
    providers: [
        MapApiController,
    ],
    exports: []
})
export class MapApiModule { }