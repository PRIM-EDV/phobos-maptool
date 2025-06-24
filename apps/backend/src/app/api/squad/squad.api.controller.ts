import { fromSquadDto, toSquadDto } from "@phobos-maptool/dto";
import { GetAllSquads_Response, SetSquad_Request } from "@phobos-maptool/protocol";

import { Rpc, RpcHandler } from "lib/rpc/decorators";
import { AppGateway } from "src/app/app.gateway";
import { Ws } from "src/app/common/interfaces/ws";
import { SquadService } from "src/app/core/squad/squad.service";

@RpcHandler(AppGateway)
export class SquadApiController { 
    constructor(
        private readonly gateway: AppGateway,
        private readonly squad: SquadService,
    ) {}

    @Rpc()
    public async setSquad(client: Ws, req: SetSquad_Request) {
        const squad = fromSquadDto(req.squad);

        await this.squad.place(squad);
        this.gateway.requestAllButOne(client.id, { setSquad: req }).then().catch(console.error);
    }

    @Rpc()
    public async deleteSquad(client: Ws, req: SetSquad_Request) {
        const squad = fromSquadDto(req.squad);

        await this.squad.remove(squad);
        this.gateway.requestAllButOne(client.id, { deleteSquad: req }).then().catch(console.error);
    }

    @Rpc()
    public async getAllSquads(): Promise<GetAllSquads_Response> {
        const squads = (await this.squad.getAll()).map(squad => toSquadDto(squad));
        
        return { squads: squads };
    }
}