import { Injectable } from '@nestjs/common';
import { Request } from 'proto/trx/trx';
import { Squad } from 'proto/trx/trx.squad';
import { AppGateway } from 'src/app.gateway';
import { ISquadRpcAdapter } from 'src/core/squad/interfaces/squad.rpc.adapter.interface';

@Injectable()
export class SquadRpcAdapter implements ISquadRpcAdapter {
    constructor(private readonly gateway: AppGateway) {}

    public async delete(squad: Squad): Promise<void> {
        const req: Request = {
            deleteSquad: {
                squad: squad
            }
        }
        await this.gateway.requestAll(req);
    }
    
    public async set(squad: Squad): Promise<void> {
        console.log('set squad', squad);
        const req: Request = {
            setSquad: {
                squad: squad
            }
        }
        await this.gateway.requestAll(req);
    }
}