import {
  AfterViewInit,
  Component,
  EventEmitter,
  Output,
  ViewChild,
} from "@angular/core";

import { Squad, SquadState } from "@phobos-maptool/models";

import { Dialog } from "../../../../infrastructure/ui/dialog/dialog.interface";
import { PhWindowComponent } from "../../../../../../lib/ph-elements/ph-window/ph-window.component";

@Component({
  selector: "squad-create-popup",
  standalone: false,
  templateUrl: "./create-squad.dialog.component.html",
  styleUrls: ["./create-squad.dialog.component.scss"],
})
export class CreateSquadDialogComponent implements Dialog, AfterViewInit {
  @ViewChild(PhWindowComponent) window!: PhWindowComponent;

  public data?: { x: number; y: number };
  public squad: Squad = {
    name: "",
    callsign: "",
    combattants: 0,
    state: SquadState.UNSTAGED,
    position: 0,
  };

  constructor() {}

  ngAfterViewInit(): void {
    if (this.data) {
      this.window.ref.nativeElement.style.top = `${this.data.y}px`;
      this.window.ref.nativeElement.style.left = `${this.data.x}px`;
    }
  }

  close(result: any = null): Squad | null {
    if (result) {
      return this.squad
    } else {
      return null;
    }
  }

  public submit() {
    this.close(this.squad);
  }

  public cancel() {
    this.close();
  }
}
