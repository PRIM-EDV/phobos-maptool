import { Injectable, ViewContainerRef } from "@angular/core";
import { ContextMenuEntry } from "./interfaces/context-menu-entry.interface";
import { PhContextMenu } from "@phobos/elements";

@Injectable({
  providedIn: "root",
})
export class ContextMenuService {
  private host: ViewContainerRef | null = null;
  private ref: any = null;

  constructor() {
    window.addEventListener("mousedown", (e) => {
      if (this.ref && !this.ref.location.nativeElement.contains(e.target)) {
        this.ref.instance.close();
      }
    });

    window.addEventListener("wheel", (e) => {
      if (this.ref && !this.ref.location.nativeElement.contains(e.target)) {
        this.ref.instance.close();
      }
    });
  }

  registerHost(container: ViewContainerRef) {
    this.host = container;
  }

  open(config: {
    entries: ContextMenuEntry[];
    position: { x: number; y: number };
  }) {
    if (!this.host) {
      throw new Error("ContextMenuHost not registered.");
    }

    if (this.ref) {
      this.ref.destroy();
    }

    this.ref = this.host.createComponent(PhContextMenu);

    this.ref.instance.entries = config.entries;
    this.ref.instance.position = config.position;
    this.ref.instance.close = () => {
      this.ref.destroy();
    };
  }
}
