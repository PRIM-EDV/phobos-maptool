import { MapEntity } from "@phobos-maptool/models";

export interface IMapEntityRpcAdapter {
    delete(entity: MapEntity): Promise<void>;
    set(entity: MapEntity): Promise<void>;
}