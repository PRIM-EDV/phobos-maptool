import { Injectable, signal, WritableSignal } from '@angular/core';
import { Squad } from '../../common/models/squad';


@Injectable()
export class SquadService {
    public squads: WritableSignal<Squad[]> = signal([]);
    
    constructor() {

    }

    public async deleteSquad(squad: Squad) {
        const req: Request = {
            deleteSquad: { squad: squad }
        }
        const res: Response = await this.backend.request(req);
    }

    public async setSquad(squad: Squad) {
        const req: Request = {
            setSquad: { squad: squad }
        }
        const res: Response = await this.backend.request(req);
    }

    public async getAllSquads(): Promise<Squad[]>{
        const req: Request = {
            getAllSquads: {}
        }
    
        const res: Response = await this.backend.request(req);
        return res.getAllSquads!.squads!;
    }
}