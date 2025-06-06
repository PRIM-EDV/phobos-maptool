import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";

import { PhButton, PhButtonList, PhForm, PhInput, PhSlider, PhWindow } from "@phobos/elements";
import { Squad, SquadState } from "@phobos-maptool/models";

import { Dialog } from "../../../../infrastructure/ui/dialog/dialog.interface";

@Component({
  selector: "squad-edit-dialog",
  standalone: true,
  templateUrl: "./edit-squad.dialog.component.html",
  styleUrls: ["./edit-squad.dialog.component.scss"],
  imports: [PhButton, PhButtonList, PhForm, PhInput, PhSlider, PhWindow],
})
export class EditSquadDialogComponent implements Dialog, OnInit, AfterViewInit {
  @ViewChild(PhWindow) window!: PhWindow;

  public data!: { squad: Squad; position?: { x: number; y: number } };
  public squad: Squad = {
    name: "",
    callsign: "",
    combattants: 0,
    state: SquadState.UNSTAGED,
    position: 0,
  };

  constructor() {}

  ngOnInit(): void {
    this.squad = this.data.squad;
  }

  ngAfterViewInit(): void {
    if (this.data.position) {
      this.window.ref.nativeElement.style.top = `${this.data.position.y}px`;
      this.window.ref.nativeElement.style.left = `${this.data.position.x}px`;
    }
  }

  close(result: any = null): Squad | null {
    if (result) {
      return this.squad;
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
