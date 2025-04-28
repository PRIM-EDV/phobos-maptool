export enum SquadState {
    UNDEFINED = 0,
    UNSTAGED = 1,
    READY = 2,
    QRF_READY = 3,
    IN_FIELD = 4,
}

export interface Squad {
  name: string;
  callsign: string;
  state: SquadState;
  combattants: number;
  position: number;
}