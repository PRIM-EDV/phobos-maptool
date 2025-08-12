import { CommonModule } from "@angular/common";
import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { PhButton, PhButtonList, PhError, PhForm, PhInput, PhSelectItem, PhSelectList, PhSlider, PhTextarea, PhWindow } from "@phobos/elements";
import { MapEntityType, MapEntityStatus, MapEntity } from "@phobos-maptool/models";
import { EntityMouseEvent } from "@trx/map";

import { MapEntityService } from "../../../core/map-entity.service";
import { Dialog } from "../../../../infrastructure/ui/dialog/dialog.interface";

@Component({
  selector: "entity-edit-popup",
  standalone: true,
  templateUrl: "./edit-entity.dialog.component.html",
  styleUrls: ["./edit-entity.dialog.component.scss"],
  imports: [CommonModule, PhButton, PhButtonList, PhForm, PhInput, PhSlider, PhTextarea, PhSelectList, PhSelectItem, PhError, PhWindow],
})
export class EditEntityDialogComponent implements Dialog, AfterViewInit {
  @ViewChild(PhWindow) window!: PhWindow;

  public editEntity: MapEntity;
  public validationErrorName: string | null = null;
  public validationErrorCallsign: string | null = null;

  public data?: {event: EntityMouseEvent, entity: MapEntity};

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
    switch(this.editEntity.type) {
      case MapEntityType.FRIEND:
        if (this.validateName(this.editEntity.entity.name) && this.validateCallsign(this.editEntity.entity.callsign)) {
          this.close(this.editEntity);
        } break;
      case MapEntityType.OBJECT:
      if (this.validateName(this.editEntity.entity.name)) {
          this.close(this.editEntity);
      } break;
      case MapEntityType.FOE:
        this.close(this.editEntity);
    }
  }

  public cancel() {
    this.close();
  }

  private validateCallsign(callsign: string | null | undefined): boolean {
    if (!callsign || callsign === "") {
      this.validationErrorCallsign = "Callsign is required.";
      return false;
    }
    this.validationErrorCallsign = null;
    return true;
  }

  private validateName(name: string | null | undefined): boolean {
    if (!name || name === "") {
      this.validationErrorName = "Name is required.";
      return false;
    }

    this.validationErrorName = null;
    return true;
  }

}