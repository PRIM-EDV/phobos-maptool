import { Tracker } from "@phobos-maptool/models";

export interface ITrackerRpcAdapter {
    set(entity: Tracker): Promise<void>;
}
