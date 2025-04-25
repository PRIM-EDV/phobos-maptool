import { MapEntity } from "proto/trx/trx.entity";

export class EntityRemovedEvent {
    entity: MapEntity;

    constructor(entity: MapEntity) {
        this.entity = entity;
    }
}