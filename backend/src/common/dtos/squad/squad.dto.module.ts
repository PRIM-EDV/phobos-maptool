import { Module } from "@nestjs/common";
import { SquadDtoService } from "./squad.dto.service";

@Module({
    imports: [],
    providers: [SquadDtoService],
    exports: [SquadDtoService]
})
export class SquadDtoModule {}