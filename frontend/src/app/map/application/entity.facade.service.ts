import { effect, Injectable } from "@angular/core";
import { MapEntity } from "@phobos-maptool/models";

import { MaptoolGateway } from "../../infrastructure/maptool.gateway";
import { MapEntityRpcAdapter } from "../infrastructure/rpc/map-entity.rpc.adapter";
import { MapEntityService } from "../core/map-entity.service";

@Injectable({ providedIn: "root" })
export class EntityFacadeService {

  entityInit = effect(async () => {
    if (this.gateway.isConnected()) {
      const entities = await this.rpc.getAllMapEntities();
      this.entity.setEntities(entities);
    }
  });

  constructor(
    private readonly gateway: MaptoolGateway,
    private readonly entity: MapEntityService,
    private readonly rpc: MapEntityRpcAdapter
  ) {}

  public async createEntity(entity: MapEntity): Promise<void> {
    this.entity.setEntity(entity);

    await this.rpc.setMapEntity(entity);
  }

  public async deleteEntity(entity: MapEntity): Promise<void> {
    this.entity.deleteEntity(entity);

    await this.rpc.deleteMapEntity(entity);
  }

  public async updateEntity(entity: MapEntity): Promise<void> {
    this.entity.setEntity(entity);
    await this.rpc.setMapEntity(entity);
  }
}