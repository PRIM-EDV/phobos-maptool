import { Injectable } from "@angular/core";
import { MaptoolGateway } from "../../infrastructure/maptool.gateway";
import { Request } from "@phobos-maptool/protocol";
import { Squad } from "@phobos-maptool/models";
import { toSquadDto, fromSquadDto } from "@phobos-maptool/dto";

@Injectable(
    { providedIn: "root" }
)
export class SquadRpcAdapter {

    constructor(
        private readonly gateway: MaptoolGateway,
    ) { }

    public async getAllSquads(): Promise<Squad[]> {
        const request: Request = {
            getAllSquads: {}
        };

        const response = await this.gateway.request(request);

        return response.getAllSquads!.squads.map((squad) => fromSquadDto(squad));
    }

    public async setSquad(squad: Squad): Promise<void> {
        const request: Request = {
            setSquad: {
                squad: toSquadDto(squad)
            }
        };

        await this.gateway.request(request);
    }

    public async setSquads(squads: Squad[]): Promise<void> {
        const request: Request = {
            setSquads: {
                squads: squads.map((squad) => toSquadDto(squad))
            }
        };

        await this.gateway.request(request);
    }

    public async deleteSquad(squad: Squad): Promise<void> {
        const request: Request = {
            deleteSquad: {
                squad: toSquadDto(squad)
            }
        };

        await this.gateway.request(request);
    }

}
