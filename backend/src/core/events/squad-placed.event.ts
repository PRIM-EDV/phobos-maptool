import { Squad } from "proto/trx/trx.squad";

export class SquadPlacedEvent {
    squad: Squad;

    constructor(squad: Squad) {
        this.squad = squad;
    }
}