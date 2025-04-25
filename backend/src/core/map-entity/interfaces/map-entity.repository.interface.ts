import { MapEntity } from "src/core/common/models/map-entity";

export interface IMapEntityRepository {
    delete(entity: MapEntity): Promise<void>;
    store(entity: MapEntity): Promise<void>;
    get(): Promise<MapEntity[]>;
    getBySquadName(name: string): Promise<MapEntity>;
}