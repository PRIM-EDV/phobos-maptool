import { Module } from '@nestjs/common';
import { WinstonLoggerModule } from '@phobos/infrastructure';

import { MapApiController } from './map.api.controller';
import { MapEntityModule } from 'src/app/core/map-entity/map-entity.module';

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