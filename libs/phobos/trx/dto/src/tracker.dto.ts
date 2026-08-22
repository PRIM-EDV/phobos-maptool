import { Tracker, TrackerPosition, TrackerType } from '@phobos-maptool/models';
import { TrackerDto, TrackerDto_Position, TrackerDto_Type } from '@phobos-maptool/protocol';

export function fromTrackerDto(dto: TrackerDto): Tracker {
    return {
        id: dto.id,
        size: dto.size,
        type: fromType(dto.type),
        position: dto.position ? fromPosition(dto.position) : { x: 0, y: 0 },
    }
}

export function toTrackerDto(tracker: Tracker): TrackerDto {
    return {
        id: tracker.id,
        size: tracker.size ?? -1,
        type: toType(tracker.type),
        position: toPosition(tracker.position),
    }
}

function fromPosition(position: TrackerDto_Position): TrackerPosition {
    return {
        x: position.x,
        y: position.y,
    }
}

function toPosition(position: TrackerPosition): TrackerDto_Position {
    return {
        x: position.x,
        y: position.y,
    }
}

function fromType(type: TrackerDto_Type): TrackerType {
    switch (type) {
        case 0:
        case TrackerDto_Type.TYPE_UNDEFINED:
            return TrackerType.UNDEFINED;
        case 1:
        case TrackerDto_Type.TYPE_FOE:
            return TrackerType.FOE;
        case 2:
        case TrackerDto_Type.TYPE_FRIEND:
            return TrackerType.FRIEND;
        case 3:
        case TrackerDto_Type.TYPE_OBJECT:
            return TrackerType.OBJECT;
        default:
            throw new Error(`Unknown tracker type: ${type}`);
    }
}

function toType(type: TrackerType): TrackerDto_Type {
    switch (type) {
        case 0:
        case TrackerType.UNDEFINED:
            return TrackerDto_Type.TYPE_UNDEFINED;
        case 1:
        case TrackerType.FOE:
            return TrackerDto_Type.TYPE_FOE;
        case 2:
        case TrackerType.FRIEND:
            return TrackerDto_Type.TYPE_FRIEND;
        case 3:
        case TrackerType.OBJECT:
            return TrackerDto_Type.TYPE_OBJECT;
        default:
            throw new Error(`Unknown tracker type: ${type}`);
    }
}
