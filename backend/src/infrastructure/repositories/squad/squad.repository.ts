import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ISquadRepository } from "src/core/squad/interfaces/squad.repository.interface";
import { DbSquadDocument, DbSquad } from "./schemas/squad.schema";
import { Squad } from "proto/trx/trx.squad";

@Injectable()
export class SquadRepository implements ISquadRepository {

    constructor(
        @InjectModel("DbSquad") private squadModel: Model<DbSquadDocument>
    ) {}


    public async delete(squad: Squad): Promise<void> {
        await this.squadModel.deleteOne({name: squad.name}).exec();
    }

    public async store(squad: Squad): Promise<void> {
        return this.upsert(squad);
    }

    public async get(): Promise<Squad[]>;
    public async get(name: string): Promise<Squad>;
    public async get(name?: unknown): Promise<Squad[] | Squad> {
        if (typeof name === 'string') {
            return await this.squadModel.findOne({name: name}).exec();
        } else {
            const squads = await this.squadModel.find().exec();
            return squads.map(squad => DbSquad.toProto(squad));
        }
    }

    public async exists(entity: Squad): Promise<boolean> {
        return await this.squadModel.exists({name: entity.name}) !== null;
    }

    private async upsert(squad: Squad): Promise<void> {
        let dbSquad = await this.squadModel.findOne({name: squad.name}).exec();
        
        if(dbSquad) {        
            dbSquad.state = squad.state ? squad.state : dbSquad.state;
            dbSquad.combattants = squad.combattants ? squad.combattants : dbSquad.combattants;
            dbSquad.callsign = squad.callsign ? squad.callsign : dbSquad.callsign
            dbSquad.position = squad.position ? squad.position : dbSquad.position
            
            await dbSquad.save();
        } else {
            dbSquad = new this.squadModel(DbSquad.fromProto(squad));
            await dbSquad.save();
        }
    }

}