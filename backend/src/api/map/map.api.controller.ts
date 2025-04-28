import { fromMapEntityDto, toMapEntityDto } from '@phobos-maptool/dto';
import { DeleteMapEntity_Request, GetAllMapEntities_Response, SetMapEntity_Request } from '@phobos-maptool/protocol';

import { RpcHandler, Rpc } from 'lib/rpc/decorators';
import { AppGateway } from 'src/app.gateway';
import { Ws } from 'src/common/interfaces/ws';
import { MapEntityService } from 'src/core/map-entity/map-entity.service';
import { WinstonLogger } from 'src/infrastructure/logger/winston/winston.logger';

@RpcHandler(AppGateway)
export class MapApiController {
    constructor(
        private readonly logger: WinstonLogger,
        private readonly gateway: AppGateway,
        private readonly mapEntity: MapEntityService,
    ) {
        this.logger.setContext(MapApiController.name);
    }

    @Rpc()
    public async deleteMapEntity(client: Ws, req: DeleteMapEntity_Request) {
        const entity = fromMapEntityDto(req.entity);

        await this.mapEntity.remove(entity);
        this.gateway.requestAllButOne(client.id, { deleteMapEntity: req }).then().catch(this.logger.error);
    }

    @Rpc()
    public async getAllMapEntities(): Promise<GetAllMapEntities_Response> {
        const entities = (await this.mapEntity.getAll()).map(entity => toMapEntityDto(entity));
        
        return { entities: entities } ;
    }

    @Rpc()
    public async setMapEntity(client: Ws, req: SetMapEntity_Request) {
        const entity = fromMapEntityDto(req.entity);

        await this.mapEntity.place(entity);
        this.gateway.requestAllButOne(client.id, { setMapEntity: req }).then().catch(this.logger.error);
    }
}