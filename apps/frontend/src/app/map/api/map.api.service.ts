import { Injectable } from "@angular/core";
import { DeleteMapEntity_Request, DeleteMapEntity_Response, Request, SetMapEntity_Request, SetMapEntity_Response } from "@phobos-maptool/protocol";

import { Subscription } from "rxjs";

import { MaptoolGateway } from "../../infrastructure/maptool.gateway";
import { MapEntityService } from "../core/map-entity.service";
import { fromMapEntityDto } from "@phobos-maptool/dto";

@Injectable({ providedIn: 'root' })
export class MapApiService {

  private onRequestSubscription: Subscription;

  constructor(
    private readonly gateway: MaptoolGateway,
    private readonly entity: MapEntityService
  ) {
    this.onRequestSubscription = gateway.onRequest.subscribe(this.handleRequest.bind(this));
    console.log('MapApiService initialized');
  }

  private async deleteMapEntity(request: DeleteMapEntity_Request): Promise<DeleteMapEntity_Response> {
    const entityDto = request.entity!;
    const entity = fromMapEntityDto(entityDto);

    this.entity.deleteEntity(entity);
    return {};
  }

  private async setMapEntity(request: SetMapEntity_Request): Promise<SetMapEntity_Response> {
    const entityDto = request.entity!;
    const entity = fromMapEntityDto(entityDto);

    this.entity.setEntity(entity);
    return {};
  }
  
  private async handleRequest(e: { id: string, request: Request }) {
    const method = Object.keys(e.request)[0];
    const args = (e.request as any)[method] as any
    console.log(method, args);
    if (typeof (this as any)[method] === 'function') {
      const res = await (this as any)[method](args);
      this.gateway.respond(e.id, res);
    }
  }
}