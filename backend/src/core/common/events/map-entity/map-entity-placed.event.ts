import { MapEntity } from "../../models/map-entity";

export class MapEntityPlacedEvent {
    mapEntity: MapEntity;

    constructor(entity: MapEntity) {
        this.mapEntity = entity;
    }
}