import { Tracker } from "@phobos-maptool/models";

export interface ITrackerRepository {
    delete(entity: Tracker): Promise<void>;
    store(entity: Tracker): Promise<void>;

    get(): Promise<Tracker[]>;
    get(id: string): Promise<Tracker>;

    exists(entity: Tracker): Promise<boolean>;
}
