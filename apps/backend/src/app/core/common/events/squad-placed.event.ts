import { Squad } from "@phobos-maptool/models";

export class SquadPlacedEvent {
    squad: Squad;

    constructor(squad: Squad) {
        this.squad = squad;
    }
}