import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MapEntityObjective, } from '@phobos-maptool/models';

import { MapEntityBaseDbo } from './map-entity-base.schema';

@Schema()
export class MapEntityObjectiveDbo extends MapEntityBaseDbo {
  @Prop({
    required: true,
    type: { 
      name: { type: String, required: true },
      description: { type: String },
    },
  })
  entity: MapEntityObjective;
}
export const MapEntityObjectiveSchema = SchemaFactory.createForClass(MapEntityObjectiveDbo);
