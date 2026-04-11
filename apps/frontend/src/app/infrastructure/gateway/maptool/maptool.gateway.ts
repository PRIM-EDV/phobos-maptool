import { Inject, Injectable, Optional } from "@angular/core";

import { RpcGateway } from "@phobos/common";
import { MFE_REGISTRY_SERVICE_TOKEN, IRegistryService } from "@phobos/core";
import { MaptoolMessage, Request, Response } from "@phobos-maptool/protocol";

import { MaptoolGatewayConfig } from "./maptool.gateway.config";


@Injectable(
  { providedIn: 'root' }
)
export class MaptoolGateway extends RpcGateway<MaptoolMessage, Request, Response> {
  protected override apiUrl: string = "";

  constructor(
    @Optional() @Inject(MFE_REGISTRY_SERVICE_TOKEN) private registry: IRegistryService
  ) {
    super(MaptoolMessage);
    this.apiUrl = this.getApiUrl();
  }

  private getApiUrl(): string {
    const maptoolProvider = this.registry?.find({ name: 'phobos-maptool' });

    if (maptoolProvider) {
      return maptoolProvider[0].apiUrl.toString();
    }
    return MaptoolGatewayConfig.defaultApiUrl;
  }
}
