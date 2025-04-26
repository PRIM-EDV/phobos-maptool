import { Injectable } from '@nestjs/common';
import { AppGateway } from 'src/app.gateway';
import { MapEntity } from 'src/core/common/models/map-entity';
import { IMapEntityRpcAdapter } from 'src/core/map-entity/interfaces/map-entity.rpc.adapter.interface';
import { Request as MaptoolRequest } from 'proto/maptool/phobos.maptool';
import { MapEntityDtoService } from 'src/common/dtos/map-entity/map-entity.dto.service';

@Injectable()
export class MapEntityRpcAdatper implements IMapEntityRpcAdapter {
    constructor(
        private readonly gateway: AppGateway,
        private readonly dtoService: MapEntityDtoService,
    ) {}

    public async delete(entity: MapEntity): Promise<void> {
        const req: MaptoolRequest = {
            deleteMapEntity: {
                entity: this.dtoService.toDto(entity)
            }
        }
        await this.gateway.requestAll(req);
    }
    
    public async set(entity: MapEntity): Promise<void> {
        const req: MaptoolRequest = {
            setMapEntity: {
                entity: this.dtoService.toDto(entity)
            }
        }
        await this.gateway.requestAll(req);
    }
}