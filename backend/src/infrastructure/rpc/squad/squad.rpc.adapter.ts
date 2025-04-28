import { Injectable } from '@nestjs/common';
import { toSquadDto } from '@phobos-maptool/dto';
import { Squad } from '@phobos-maptool/models';
import { Request as MaptoolRequest } from '@phobos-maptool/protocol';

import { AppGateway } from 'src/app.gateway';
import { ISquadRpcAdapter } from 'src/core/squad/interfaces/squad.rpc.adapter.interface';
import { WinstonLogger } from 'src/infrastructure/logger/winston/winston.logger';

@Injectable()
export class SquadRpcAdapter implements ISquadRpcAdapter {
    constructor(
        private readonly logger: WinstonLogger,
        private readonly gateway: AppGateway,
    ) {
        this.logger.setContext(SquadRpcAdapter.name);
    }

    public async delete(squad: Squad): Promise<void> {
        const req: MaptoolRequest = {
            deleteSquad: {
                squad: toSquadDto(squad)
            }
        }
        await this.gateway.requestAll(req);
    }
    
    public async set(squad: Squad): Promise<void> {
        const req: MaptoolRequest = {
            setSquad: {
                squad: toSquadDto(squad)
            }
        }
        await this.gateway.requestAll(req);
    }
}