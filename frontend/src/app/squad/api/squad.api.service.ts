import { effect, Injectable } from "@angular/core";
import { Request, GetAllSquads_Request, SetSquad, SetSquad_Response, SetSquad_Request } from "@phobos-maptool/protocol";
import { fromSquadDto } from "@phobos-maptool/dto";
import { Squad } from "@phobos-maptool/models";
import { from, Subscription } from "rxjs";

import { MaptoolGateway } from "../../infrastructure/maptool.gateway";
import { SquadService } from "../core/squad.service";

@Injectable()
export class SquadApiService {

  squadInit = effect(async () => {
    if (this.gateway.isConnected()) {
        const request: GetAllSquads_Request = {
            getAllSquads: {}
        }
        const squads = await this.gateway.request(request);
  }})  

  private onRequestSubscription: Subscription;

  constructor(
    private readonly gateway: MaptoolGateway,
    private readonly squadService: SquadService
  ) { 
    this.onRequestSubscription = gateway.onRequest.subscribe(this.handleRequest.bind(this));
  } 

  private async handleRequest(e: {id: string, request: Request}) {
    const method = Object.keys(e.request)[0];
    const args = (e.request as any)[method] as any

    if (typeof (this as any)[method] === 'function') {
      const res = await (this as any)[method](args);
      this.gateway.respond(e.id, res);
    }
  }

  private async setSquad(request: SetSquad_Request): Promise<SetSquad_Response> {
    const squadDto = request.squad!;
    const squad = fromSquadDto(squadDto);
    const existing = this.squadService.squads().find((item) => item.name == squad.name);

    if (existing) {
      existing.callsign = squad.callsign;
      existing.combattants = squad.combattants;
      existing.state = squad.state;
      existing.position = squad.position;
    }else {
      this.squadService.squads.update(squads => { squads.push(squad); return squads; });
    }

    return {}
  }

  private handleDeleteSquad(squad: Squad) {
    // const idx = this.squads.findIndex((item) => item.name == squad.name);

    // if (idx > -1) {
    //     this.squads.splice(idx, 1);
    // }
  }
}