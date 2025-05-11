import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { MapEntity, MapEntityStatus, MapEntityType } from "@phobos-maptool/models";

import { v4 as uuidv4 } from 'uuid';

import { Dialog } from "../../../../infrastructure/ui/dialog/dialog.interface";
import { PhWindowComponent } from "../../../../../../lib/ph-elements/ph-window/ph-window.component";
import { PhElementsModule } from "../../../../../../lib/ph-elements/ph-elements.module";
import { CommonModule } from "@angular/common";

@Component({
  selector: "entity-create-popup",
  standalone: true,
  templateUrl: "./create-entity.dialog.component.html",
  styleUrls: ["./create-entity.dialog.component.scss"],
  imports: [
    CommonModule,
    PhElementsModule
  ],
})
export class CreateEntityDialogComponent implements Dialog, AfterViewInit {
  @ViewChild(PhWindowComponent) window!: PhWindowComponent;

  public MapEntityType = MapEntityType;
  public MapEntityStatus = MapEntityStatus;

  public data?: { x: number; y: number };
  public entity: MapEntity = this.createEmptyEntity(MapEntityType.FOE);

  constructor() {}

  ngAfterViewInit(): void {
    if (this.data) {
      this.window.ref.nativeElement.style.top = `${this.data.y}px`;
      this.window.ref.nativeElement.style.left = `${this.data.x}px`;
    }
  }

  close(result: any = null): MapEntity | null {
    if (result) {
      return this.entity
    } else {
      return null;
    }
  }

  public submit() {
    this.close(this.entity);
  }

  public cancel() {
    this.close();
  }

  public onTypeChange(type: MapEntityType) {
    this.entity = this.createEmptyEntity(type);
  }

  private createEmptyEntity(type: MapEntityType): MapEntity {
    const base = {
      id: uuidv4(),
      position: {
        x: 0,
        y: 0
      }
    }

    switch (type) {
      case MapEntityType.FOE:
        return {
          ...base,
          type: MapEntityType.FOE,
          entity: {
            combattants: 0
          }
        }
      case MapEntityType.FRIEND:
        return {
          ...base,
          type: MapEntityType.FRIEND,
          entity: {
            name: "",
            callsign: "",
            trackerId: 0,
            combattants: 0,
            status: MapEntityStatus.REGULAR
          }
        }
      case MapEntityType.OBJECT:
        return {
          ...base,
          type: MapEntityType.OBJECT,
          entity: {
            name: "",
            description: ""
          }
        }
      default:
        throw new Error("Invalid entity type");
    }
  }

}
