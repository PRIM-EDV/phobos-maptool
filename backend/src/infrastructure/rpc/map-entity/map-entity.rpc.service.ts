import { Injectable } from "@nestjs/common";
import { MapEntity, MapEntityEnemy, MapEntityObjective, MapEntitySquad, MapEntityStatus, MapEntityType } from "src/core/common/models/map-entity";
import { MapEntityDto, MapEntityDto_Enemy, MapEntityDto_Objective, MapEntityDto_Squad, MapEntityDtoStatus, MapEntityDtoType } from "proto/maptool/phobos.maptool.entity";

@Injectable()
export class MapEntityRpcService {
    public createMapEntityDto(mapEntity: MapEntity): MapEntityDto {
        return {
            id: mapEntity.id,
            type: this.toDtoType(mapEntity.type),
            position: mapEntity.position,
            squad: mapEntity.type === MapEntityType.FRIEND ? this.toDtoSquad(mapEntity.entity as MapEntitySquad) : undefined,
            enemy: mapEntity.type === MapEntityType.FOE ? this.toDtoEnemy(mapEntity.entity as MapEntityEnemy) : undefined,
            objective: mapEntity.type === MapEntityType.OBJECT ? this.toDtoObjective(mapEntity.entity as MapEntityObjective) : undefined,
        }
    }

    private toDtoEnemy(enemy: MapEntityEnemy): MapEntityDto_Enemy {
        return {
            combattants: enemy.combattants,
        }
    }

    private toDtoObjective(objective: MapEntityObjective): MapEntityDto_Objective {
        return {
            name: objective.name,
            description: objective.description,
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