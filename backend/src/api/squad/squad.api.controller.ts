import { Rpc, RpcHandler } from "lib/rpc/decorators";
import { GetAllSquads_Response, SetSquad_Request, SquadDto } from "proto/maptool/phobos.maptool.squad";
import { AppGateway } from "src/app.gateway";
import { SquadDtoService } from "src/common/dtos/squad/squad.dto.service";
import { Ws } from "src/common/interfaces/ws";
import { SquadService } from "src/core/squad/squad.service";

@RpcHandler(AppGateway)
export class SquadApiController { 
    constructor(
        private readonly gateway: AppGateway,
        private readonly squad: SquadService,
        private readonly squadDto: SquadDtoService
    ) {}

    @Rpc()
    public async setSquad(client: Ws, req: SetSquad_Request) {
        const squad = this.squadDto.fromDto(req.squad);

        await this.squad.place(squad);
        this.gateway.requestAllButOne(client.id, { setSquad: req }).then().catch(console.error);
    }

    @Rpc()
    public async deleteSquad(client: Ws, req: SetSquad_Request) {
        const squad = this.squadDto.fromDto(req.squad);

        await this.squad.remove(squad);
        this.gateway.requestAllButOne(client.id, { deleteSquad: req }).then().catch(console.error);
    }

    @Rpc()
    public async getAllSquads(): Promise<GetAllSquads_Response> {
        const squads = (await this.squad.getAll()).map(squad => this.squadDto.toDto(squad));
        
        return { squads: squads };
    }
}