import { Module } from "@nestjs/common";
import { SquadDtoService } from "./squad.dto.service";
import { WinstonLoggerModule } from "src/infrastructure/logger/winston/winston.logger.module";

@Module({
    imports: [
        WinstonLoggerModule
    ],
    providers: [SquadDtoService],
    exports: [SquadDtoService]
})
export class SquadDtoModule {}