import { Inject, Injectable } from "@nestjs/common";
import { Tracker } from "@phobos-maptool/models";

import { ITrackerRepository } from "./interfaces/tracker.repository.interface";

const TrackerRepository = () => Inject('TrackerRepository');

@Injectable()
export class TrackerService {
    constructor(
        @TrackerRepository() private readonly trackerRepository: ITrackerRepository,
    ) {}

    public async place(tracker: Tracker): Promise<void> {
        return await this.trackerRepository.store(tracker);
    }

    public async remove(tracker: Tracker): Promise<void> {
        return await this.trackerRepository.delete(tracker);
    }

    public async getAll(): Promise<Tracker[]> {
        return await this.trackerRepository.get();
    }

    public async getById(id: string): Promise<Tracker> {
        return await this.trackerRepository.get(id);
    }
}
