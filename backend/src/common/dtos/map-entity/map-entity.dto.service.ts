import { Injectable } from "@nestjs/common";
import { MapEntityDto, MapEntityDtoType, MapEntityDto_Enemy, MapEntityDto_Objective, MapEntityDto_Squad, MapEntityDtoStatus } from "proto/maptool/phobos.maptool.entity";

import { MapEntity, MapEntityEnemy, MapEntityObjective, MapEntitySquad, MapEntityStatus, MapEntityType } from "src/core/common/models/map-entity";
import { WinstonLogger } from "src/infrastructure/logger/winston/winston.logger";

@Injectable()
export class MapEntityDtoService {

    constructor(
        private readonly logger: WinstonLogger,
    ) {
        this.logger.setContext(MapEntityDtoService.name);
    }

    public fromDto(dto: MapEntityDto): MapEntity {
        return {
            id: dto.id,
            type: this.fromDtoType(dto.type),
            position: dto.position,
            entity: this.fromDtoEntity(dto),
        }
    }

    public toDto(mapEntity: MapEntity): MapEntityDto {
        return {
            id: mapEntity.id,
            type: this.toDtoType(mapEntity.type),
            position: mapEntity.position,
            squad: mapEntity.type === MapEntityType.FRIEND ? this.toDtoSquad(mapEntity.entity as MapEntitySquad) : undefined,
            enemy: mapEntity.type === MapEntityType.FOE ? this.toDtoEnemy(mapEntity.entity as MapEntityEnemy) : undefined,
            objective: mapEntity.type === MapEntityType.OBJECT ? this.toDtoObjective(mapEntity.entity as MapEntityObjective) : undefined,
        }
    }

    private fromDtoEntity(dto: MapEntityDto): MapEntitySquad | MapEntityEnemy | MapEntityObjective {
        switch (dto.type) {
            case MapEntityDtoType.TYPE_FOE:
                return this.fromDtoEnemy(dto.enemy as MapEntityDto_Enemy);
            case MapEntityDtoType.TYPE_FRIEND:
                return this.fromDtoSquad(dto.squad as MapEntityDto_Squad);
            case MapEntityDtoType.TYPE_OBJECT:
                return this.fromDtoObjective(dto.objective as MapEntityDto_Objective);
            default:
                throw new Error(`Error while parsing MapEntityDto entity: Unknown MapEntityDtoType: ${dto.type}`);
        }
    }

    private fromDtoEnemy(dto: MapEntityDto_Enemy): MapEntityEnemy {
        return {
            combattants: dto.combattants,
        }
    }

    private fromDtoSquad(dto: MapEntityDto_Squad): MapEntitySquad {
        return {
            name: dto.name,
            callsign: dto.callsign,
            trackerId: dto.trackerId,
            combattants: dto.combattants,
            status: this.fromDtoStatus(dto.status),
        }
    }

    private fromDtoObjective(dto: MapEntityDto_Objective): MapEntityObjective {
        return {
            name: dto.name,
            description: dto.description,
        }
    }

    private fromDtoType(type: MapEntityDtoType): MapEntityType {
        switch (type) {
            case 0:
            case MapEntityDtoType.TYPE_UNDEFINED:
                return MapEntityType.UNDEFINED;
            case 1:
            case MapEntityDtoType.TYPE_FOE:
                return MapEntityType.FOE;
            case 2:
            case MapEntityDtoType.TYPE_FRIEND:
                return MapEntityType.FRIEND;
            case 3:
            case MapEntityDtoType.TYPE_OBJECT:
                return MapEntityType.OBJECT;
            default:
                this.logger.error(`Error while parsing MapEntityDto type: Unknown MapEntityDtoType: ${type}`);
                return MapEntityType.UNDEFINED;
        }
    }

    private fromDtoStatus(status: MapEntityDtoStatus): MapEntityStatus {
        switch (status) {
            case 0:
            case MapEntityDtoStatus.ENTITY_STATUS_UNDEFINED:
                return MapEntityStatus.UNDEFINED;
            case 1:
            case MapEntityDtoStatus.ENTITY_STATUS_REGULAR:
                return MapEntityStatus.REGULAR;
            case 2:
            case MapEntityDtoStatus.ENTITY_STATUS_COMBAT:
                return MapEntityStatus.COMBAT;
            default:
                this.logger.error(`Error while parsing MapEntityDto status: Unknown MapEntityDtoStatus: ${status}`);
                return MapEntityStatus.UNDEFINED;
        }
    }

    private toDtoEnemy(enemy: MapEntityEnemy): MapEntityDto_Enemy {
        return {
            combattants: enemy.combattants,
        }
    }

    private toDtoSquad(squad: MapEntitySquad): MapEntityDto_Squad {
        return {
            name: squad.name,
            callsign: squad.callsign,
            trackerId: squad.trackerId,
            combattants: squad.combattants,
            status: this.toDtoStatus(squad.status),
        }
    }

    private toDtoObjective(objective: MapEntityObjective): MapEntityDto_Objective {
        return {
            name: objective.name,
            description: objective.description,
        }
    }

    private toDtoType(type: MapEntityType): MapEntityDtoType {
        switch (type) {
            case 0:
            case MapEntityType.UNDEFINED:
                return MapEntityDtoType.TYPE_UNDEFINED;
            case 1:
            case MapEntityType.FOE:
                return MapEntityDtoType.TYPE_FOE;
            case 2:
            case MapEntityType.FRIEND:
                return MapEntityDtoType.TYPE_FRIEND;
            case 3:
            case MapEntityType.OBJECT:
                return MapEntityDtoType.TYPE_OBJECT;
            default:
                return MapEntityDtoType.UNRECOGNIZED;
        }
    }

    private toDtoStatus(status: MapEntityStatus): MapEntityDtoStatus {
        switch (status) {
            case 0:
            case MapEntityStatus.UNDEFINED:
                return MapEntityDtoStatus.ENTITY_STATUS_UNDEFINED;
            case 1:
            case MapEntityStatus.REGULAR:
                return MapEntityDtoStatus.ENTITY_STATUS_REGULAR;
            case 2:
            case MapEntityStatus.COMBAT:
                return MapEntityDtoStatus.ENTITY_STATUS_COMBAT;
            default:
                return MapEntityDtoStatus.UNRECOGNIZED;
        }
    }
}
