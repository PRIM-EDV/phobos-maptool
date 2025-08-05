import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MapEntityBase } from '@phobos-maptool/models';

import { HydratedDocument } from 'mongoose';

export type MapEntityDocument = HydratedDocument<MapEntityBaseDbo>;

@Schema({ discriminatorKey: 'type' })
export class MapEntityBaseDbo implements MapEntityBase {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true, type: { x: { type: Number }, y: { type: Number } }})
  position: {
    x: number;
    y: number;
  };

  @Prop()
  notes?: string;
}

export const MapEntityBaseSchema = SchemaFactory.createForClass(MapEntityBaseDbo);

MapEntityBaseSchema.set('toObject', {
  transform: (doc, ret) => {
    ret["type"] = parseInt(ret["type"]);

    return ret;
  },
});