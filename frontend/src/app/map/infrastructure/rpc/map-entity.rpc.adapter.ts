import { Injectable } from "@angular/core";
import { Request } from "@phobos-maptool/protocol";
import { MapEntity } from "@phobos-maptool/models";
import { fromMapEntityDto, toMapEntityDto } from "@phobos-maptool/dto";

import { MaptoolGateway } from "../../../infrastructure/maptool.gateway";

@Injectable({ providedIn: "root" })
export class MapEntityRpcAdapter {
  constructor(private readonly gateway: MaptoolGateway) {}

  public async getAllMapEntities(): Promise<MapEntity[]> {
    const request: Request = { 
      getAllMapEntities: {} 
    };
    const response = await this.gateway.request(request);

    return response.getAllMapEntities!.entities.map((entity) => fromMapEntityDto(entity));
  }

  public async setMapEntity(entity: MapEntity): Promise<void> {
    const request: Request = { 
      setMapEntity: {
        entity: toMapEntityDto(entity),
      },
    };

    await this.gateway.request(request);
  }

  // public async setMapEntities(entities: MapEntity[]): Promise<void> {
  //   const request: Request = {
  //     se
  //   };

  //   await this.gateway.request(request);
  // }

  public async deleteMapEntity(entity: MapEntity): Promise<void> {
    const request: Request = {
      deleteMapEntity: {
        entity: toMapEntityDto(entity),
      },
    };

    await this.gateway.request(request);
  }
}
