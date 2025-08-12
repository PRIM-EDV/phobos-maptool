import { CommonModule } from "@angular/common";
import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { PhButton, PhButtonList, PhDropdown, PhDropdownItem, PhForm, PhInput, PhSlider, PhTextarea, PhWindow, PhSelectItem, PhSelectList, PhError } from "@phobos/elements";
import { MapEntity, MapEntityStatus, MapEntityType } from "@phobos-maptool/models";
import { EntityType, MapClickEvent } from "@trx/map";


import { Dialog } from "../../../../infrastructure/ui/dialog/dialog.interface";
import { MapEntityService } from "../../../core/map-entity.service";

@Component({
  selector: "entity-create-popup",
  standalone: true,
  templateUrl: "./create-entity.dialog.component.html",
  styleUrls: ["./create-entity.dialog.component.scss"],
  imports: [CommonModule, PhButton, PhButtonList, PhDropdown, PhDropdownItem, PhForm, PhInput, PhSlider, PhTextarea, PhWindow, PhSelectItem, PhSelectList, PhError]
})
export class CreateEntityDialogComponent implements Dialog, AfterViewInit {
  @ViewChild(PhWindow) window!: PhWindow;

  public newEntity: MapEntity;
  public validationErrorName: string | null = null;
  public validationErrorCallsign: string | null = null;

  public data?: MapClickEvent;

  public MapEntityType = MapEntityType;
  public MapEntityStatus = MapEntityStatus;

  constructor(private readonly entity: MapEntityService) {
    this.newEntity = this.getDefaultEntity(MapEntityType.FOE);
  }

  ngAfterViewInit(): void {
    if (this.data) {
      this.window.ref.nativeElement.style.top = `${this.data.clientY}px`;
      this.window.ref.nativeElement.style.left = `${this.data.clientX}px`;
      this.newEntity.position = { x: this.data.mapX, y: this.data.mapY };
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
    switch(this.newEntity.type) {
      case MapEntityType.FRIEND:
        if (this.validateName(this.newEntity.entity.name) && this.validateCallsign(this.newEntity.entity.callsign)) {
          this.close(this.newEntity);
        } break;
      case MapEntityType.OBJECT:
      if (this.validateName(this.newEntity.entity.name)) {
          this.close(this.newEntity);
      } break;
      case MapEntityType.FOE:
        this.close(this.newEntity);
    }
  }

  public cancel() {
    this.close();
  }

  public onSymbolChange(symbol: number) {
    console.log(symbol);
  }

  public onTypeChange(type: MapEntityType) {
    this.newEntity = this.getDefaultEntity(type);
  }

  private getDefaultEntity(type: MapEntityType): MapEntity {
    const entity = this.entity.getDefaultEntity(type);
    entity.position = this.data ? { x: this.data.mapX, y: this.data.mapY } : { x: 0, y: 0 };
    return entity;
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
