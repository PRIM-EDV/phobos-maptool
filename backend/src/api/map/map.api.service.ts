import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MapApiService {
    constructor(
        // @InjectModel("DbMapEntity") private mapEntityModel: Model<DbMapEntityDocument>
    ) {}

    public async setTracker(tracker: any) {
        // const entities = await this.mapEntityModel.find({"squad.trackerId": tracker.id}).exec();

        // for(const entity of entities) {
        //     entity.position = tracker.postion;
        //     entity.save();

        //     const req: Request = {
        //         setMapEntity: { entity: DbMapEntity.toProto(entity)}
        //     };
        //     this.gateway.requestAll(req);
        // }
    }
}
