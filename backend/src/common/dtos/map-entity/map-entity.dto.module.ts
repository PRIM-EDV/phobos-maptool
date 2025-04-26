import { Module } from '@nestjs/common';
import { MapEntityDtoService } from './map-entity.dto.service';

@Module({
    providers: [
        MapEntityDtoService
    ],
    exports: [
        MapEntityDtoService
    ]
})
export class MapEntityDtoModule {}