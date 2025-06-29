import { effect, Injectable } from "@angular/core";
import { Squad } from "@phobos-maptool/models";

import { SquadService } from "../core/squad.service";
import { SquadRpcAdapter } from "../infrastructure/squad.rpc.adapter";
import { MaptoolGateway } from "../../infrastructure/maptool.gateway";

@Injectable({
  providedIn: "root",
})
export class SquadFacadeService {
    
  squadInit = effect(async () => {
    if (this.gateway.isConnected()) {
      const squads = await this.rpc.getAllSquads();
      this.squad.setSquads(squads);
    }
  });

  constructor(
    private readonly gateway: MaptoolGateway,
    private readonly squad: SquadService,
    private readonly rpc: SquadRpcAdapter
  ) {}

  public async createSquad(squad: Squad) {
    this.squad.setSquad(squad);
    await this.rpc.setSquads(this.squad.squads());
  }

  public async deleteSquad(squad: Squad) {
    this.squad.deleteSquad(squad);

    await this.rpc.deleteSquad(squad);
    await this.rpc.setSquads(this.squad.squads());
  }

  public async updateSquad(squad: Squad) {
    this.squad.setSquad(squad);

    await this.rpc.setSquads(this.squad.squads());
  }
}
