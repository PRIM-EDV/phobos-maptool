import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MapEntityBase, MapEntityType } from '@phobos-maptool/models';

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
}
export const MapEntityBaseSchema = SchemaFactory.createForClass(MapEntityBaseDbo);