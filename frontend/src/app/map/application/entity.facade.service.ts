import { Injectable } from "@angular/core";
import { MapEntity } from "@phobos-maptool/models";

@Injectable({ providedIn: "root" })
export class EntityFacadeService {
  constructor() {}

  createEntity(entity: MapEntity): void {
    throw new Error("Method not implemented.");
  }

  deleteEntity(entity: MapEntity): void {
    throw new Error("Method not implemented.");
  }

  updateEntity(entity: MapEntity): void {
    throw new Error("Method not implemented.");
  }
}