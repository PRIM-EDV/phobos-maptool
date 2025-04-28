import { effect, Injectable } from "@angular/core";
import { MaptoolGateway } from "../../infrastructure/maptool.gateway";
import { GetAllSquads_Request } from "../../../../proto/maptool/phobos.maptool.squad";
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

  constructor(
    private readonly gateway: MaptoolGateway,
    private readonly squadService: SquadService
  ) { } 


}