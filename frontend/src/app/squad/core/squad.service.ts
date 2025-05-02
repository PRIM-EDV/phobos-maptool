import { Injectable, signal, WritableSignal } from '@angular/core';
import { Squad } from '@phobos-maptool/models';

@Injectable(
    {providedIn: 'root'}
)
export class SquadService {
    public squads: WritableSignal<Squad[]> = signal([]);
    
    constructor() {

    }

    public setSquad(squad: Squad) {
        const existing = this.squads().find((item) => item.name == squad.name);
        if (existing) {
            existing.callsign = squad.callsign;
            existing.combattants = squad.combattants;
            existing.state = squad.state;
            existing.position = squad.position;
        } else {
            this.squads.update(squads => { squads.push(squad); return squads; });
        }
    }

    public setSquads(squads: Squad[]) {
        this.squads.set(squads);
    }

    public async deleteSquad(squad: Squad) {
        const idx = this.squads().findIndex((item) => item.name == squad.name);

        if (idx > -1) {
            this.squads.update(squads => { squads.splice(idx, 1); return squads; });
        }
    }
}