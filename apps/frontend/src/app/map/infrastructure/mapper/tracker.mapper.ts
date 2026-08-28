import { Tracker as MapEntityTracker } from "@phobos-maptool/models";
import { Tracker } from "@trx/map";

export function toTracker(tracker: MapEntityTracker, hidden = false): Tracker {
  return {
    id: tracker.id,
    text: tracker.id,
    position: {
      x: tracker.position.x,
      y: tracker.position.y,
    },
    hidden,
  };
}
