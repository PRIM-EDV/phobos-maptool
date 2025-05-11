import { Injectable, signal, WritableSignal } from "@angular/core";
import { MapEntity, MapEntityStatus, MapEntityType } from "@phobos-maptool/models";

import { v4 as uuidv4 } from 'uuid';
@Injectable({ providedIn: "root" })
export class EntityService {
  public entities: WritableSignal<MapEntity[]> = signal<MapEntity[]>([]);

  public getDefaultEntity(type: MapEntityType): MapEntity {
    const base = {
      id: uuidv4(),
      position: { x: 0, y: 0}
    }

    switch (type) {
      case MapEntityType.FOE:
        return {
          ...base,
          type: MapEntityType.FOE,
          entity: {
            combattants: 0
          }
        }
      case MapEntityType.FRIEND:
        return {
          ...base,
          type: MapEntityType.FRIEND,
          entity: {
            name: "",
            callsign: "",
            trackerId: -1,
            combattants: 1,
            status: MapEntityStatus.REGULAR
          }
        }
      case MapEntityType.OBJECT:
        return {
          ...base,
          type: MapEntityType.OBJECT,
          entity: {
            name: "",
            description: ""
          }
        }
      default:
        throw new Error("Invalid entity type");
    }
  }

  public setEntity(entity: MapEntity) {
  }

  public setEntities(entities: MapEntity[]) {
    this.entities.set(entities);
  }

  public deleteEntity(deleted: MapEntity) {
    this.entities.update((entities) => {
      return entities.filter((entity) => entity.id !== deleted.id);
    });
  }

  private updateEntity(existing: MapEntity, updated: MapEntity) {
    this.entities.update((entities) => {
      return entities.map((entity) => {
        if (entity.id === existing.id) {
          return { ...entity, ...updated };
        } else {
          return entity;
        }
      });
    });
  }
}
