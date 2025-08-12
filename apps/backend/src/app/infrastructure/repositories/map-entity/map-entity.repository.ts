import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { MapEntity, MapEntityType } from "@phobos-maptool/models";

import { Model } from "mongoose";
import { IMapEntityRepository } from "src/app/core/map-entity/interfaces/map-entity.repository.interface";
import { WinstonLogger } from "../../logger/winston/winston.logger";

@Injectable()
export class MapEntityRepository implements IMapEntityRepository {
    constructor(
        private readonly logger: WinstonLogger,
        @InjectModel("MapEntity") private mapEntityModel: Model<MapEntity>
    ) {
        this.logger.setContext("MapEntityRepository");
    }

    public async delete(entity: MapEntity): Promise<void> {

        await this.mapEntityModel.deleteMany({id: entity.id}).exec();
    }

    public async store(entity: MapEntity): Promise<void> {
        return this.upsert(entity);
    }

    public async get(): Promise<MapEntity[]> {
        const entities = await this.mapEntityModel.find().exec();
        return entities.map(entity => entity.toObject());
    }

    public async getBySquadName(name: string): Promise<MapEntity | null> {
        const mapEntityDbo = await this.mapEntityModel.findOne({"type": MapEntityType.FRIEND, "entity.name": name}).exec();
        return mapEntityDbo ? mapEntityDbo.toObject() : null;
    }

    private async upsert(entity: MapEntity): Promise<void> {
        try {
            let mapEntityDbo = await this.mapEntityModel.findOne({id: entity.id}).exec();
            if(mapEntityDbo) {
                mapEntityDbo.id = entity.id;
                mapEntityDbo.position = entity.position;
                mapEntityDbo.notes = entity.notes ?? "";
                mapEntityDbo.type = entity.type;
                mapEntityDbo.entity = entity.entity;
                mapEntityDbo.symbol = entity.symbol ?? -1;
                await mapEntityDbo.save();
            } else {
                mapEntityDbo = new this.mapEntityModel(entity);
                await mapEntityDbo.save();
            }
        } catch (error) {
            this.logger.error(`Error upserting map entity: ${error.message}`);
        }
    }
}