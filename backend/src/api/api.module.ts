import { Module } from '@nestjs/common';
import { MapApiModule } from './map/map.api.module';
import { SquadApiModule } from './squad/squad.api.module';

@Module({
    imports: [
        MapApiModule,
        SquadApiModule
    ],
})
export class ApiModule {}