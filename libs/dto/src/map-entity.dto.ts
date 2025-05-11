import { MapEntity, MapEntityFoe, MapEntityObjective, MapEntitySquad, MapEntityStatus, MapEntityType } from "@phobos-maptool/models"
import { MapEntityDto, MapEntityDto_Enemy, MapEntityDto_Objective, MapEntityDto_Squad, MapEntityDtoStatus, MapEntityDtoType } from "@phobos-maptool/protocol"

export function fromMapEntityDto(dto: MapEntityDto): MapEntity {
    const base = {
        id: dto.id,
        position: dto.position ? dto.position : { x: 0, y: 0 },
        entity: fromDtoEntity(dto),
    }
    switch (dto.type) {
        case 1:
        case MapEntityDtoType.TYPE_FOE:
            return {
                ...base,
                type: MapEntityType.FOE,
                entity: fromDtoEntity(dto) as MapEntityFoe,
            }
        case 2:
        case MapEntityDtoType.TYPE_FRIEND:
            return {
                ...base,
                type: MapEntityType.FRIEND,
                entity: fromDtoEntity(dto) as MapEntitySquad,
            }
        case 3:
        case MapEntityDtoType.TYPE_OBJECT:
            return {
                ...base,
                type: MapEntityType.OBJECT,
                entity: fromDtoEntity(dto) as MapEntityObjective,
            }
        default:
            throw new Error(`Error while parsing MapEntityDto entity: Unknown MapEntityDtoType: ${dto.type}`);
    }
}

export function toMapEntityDto(mapEntity: MapEntity): MapEntityDto {
    return {
        id: mapEntity.id,
        type: toDtoType(mapEntity.type),
        position: mapEntity.position,
        squad: mapEntity.type === MapEntityType.FRIEND ? toDtoSquad(mapEntity.entity) : undefined,
        enemy: mapEntity.type === MapEntityType.FOE ? toDtoEnemy(mapEntity.entity) : undefined,
        objective: mapEntity.type === MapEntityType.OBJECT ? toDtoObjective(mapEntity.entity) : undefined,
    }
}

function fromDtoEntity(dto: MapEntityDto) {
    switch (dto.type) {
        case MapEntityDtoType.TYPE_FOE:
            return fromDtoEnemy(dto.enemy as MapEntityDto_Enemy);
        case MapEntityDtoType.TYPE_FRIEND:
            return fromDtoSquad(dto.squad as MapEntityDto_Squad);
        case MapEntityDtoType.TYPE_OBJECT:
            return fromDtoObjective(dto.objective as MapEntityDto_Objective);
        default:
            throw new Error(`Error while parsing MapEntityDto entity: Unknown MapEntityDtoType: ${dto.type}`);
    }
}

function fromDtoEnemy(dto: MapEntityDto_Enemy): MapEntityFoe {
    return {
        combattants: dto.combattants,
    }
}

function fromDtoSquad(dto: MapEntityDto_Squad): MapEntitySquad {
    return {
        name: dto.name,
        callsign: dto.callsign,
        trackerId: dto.trackerId,
        combattants: dto.combattants,
        status: fromDtoStatus(dto.status),
    }
}

function fromDtoObjective(dto: MapEntityDto_Objective): MapEntityObjective {
    return {
        name: dto.name,
        description: dto.description,
    }
}

function fromDtoStatus(status: MapEntityDtoStatus): MapEntityStatus {
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
            return MapEntityStatus.UNDEFINED;
    }
}

function toDtoEnemy(enemy: MapEntityFoe): MapEntityDto_Enemy {
    return {
        combattants: enemy.combattants,
    }
}

function toDtoSquad(squad: MapEntitySquad): MapEntityDto_Squad {
    return {
        name: squad.name,
        callsign: squad.callsign,
        trackerId: squad.trackerId,
        combattants: squad.combattants,
        status: toDtoStatus(squad.status),
    }
}

function toDtoObjective(objective: MapEntityObjective): MapEntityDto_Objective {
    return {
        name: objective.name,
        description: objective.description,
    }
}

function toDtoType(type: MapEntityType): MapEntityDtoType {
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

function toDtoStatus(status: MapEntityStatus): MapEntityDtoStatus {
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