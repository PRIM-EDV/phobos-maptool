import { Injectable, ViewContainerRef, Type } from "@angular/core";
import { Dialog } from "./dialog.interface";

@Injectable({ providedIn: 'root' })
export class DialogService {
  private host: ViewContainerRef | null = null;

  registerHost(container: ViewContainerRef) {
    this.host = container;
  }

  open<T extends Dialog>(
    component: Type<T>,
    data?: any
  ): Promise<any> {
    if (!this.host) {
      throw new Error('ModalHost is not registered.');
    }

    return new Promise((resolve) => {
      const ref = this.host!.createComponent(component);

      if ('data' in ref.instance) {
        (ref.instance as any).data = data;
      }

      if ('close' in ref.instance) {
        (ref.instance as any).close = (result: any) => {
          ref.destroy();
          resolve(result);
        };
      }
    });
  }
}
