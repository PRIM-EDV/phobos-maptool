import { Injectable } from '@nestjs/common';

import { AppGateway } from 'src/app.gateway';
import { SquadDtoService } from 'src/common/dtos/squad/squad.dto.service';
import { Squad } from 'src/core/common/models/squad';
import { ISquadRpcAdapter } from 'src/core/squad/interfaces/squad.rpc.adapter.interface';
import { WinstonLogger } from 'src/infrastructure/logger/winston/winston.logger';
import { Request as MaptoolRequest } from 'proto/maptool/phobos.maptool';

@Injectable()
export class SquadRpcAdapter implements ISquadRpcAdapter {
    constructor(
        private readonly logger: WinstonLogger,
        private readonly gateway: AppGateway,
        private readonly squadDto: SquadDtoService,
    ) {
        this.logger.setContext(SquadRpcAdapter.name);
    }

    public async delete(squad: Squad): Promise<void> {
        const req: MaptoolRequest = {
            deleteSquad: {
                squad: this.squadDto.toDto(squad)
            }
        }
        await this.gateway.requestAll(req);
    }
    
    public async set(squad: Squad): Promise<void> {
        const req: MaptoolRequest = {
            setSquad: {
                squad: this.squadDto.toDto(squad)
            }
        }
        await this.gateway.requestAll(req);
    }
}