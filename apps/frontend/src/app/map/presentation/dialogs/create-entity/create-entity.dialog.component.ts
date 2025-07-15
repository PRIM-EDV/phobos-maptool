import { CommonModule } from "@angular/common";
import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { PhButton, PhButtonList, PhDropdown, PhDropdownItem, PhForm, PhInput, PhSlider, PhWindow } from "@phobos/elements";
import { MapEntity, MapEntityStatus, MapEntityType } from "@phobos-maptool/models";
import { MapClickEvent } from "@trx/map";


import { Dialog } from "../../../../infrastructure/ui/dialog/dialog.interface";
import { MapEntityService } from "../../../core/map-entity.service";

@Component({
  selector: "entity-create-popup",
  standalone: true,
  templateUrl: "./create-entity.dialog.component.html",
  styleUrls: ["./create-entity.dialog.component.scss"],
  imports: [CommonModule, PhButton, PhButtonList, PhDropdown, PhDropdownItem, PhForm, PhInput, PhSlider, PhWindow],
})
export class CreateEntityDialogComponent implements Dialog, AfterViewInit {
  @ViewChild(PhWindow) window!: PhWindow;

  public newEntity: MapEntity;

  public MapEntityType = MapEntityType;
  public MapEntityStatus = MapEntityStatus;

  public data?: MapClickEvent;

  constructor(private readonly entity: MapEntityService) {
    this.newEntity = this.getDefaultEntity(MapEntityType.FOE);
  }

  ngAfterViewInit(): void {
    if (this.data) {
      this.window.ref.nativeElement.style.top = `${this.data.clientY}px`;
      this.window.ref.nativeElement.style.left = `${this.data.clientX}px`;
    }
  }

  close(result: any = null): MapEntity | null {
    if (result) {
      return this.newEntity;
    } else {
      return null;
    }
  }

  public submit() {
    this.close(this.newEntity);
  }

  public cancel() {
    this.close();
  }

  public onTypeChange(type: MapEntityType) {
    this.newEntity = this.getDefaultEntity(type);
  }

  private getDefaultEntity(type: MapEntityType): MapEntity {
    const entity = this.entity.getDefaultEntity(type);
    entity.position = this.data ? { x: this.data.mapX, y: this.data.mapY } : { x: 0, y: 0 };
    return entity;
  }
}
