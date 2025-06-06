import { MapEntity } from "@phobos-maptool/models";

export class MapEntityPlacedEvent {
    mapEntity: MapEntity;

    constructor(entity: MapEntity) {
        this.mapEntity = entity;
    }
}