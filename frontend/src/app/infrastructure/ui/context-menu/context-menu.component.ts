import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { ContextMenuService } from './context-menu.service';


@Component({
    selector: 'app-context-menu',
    standalone: false,
    template: `<ng-template #contextMenuContainer></ng-template>`,
})
export class ContextMenuComponent {

    @ViewChild('contextMenuContainer', { read: ViewContainerRef }) container!: ViewContainerRef;
  
    constructor(
      private readonly contextMenu: ContextMenuService,
    ) {}

    ngAfterViewInit() {
      this.contextMenu.registerHost(this.container);
    }
}