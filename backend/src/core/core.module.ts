import { Module } from '@nestjs/common';
import { MapEntityModule } from './map-entity/map-entity.module';
import { SquadModule } from './squad/squad.module';

@Module({
    imports: [
        MapEntityModule,
        SquadModule
    ],
    exports: [
        MapEntityModule,
        SquadModule
    ]
})
export class CoreModule {}