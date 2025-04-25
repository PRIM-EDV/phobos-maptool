import { Squad } from "src/core/common/models/squad";

export interface ISquadRpcAdapter {
    delete(entity: Squad): Promise<void>;
    set(entity: Squad): Promise<void>;
}