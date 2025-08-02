import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MapEntityFoe } from '@phobos-maptool/models';

import { MapEntityBaseDbo } from './map-entity-base.schema';

@Schema()
export class MapEntityFoeDbo extends MapEntityBaseDbo {
  @Prop({
    required: true,
    type: { 
      combattants: { type: Number, required: true },
    },
  })
  entity: MapEntityFoe;
}
export const MapEntityFoeSchema = SchemaFactory.createForClass(MapEntityFoeDbo);
