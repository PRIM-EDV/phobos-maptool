import { Injectable } from '@nestjs/common';
import { Request } from 'proto/trx/trx';
import { MapEntity} from 'proto/trx/trx.entity';
import { AppGateway } from 'src/app.gateway';
import { IMapEntityRpcAdapter } from 'src/core/map-entity/interfaces/map-entity.rpc.adapter.interface';

@Injectable()
export class MapEntityRpcAdatper implements IMapEntityRpcAdapter {
    constructor(private readonly gateway: AppGateway) {}

    public async delete(entity: MapEntity): Promise<void> {
        const req: Request = {
            deleteMapEntity: {
                entity: entity
            }
        }
        await this.gateway.requestAll(req);
    }
    
    public async set(entity: MapEntity): Promise<void> {
        const req: Request = {
            setMapEntity: {
                entity: entity
            }
        }
        await this.gateway.requestAll(req);
    }
}