import { Rpc, RpcHandler } from "lib/rpc/decorators";
import { SetSquad_Request, GetAllSquads_Response } from "proto/trx/trx.squad";
import { AppGateway } from "src/app.gateway";
import { Ws } from "src/common/interfaces/ws";
import { SquadService } from "src/core/squad/squad.service";

@RpcHandler(AppGateway)
export class SquadApiController { 
    constructor(
        private readonly gateway: AppGateway,
        private readonly squad: SquadService
    ) {}

    @Rpc()
    public async setSquad(client: Ws, req: SetSquad_Request) {
        await this.squad.place(req.squad);
        this.gateway.requestAllButOne(client.id, { setSquad: req }).then().catch(console.error);
    }

    @Rpc()
    public async deleteSquad(client: Ws, req: SetSquad_Request) {
        await this.squad.remove(req.squad);
        this.gateway.requestAllButOne(client.id, { deleteSquad: req }).then().catch(console.error);
    }

    @Rpc()
    public async getAllSquads(): Promise<GetAllSquads_Response> {
        const squads = await this.squad.getAll();
        return { squads: squads };
    }
}