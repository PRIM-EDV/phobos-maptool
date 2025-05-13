import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { MapEntity, MapEntityStatus, MapEntityType } from "@phobos-maptool/models";

import { Dialog } from "../../../../infrastructure/ui/dialog/dialog.interface";
import { PhWindowComponent } from "../../../../../../lib/ph-elements/ph-window/ph-window.component";
import { PhElementsModule } from "../../../../../../lib/ph-elements/ph-elements.module";
import { CommonModule } from "@angular/common";
import { Point } from "../../../interfaces/point.interface";
import { MapEntityService } from "../../../core/map-entity.service";
import { MapClickEvent } from "@trx/map";

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

  public newEntity: MapEntity;

  public MapEntityType = MapEntityType;
  public MapEntityStatus = MapEntityStatus;

  public data?: MapClickEvent;

  constructor(
    private readonly entity: MapEntityService,
  ) {
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
      return this.newEntity
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
    this.newEntity = this.getDefaultEntity(type);
  }

  private getDefaultEntity(type: MapEntityType): MapEntity {
    const entity = this.entity.getDefaultEntity(type);
    entity.position = this.data ? {x: this.data.mapX, y: this.data.mapY } : { x: 0, y: 0 };
    return entity;
  }

}
