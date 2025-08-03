import { Injectable } from "@angular/core";
import { Request, SetSquad_Response, SetSquad_Request, DeleteSquad_Request, DeleteSquad_Response } from "@phobos-maptool/protocol";
import { fromSquadDto } from "@phobos-maptool/dto";
import { Subscription } from "rxjs";

import { MaptoolGateway } from "../../infrastructure/maptool.gateway";
import { SquadService } from "../core/squad.service";

@Injectable(
    { providedIn: 'root' }
)
export class SquadApiService { 

  private onRequestSubscription: Subscription;

  constructor(
    private readonly gateway: MaptoolGateway,
    private readonly squadService: SquadService
  ) { 
    this.onRequestSubscription = gateway.onRequest.subscribe(this.handleRequest.bind(this));
  } 

  private async handleRequest(e: {id: string, request: Request}) {
    const method = Object.keys(e.request).find(key => (e.request as any)[key] !== undefined);

    if (method) {
      const args = (e.request as any)[method] as any
      if (typeof (this as any)[method] === 'function') {
        const res = await (this as any)[method](args);
        this.gateway.respond(e.id, res);
      }
    }
  }

  private async setSquad(request: SetSquad_Request): Promise<SetSquad_Response> {
    const squadDto = request.squad!;
    const squad = fromSquadDto(squadDto);

    this.squadService.setSquad(squad);
    
    return {}
  }

  private async deleteSquad(request: DeleteSquad_Request): Promise<DeleteSquad_Response> {
    const squadDto = request.squad!;
    const squad = fromSquadDto(squadDto);

    this.squadService.deleteSquad(squad);
    
    return {}
  }
}