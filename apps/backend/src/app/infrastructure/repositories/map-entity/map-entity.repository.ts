import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { MapEntity } from "@phobos-maptool/models";

import { Model } from "mongoose";
import { IMapEntityRepository } from "src/app/core/map-entity/interfaces/map-entity.repository.interface";

@Injectable()
export class MapEntityRepository implements IMapEntityRepository {


    constructor(
        @InjectModel("MapEntity") private mapEntityModel: Model<MapEntity>
    ) {}

    public async delete(entity: MapEntity): Promise<void> {
        await this.mapEntityModel.deleteMany({uuid: entity.id}).exec();
    }

    public async store(entity: MapEntity): Promise<void> {
        return this.upsert(entity);
    }

    public async get(): Promise<MapEntity[]> {
        const entities = await this.mapEntityModel.find().exec();
        return entities.map(entity => entity.toObject());
    }

    public async getBySquadName(name: string): Promise<MapEntity | null> {
        const mapEntityDbo = await this.mapEntityModel.findOne({"squad.name": name}).exec();
        return mapEntityDbo ? mapEntityDbo.toObject() : null;
    }

    private async upsert(entity: MapEntity): Promise<void> {
        let mapEntityDbo = await this.mapEntityModel.findOne({id: entity.id}).exec();
        if(mapEntityDbo) {
            mapEntityDbo.id = entity.id;
            mapEntityDbo.position = entity.position;
            mapEntityDbo.type = entity.type;
            mapEntityDbo.entity = entity.entity;
            mapEntityDbo.save();
        } else {
            mapEntityDbo = new this.mapEntityModel(entity);
            await mapEntityDbo.save();
        }
    }
}