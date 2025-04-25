import { Schema } from 'mongoose';
import { MapEntitySchema } from './map-entity.schema';

export const MapEntityReplaySchema: Schema = new Schema({
    entity: MapEntitySchema,
    positions: [{x: Number, y: Number, timestamp: Date}],
    createdAt: Date,
    deletedAt: Date
});