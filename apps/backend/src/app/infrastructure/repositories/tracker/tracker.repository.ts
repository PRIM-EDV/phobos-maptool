import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { WinstonLogger } from "@phobos/infrastructure";
import { Tracker } from "@phobos-maptool/models";

import { Model } from "mongoose";
import { ITrackerRepository } from "src/app/core/tracker/interfaces/tracker.repository.interface";

@Injectable()
export class TrackerRepository implements ITrackerRepository {
    constructor(
        private readonly logger: WinstonLogger,
        @InjectModel("Tracker") private trackerModel: Model<Tracker>
    ) {}

    public async delete(tracker: Tracker): Promise<void> {
        await this.trackerModel.deleteOne({id: tracker.id}).exec();
    }

    public async store(tracker: Tracker): Promise<void> {
        return this.upsert(tracker);
    }

    public async get(): Promise<Tracker[]>;
    public async get(id: string): Promise<Tracker>;
    public async get(id?: unknown): Promise<Tracker[] | Tracker> {
        if (typeof id === 'string') {
            return await this.trackerModel.findOne({id: id}).exec();
        } else {
            const trackers = await this.trackerModel.find().exec();
            return trackers;
        }
    }

    public async exists(entity: Tracker): Promise<boolean> {
        return await this.trackerModel.exists({id: entity.id}) !== null;
    }

    private async upsert(tracker: Tracker): Promise<void> {
        try {
            let dbTracker = await this.trackerModel.findOne({id: tracker.id}).exec();
            if (dbTracker) {
                dbTracker.size = tracker.size ? tracker.size : dbTracker.size;
                dbTracker.type = tracker.type ? tracker.type : dbTracker.type;
                dbTracker.position = tracker.position ? tracker.position : dbTracker.position;
                await dbTracker.save();
            } else {
                dbTracker = new this.trackerModel(tracker);
                await dbTracker.save();
            }
        } catch (error) {
            this.logger.error(`Error upserting tracker: ${error.message}`);
        }
    }
}
