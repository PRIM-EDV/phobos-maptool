import { CommonModule } from "@angular/common";
import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { PhButton, PhButtonList, PhForm, PhInput, PhSlider, PhWindow } from "@phobos/elements";
import { MapEntityType, MapEntityStatus, MapEntity } from "@phobos-maptool/models";
import { EntityClickEvent } from "@trx/map";

import { MapEntityService } from "../../../core/map-entity.service";
import { Dialog } from "../../../../infrastructure/ui/dialog/dialog.interface";

@Component({
  selector: "entity-edit-popup",
  standalone: true,
  templateUrl: "./edit-entity.dialog.component.html",
  styleUrls: ["./edit-entity.dialog.component.scss"],
  imports: [CommonModule, PhButton, PhButtonList, PhForm, PhInput, PhSlider, PhWindow],
})
export class EditEntityDialogComponent implements Dialog, AfterViewInit {
  @ViewChild(PhWindow) window!: PhWindow;

  public editEntity: MapEntity;
  public data?: {event: EntityClickEvent, entity: MapEntity};

  public MapEntityType = MapEntityType;
  public MapEntityStatus = MapEntityStatus;

  public constructor(private readonly entity: MapEntityService) {
    this.editEntity = entity.getDefaultEntity(MapEntityType.FRIEND);

  }

  ngAfterViewInit(): void {
    if (this.data) {
      this.window.ref.nativeElement.style.top = `${this.data.event.clientY}px`;
      this.window.ref.nativeElement.style.left = `${this.data.event.clientX}px`;
      this.editEntity =  this.data.entity;
    }
  }

  close(result: any = null): MapEntity | null {
    if (result) {
      return this.editEntity;
    } else {
      return null;
    }
  }

  public submit() {
    this.close(this.editEntity);
  }

  public cancel() {
    this.close();
  }

}