import { Squad } from "proto/trx/trx.squad";

export interface ISquadRpcAdapter {
    delete(entity: Squad): Promise<void>;
    set(entity: Squad): Promise<void>;
}