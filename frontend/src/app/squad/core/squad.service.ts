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
            this.updateSquad(existing, squad);
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

    private addSquad(squad: Squad) {

    }

    private updateSquad(existing: Squad, updated: Squad) {
        this.squads.update(squads => {
            return squads.map(squad => {
                if (squad.name === existing.name) {
                    return { ...squad, ...updated };
                }

                if (squad.state === existing.state && squad.position >= existing.position) {
                    return { ...squad, position: squad.position - 1 };
                }

                if (squad.state === updated.state && squad.position >= updated.position) {
                    return { ...squad, position: squad.position + 1 };
                }

                return squad;
            });
        });
    }
}