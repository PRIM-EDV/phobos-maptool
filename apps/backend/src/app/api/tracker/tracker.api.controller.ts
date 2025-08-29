

import { SetTracker_Request } from "@phobos-maptool/protocol/dist/phobos.maptool.legacy";
import { Request } from '@phobos-maptool/protocol';

import { Rpc, RpcHandler } from "lib/rpc/decorators";
import { AppGateway } from "src/app/app.gateway";
import { Ws } from "src/app/common/interfaces/ws";
import { MapEntityService } from "src/app/core/map-entity/map-entity.service";
import { WinstonLogger } from "src/app/infrastructure/logger/winston/winston.logger";
import { toMapEntityDto } from "@phobos-maptool/dto";


@RpcHandler(AppGateway)
export class TrackerApiController {
    constructor(
        private readonly logger: WinstonLogger,
        private readonly gateway: AppGateway,
        private readonly entity: MapEntityService,
    ) {
        this.logger.setContext(TrackerApiController.name);
    }

    @Rpc()
    public async setTracker(client: Ws, req: SetTracker_Request) {
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
    }
}