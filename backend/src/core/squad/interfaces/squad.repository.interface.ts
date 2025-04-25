import { Squad } from "src/core/common/models/squad";

export interface ISquadRepository {
    delete(entity: Squad): Promise<void>;
    store(entity: Squad): Promise<void>;

    get(): Promise<Squad[]>;
    get(name: string): Promise<Squad>;

    exists(entity: Squad): Promise<boolean>;
}