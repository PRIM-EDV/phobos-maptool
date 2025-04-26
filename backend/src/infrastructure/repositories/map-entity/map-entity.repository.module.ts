import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MapEntityRepository } from './map-entity.repository';
import { MapEntitySchema } from './schemas/map-entity.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: "MapEntity", schema: MapEntitySchema }])],
    providers: [{
        provide: 'MapEntityRepository',
        useClass: MapEntityRepository
    }],
    exports: [{
        provide: 'MapEntityRepository',
        useClass: MapEntityRepository
    }]
})
export class MapEntityRepositoryModule { }