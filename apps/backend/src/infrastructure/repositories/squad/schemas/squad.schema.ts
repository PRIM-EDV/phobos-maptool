import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Squad, SquadState } from '@phobos-maptool/models';
import { HydratedDocument } from 'mongoose';

// export type SquadDocument = HydratedDocument<SquadDbo>;

@Schema()
export class SquadDbo implements Squad {
    @Prop({required: true, unique: true})
    name: string; 

    @Prop({required: true, unique: false})
    callsign: string;

    @Prop({required: true, unique: false, enum: SquadState}) 
    state: SquadState;

    @Prop({required: false, unique: false})
    combattants: number;

    @Prop({required: false, unique: false})
    position: number;
}

export const SquadSchema = SchemaFactory.createForClass(SquadDbo);