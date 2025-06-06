import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MapEntitySquad, MapEntityStatus } from '@phobos-maptool/models';

import { MapEntityBaseDbo } from './map-entity-base.schema';

@Schema()
export class MapEntitySquadDbo extends MapEntityBaseDbo {
  @Prop({
    required: true,
    type: { 
      name: { type: String }, 
      callsign: { type: String },
      trackerId: { type: Number },
      combattants: { type: Number },
      status: { type: Number, enum: MapEntityStatus }
    },
  })
  entity: MapEntitySquad;
}
export const MapEntitySquadSchema = SchemaFactory.createForClass(MapEntitySquadDbo);
