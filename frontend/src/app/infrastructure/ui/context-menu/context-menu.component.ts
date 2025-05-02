import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { ContextMenuService } from './context-menu.service';


@Component({
    selector: 'app-context-menu',
    standalone: false,
    template: `<ng-template #contextMenuContainer></ng-template>`,
    styles: [ `:host { position: fixed; top: 0; left: 0; } `]
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