import { Component, ViewChild, ViewContainerRef, Injector } from "@angular/core";
import { DialogService } from "./dialog.service";

@Component({
    selector: 'app-dialog',
    template: `<ng-template #dialogContainer></ng-template>`,
    standalone: true
  })
  export class DialogComponent {
    @ViewChild('dialogContainer', { read: ViewContainerRef }) container!: ViewContainerRef;
  
    constructor(
      private readonly dialog: DialogService
    ) {}

    ngAfterViewInit() {
      this.dialog.registerHost(this.container);
    }
  }