import { Injectable } from '@angular/core';
import { Squad } from '@phobos-maptool/models';

import { SquadService } from '../core/squad.service';


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
}
