import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { MapEntity, MapEntityEnemy, MapEntityObjective, MapEntitySquad, MapEntityType } from 'src/core/common/models/map-entity';

export type MapEntityDocument = HydratedDocument<MapEntityDbo>;

@Schema()
export class MapEntityDbo implements MapEntity {
    @Prop({required: true, unique: true})
    id: string;

    @Prop({required: true, enum: MapEntityType})
    type: number;

    @Prop({type: {x: {type: Number}, y: {type: Number}}})
    position: { x: number, y: number };

    @Prop({type: [
        {combattants: {type: Number}},
        {name: { type: String }, description: { type: String }},
        {name: { type: String }, callsign: { type: String }, trackerId: { type: Number }, combattants: { type: Number }, status: { type: Number }}
    ]})
    entity: MapEntitySquad | MapEntityEnemy | MapEntityObjective;
}

export const MapEntitySchema = SchemaFactory.createForClass(MapEntityDbo);
