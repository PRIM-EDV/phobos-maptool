import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Tracker, TrackerPosition, TrackerType } from '@phobos-maptool/models';

@Schema()
export class TrackerDbo implements Tracker {
    @Prop({required: true, unique: true})
    id: string;

    @Prop({required: true, unique: false, enum: TrackerType})
    type: TrackerType;

    @Prop({required: true, unique: false, type: { x: { type: Number }, y: { type: Number } }})
    position: TrackerPosition;

    @Prop({ required: true, default: Date.now })
    lastUpdated: Date;
}

export const TrackerSchema = SchemaFactory.createForClass(TrackerDbo);
