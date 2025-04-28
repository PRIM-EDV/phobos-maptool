import { Squad } from "@phobos-maptool/models";

export interface ISquadRepository {
    delete(entity: Squad): Promise<void>;
    store(entity: Squad): Promise<void>;

    get(): Promise<Squad[]>;
    get(name: string): Promise<Squad>;

    exists(entity: Squad): Promise<boolean>;
}