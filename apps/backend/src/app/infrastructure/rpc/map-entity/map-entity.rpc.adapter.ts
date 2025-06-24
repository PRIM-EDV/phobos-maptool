import { Injectable } from '@nestjs/common';
import { toMapEntityDto } from '@phobos-maptool/dto';
import { MapEntity } from '@phobos-maptool/models';
import { Request as MaptoolRequest } from '@phobos-maptool/protocol';

import { AppGateway } from 'src/app/app.gateway';
import { IMapEntityRpcAdapter } from 'src/app/core/map-entity/interfaces/map-entity.rpc.adapter.interface';

@Injectable()
export class MapEntityRpcAdatper implements IMapEntityRpcAdapter {
    constructor(
        private readonly gateway: AppGateway,
    ) {}

    public async delete(entity: MapEntity): Promise<void> {
        const req: MaptoolRequest = {
            deleteMapEntity: {
                entity: toMapEntityDto(entity)
            }
        }
        await this.gateway.requestAll(req);
    }
    
    public async set(entity: MapEntity): Promise<void> {
        const req: MaptoolRequest = {
            setMapEntity: {
                entity: toMapEntityDto(entity)
            }
        }
        await this.gateway.requestAll(req);
    }
}