import { Injectable } from '@nestjs/common';
import { AppGateway } from 'src/app.gateway';
import { MapEntity } from 'src/core/common/models/map-entity';
import { IMapEntityRpcAdapter } from 'src/core/map-entity/interfaces/map-entity.rpc.adapter.interface';
import { Request as MaptoolRequest } from 'proto/maptool/phobos.maptool';
import { MapEntityRpcService } from './map-entity.rpc.service';

@Injectable()
export class MapEntityRpcAdatper implements IMapEntityRpcAdapter {
    constructor(
        private readonly gateway: AppGateway,
        private readonly service: MapEntityRpcService,
    ) {}

    public async delete(entity: MapEntity): Promise<void> {
        const req: MaptoolRequest = {
            deleteMapEntity: {
                entity: this.service.createMapEntityDto(entity)
            }
        }
        await this.gateway.requestAll(req);
    }
    
    public async set(entity: MapEntity): Promise<void> {
        const req: MaptoolRequest = {
            setMapEntity: {
                entity: this.service.createMapEntityDto(entity)
            }
        }
        await this.gateway.requestAll(req);
    }
}