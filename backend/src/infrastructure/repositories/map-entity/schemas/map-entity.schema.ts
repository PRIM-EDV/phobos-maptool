import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { MapEntityType, MapEntity, MapEntityStatus } from 'proto/trx/trx.entity';

export type DbMapEntityDocument = DbMapEntity & Document;

@Schema()
export class DbMapEntity {
    @Prop({required: true, unique: true})
    uuid: string;

    @Prop({required: true, enum: MapEntityType})
    type: number;

    @Prop({type: {x: {type: Number}, y: {type: Number}}})
    position: { x: number, y: number };

    @Prop({type: {name: { type: String }, callsign: { type: String }, trackerId: { type: Number }, combattants: { type: Number }, status: { type: Number }}})
    squad?: {
        name: string,
        callsign: string,
        trackerId: number,
        combattants: number,
        status: number
    }

    @Prop({type: {combattants: {type: Number}}})
    enemy?: {
        combattants: number
    }
    
    @Prop({type: {name: { type: String }, description: { type: String }}})
    objective?: {
        name: string,
        description: string,
    }

    public static fromProto(entity: MapEntity) {
        const dbo = new DbMapEntity();
        
        dbo.uuid = entity.id;
        dbo.position = entity.position;
        dbo.type = entity.type;

        if(entity.squad) {
            dbo.squad = entity.squad;
        }

        if(entity.enemy) {
            dbo.enemy = entity.enemy;
        }

        if(entity.objective) {
            dbo.objective = entity.objective;
        }


        return dbo;
    }

    public static toProto(dbo: DbMapEntity): MapEntity {
        const entity: MapEntity = {
            id: dbo.uuid,
            position: dbo.position,
            type: dbo.type
        }

        if(dbo.squad) {
            entity.squad = dbo.squad;
        }

        if(dbo.enemy) {
            entity.enemy = dbo.enemy;
        }

        if(dbo.objective) {
            entity.objective = dbo.objective;
        }

        return entity;
    }
}

export const MapEntitySchema = SchemaFactory.createForClass(DbMapEntity);
