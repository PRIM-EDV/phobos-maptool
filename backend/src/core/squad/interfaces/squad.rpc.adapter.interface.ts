import { Squad } from "@phobos-maptool/models";

export interface ISquadRpcAdapter {
    delete(entity: Squad): Promise<void>;
    set(entity: Squad): Promise<void>;
}