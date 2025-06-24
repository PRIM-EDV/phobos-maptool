import { MapEntity } from "@phobos-maptool/models";

export class MapEntityRemovedEvent {
    mapEntity: MapEntity;

    constructor(entity: MapEntity) {
        this.mapEntity = entity;
    }
}