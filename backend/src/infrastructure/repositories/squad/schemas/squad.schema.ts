import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Squad, SquadState } from 'proto/trx/trx.squad';

export type DbSquadDocument = DbSquad & Document;

@Schema()
export class DbSquad {
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

    public static fromProto(squad: Squad): DbSquad {
        const dbo = new DbSquad();
        
        dbo.name = squad.name;
        dbo.callsign = squad.callsign ? squad.callsign : "NN";
        dbo.state = squad.state ? squad.state : SquadState.SQUAD_STATE_UNSTAGED;
        dbo.combattants = squad.combattants ? squad.combattants : 0; 
        dbo.position = squad.position ? squad.position : 0;
        
        return dbo;
    }

    public static toProto(dbo: DbSquad): Squad {
        const squad: Squad = {
            name: dbo.name,
            callsign: dbo.callsign,
            state: dbo.state,
            combattants: dbo.combattants,
            position: dbo.position
        }

        return squad;
    }
}

export const DbSquadSchema = SchemaFactory.createForClass(DbSquad);