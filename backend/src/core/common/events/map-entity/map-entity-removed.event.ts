import { MapEntity } from "../../models/map-entity";

export class MapEntityRemovedEvent {
    mapEntity: MapEntity;

    constructor(entity: MapEntity) {
        this.mapEntity = entity;
    }
}