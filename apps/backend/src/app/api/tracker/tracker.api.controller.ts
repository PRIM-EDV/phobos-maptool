import { fromTrackerDto, toMapEntityDto } from "@phobos-maptool/dto";
import { Request, SetTracker_Request } from '@phobos-maptool/protocol';
import { WinstonLogger } from "@phobos/infrastructure";

import { Rpc, RpcHandler } from "lib/rpc/decorators";
import { AppGateway } from "src/app/app.gateway";
import { Ws } from "src/app/common/interfaces/ws";
import { MapEntityService } from "src/app/core/map-entity/map-entity.service";
import { TrackerService } from "src/app/core/tracker/tracker.service";

@RpcHandler(AppGateway)
export class TrackerApiController {
    constructor(
        private readonly logger: WinstonLogger,
        private readonly gateway: AppGateway,
        private readonly entity: MapEntityService,
        private readonly tracker: TrackerService,
    ) {
        this.logger.setContext(TrackerApiController.name);
    }

    @Rpc()
    public async setTracker(client: Ws, req: SetTracker_Request) {
        const tracker = fromTrackerDto(req.tracker);
        const trackerEntity = await this.entity.getEntityByTrackerId(req.tracker.id);

        if (trackerEntity) {
            trackerEntity.position = req.tracker.position;
            await this.entity.place(trackerEntity);

            const request: Request = {
                setMapEntity: {
                    entity: toMapEntityDto(trackerEntity)
                }
            }
            await this.gateway.requestAllButOne(client.id, request).then().catch(this.logger.error);
        }
        
        await this.tracker.place(tracker);
        this.gateway.requestAllButOne(client.id, { setTracker: req }).then().catch(this.logger.error);
    }
}
