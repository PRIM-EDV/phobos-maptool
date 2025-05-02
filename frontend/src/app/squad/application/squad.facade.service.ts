import { Injectable } from '@angular/core';
import { Squad } from '@phobos-maptool/models';

import { SquadService } from '../core/squad.service';
import { DeleteSquad } from '@phobos-maptool/protocol';


@Injectable({
    providedIn: 'root',
})
export class SquadFacadeService {
    constructor(
        private readonly squad: SquadService,
    ){}

    public createSquad(squad: Squad) {
        this.squad.setSquad(squad);
    }

    public deleteSquad(squad: Squad) {
        this.squad.deleteSquad(squad);
    }
}
