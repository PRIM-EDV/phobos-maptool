import { MapEntity } from "src/core/common/models/map-entity";

export interface IMapEntityRpcAdapter {
    delete(entity: MapEntity): Promise<void>;
    set(entity: MapEntity): Promise<void>;
}