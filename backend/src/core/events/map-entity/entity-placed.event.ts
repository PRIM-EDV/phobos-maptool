import { MapEntity } from "proto/trx/trx.entity";

export class EntityPlacedEvent {
    entity: MapEntity;

    constructor(entity: MapEntity) {
        this.entity = entity;
    }
}