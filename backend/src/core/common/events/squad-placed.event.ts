import { Squad } from "../models/squad";

export class SquadPlacedEvent {
    squad: Squad;

    constructor(squad: Squad) {
        this.squad = squad;
    }
}