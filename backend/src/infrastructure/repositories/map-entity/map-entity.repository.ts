import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IMapEntityRepository } from "src/core/map-entity/interfaces/map-entity.repository.interface";
import { DbMapEntity, DbMapEntityDocument } from "./schemas/map-entity.schema";
import { MapEntity } from "proto/trx/trx.entity";

@Injectable()
export class MapEntityRepository implements IMapEntityRepository {

    constructor(
        @InjectModel("DbMapEntity") private mapEntityModel: Model<DbMapEntityDocument>
    ) {}

    public async delete(entity: MapEntity): Promise<void> {
        await this.mapEntityModel.deleteMany({uuid: entity.id}).exec();
    }

    public async store(entity: MapEntity): Promise<void> {
        return this.upsert(entity);
    }

    public async get(): Promise<MapEntity[]> {
        const entities = await this.mapEntityModel.find().exec();

        return entities.map(entity => DbMapEntity.toProto(entity));
    }

    public async getBySquadName(name: string): Promise<MapEntity | null> {
        const dbMapEntity = await this.mapEntityModel.findOne({"squad.name": name}).exec();
        return dbMapEntity ? DbMapEntity.toProto(dbMapEntity) : null;
    }

    private async upsert(entity: MapEntity): Promise<void> {
        let dbMapEntity = await this.mapEntityModel.findOne({uuid: entity.id}).exec();
        if(dbMapEntity) {
            dbMapEntity.uuid = entity.id;
            dbMapEntity.position = entity.position;
            dbMapEntity.type = entity.type;
    
            if(entity.squad) {
                dbMapEntity.squad = entity.squad;
            }

            if(entity.enemy) {
                dbMapEntity.enemy = entity.enemy;
            }

            if(entity.objective) {
                dbMapEntity.objective = entity.objective;
            }
            
            dbMapEntity.save();
        } else {
            dbMapEntity = new this.mapEntityModel(DbMapEntity.fromProto(entity));
            await dbMapEntity.save();
        }
    }
}