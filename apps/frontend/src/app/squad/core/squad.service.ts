import { Injectable, signal, WritableSignal } from "@angular/core";
import { Squad, SquadState } from "@phobos-maptool/models";

@Injectable({ providedIn: "root" })
export class SquadService {
  public squads: WritableSignal<Squad[]> = signal([]);

  constructor() {}

  public setSquad(squad: Squad) {
    const existing = this.squads().find((item) => item.name == squad.name);
    if (existing) {
      this.updateSquad(existing, squad);
    } else {
      this.addSquad(squad);
    }
  }

  public setSquads(squads: Squad[]) {
    this.squads.set(squads);
  }

  public async deleteSquad(target: Squad) {
    this.squads.update((squads) => {
      const peers = this.getPeers(squads, target);

      this.reindex(peers);
      return squads.filter((squad) => squad.name !== target.name);
    });
  }

  private addSquad(squad: Squad) {
    this.squads.update((squads) => {
      const peers = this.getPeers(squads, squad);

      peers.splice(squad.position, 0, squad);
      this.reindex(peers);

      return [...squads, squad];
    });
  }

  private updateSquad(previous: Squad, next: Squad) {
    this.squads.update((squads) => {
      const squad = squads.find((item) => item.name == previous.name) as Squad;
      const originalPeers = this.getPeers(squads, previous);
      const nextPeers = this.getPeers(squads, next);
      
      Object.assign(squad, next);
      nextPeers.splice(next.position, 0, squad);

      this.reindex(originalPeers);
      this.reindex(nextPeers);

      return [...squads];
    });
  }

  private getPeers(squads: Squad[], target: Squad): Squad[] {
    return squads
        .filter(squad => squad.state === target.state && squad.name !== target.name)
        .sort((a, b) => a.position - b.position);
  }

  private reindex(squads: Squad[]) {
    squads.forEach((squad, index) => {
      squad.position = index;
    });
  }
}
