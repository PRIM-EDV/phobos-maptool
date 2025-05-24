import {
  AfterViewInit,
  Component,
  ViewChild,
} from "@angular/core";

import { PhButton, PhButtonList, PhForm, PhInput, PhSlider, PhWindow } from "@phobos/elements";
import { Squad, SquadState } from "@phobos-maptool/models";

import { Dialog } from "../../../../infrastructure/ui/dialog/dialog.interface";

@Component({
  selector: "squad-create-popup",
  standalone: true,
  templateUrl: "./create-squad.dialog.component.html",
  styleUrls: ["./create-squad.dialog.component.scss"],
  imports: [
    PhButton,
    PhButtonList,
    PhInput,
    PhForm,
    PhSlider,
    PhWindow,
  ],
})
export class CreateSquadDialogComponent implements Dialog, AfterViewInit {
  @ViewChild(PhWindow) window!: PhWindow;

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
