import { AppGateway } from 'src/app.gateway';
import { Ws } from 'src/common/interfaces/ws';
import { RpcHandler, Rpc } from 'lib/rpc/decorators';
import { LoggingService } from 'src/infrastructure/logging/logging.service';
import { MapEntityService } from 'src/core/map-entity/map-entity.service';
import { DeleteMapEntity_Request, GetAllMapEntities_Response, SetMapEntity_Request } from 'proto/trx/trx.entity';

@RpcHandler(AppGateway)
export class MapApiController {
    constructor(
        private readonly log: LoggingService,
        private readonly gateway: AppGateway,
        private readonly mapEntity: MapEntityService
    ) {}

    @Rpc()
    public async deleteMapEntity(client: Ws, req: DeleteMapEntity_Request) {
        await this.mapEntity.remove(req.entity);
        this.gateway.requestAllButOne(client.id, { deleteMapEntity: req }).then().catch(this.log.error);
    }

    @Rpc()
    public async getAllMapEntities(): Promise<GetAllMapEntities_Response> {
        const entities = await this.mapEntity.getAll();
        return { entities: entities } ;
    }

    @Rpc()
    public async setMapEntity(client: Ws, req: SetMapEntity_Request) {
        await this.mapEntity.place(req.entity);
        this.gateway.requestAllButOne(client.id, { setMapEntity: req }).then().catch(this.log.error);
    }
}