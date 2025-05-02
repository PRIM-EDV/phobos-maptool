import { Injectable, ViewContainerRef } from '@angular/core';
import { ContextMenuEntry } from './interfaces/context-menu-entry.interface';
import { PhContextMenuComponent } from '../../../../../lib/ph-elements/ph-context-menu/ph-context-menu.component';

@Injectable({
    providedIn: 'root',
})
export class ContextMenuService {
    private host: ViewContainerRef | null = null;
    private ref: any = null;
    
    constructor() {}

    registerHost(container: ViewContainerRef) {
        this.host = container;
    }

    open(config: {entries: ContextMenuEntry[], position: { x: number; y: number }}) {
        if (!this.host) {
          throw new Error('ContextMenuHost not registered.');
        }

        if (this.ref) {
          this.ref.destroy();
        }
    
        this.ref = this.host.createComponent(PhContextMenuComponent);

        this.ref.instance.entries = config.entries;
        this.ref.instance.position = config.position;
        this.ref.instance.close = () => {
          this.ref.destroy();
        };
      }
}