import { Module } from '@nestjs/common';
import { MapApiService } from './map.api.service';
import { MapApiController } from './map.api.controller';
import { CoreModule } from 'src/core/core.module';

@Module({
    imports: [
        CoreModule
    ],
    providers: [
        MapApiController,
        MapApiService
    ],
    exports: [MapApiService]
})
export class MapApiModule { }