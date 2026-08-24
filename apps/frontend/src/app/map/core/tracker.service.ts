import { Injectable, signal, WritableSignal } from "@angular/core";
import { Tracker } from "@phobos-maptool/models";

@Injectable({ providedIn: "root" })
export class TrackerService {
  public trackers: WritableSignal<Tracker[]> = signal<Tracker[]>([]);

  public setTracker(tracker: Tracker) {
    const existing = this.trackers().find((e) => e.id === tracker.id);

    if (existing) {
      this.updateTracker(existing, tracker);
    } else {
      this.trackers.update((trackers) => [...trackers, tracker]);
    }
  }

  public deleteTracker(trackerId: string) {
    // const currentTrackers = this.tracker();
    // const updatedTrackers = currentTrackers.filter(t => t.id !== trackerId);
    // this.tracker.set(updatedTrackers);
  }

  private updateTracker(existing: Tracker, updated: Tracker) {
    this.trackers.update((trackers) => {
      return trackers.map((tracker) => {
        if (tracker.id === existing.id) {
          return { ...tracker, ...updated };
        } else {
          return tracker;
        }
      });
    });
  }
}