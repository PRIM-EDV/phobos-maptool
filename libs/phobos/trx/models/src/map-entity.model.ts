export enum MapEntityType {
  UNDEFINED = 0,
  FOE = 1,
  FRIEND = 2,
  OBJECT = 3,
}

export enum MapEntityStatus {
  UNDEFINED = 0,
  REGULAR = 1,
  COMBAT = 2,
}

export interface MapEntityBase {
  id: string;
  position: {
    x: number;
    y: number;
  };
  notes: string;
  symbol: number;
}

export interface MapEntitySquad {
  name: string;
  callsign: string;
  trackerId: number;
  combattants: number;
  status: MapEntityStatus;
}

interface IMapEntitySquad extends MapEntityBase {
  type: MapEntityType.FRIEND;
  entity: {
    name: string;
    callsign: string;
    trackerId: number;
    combattants: number;
    status: MapEntityStatus;
  };
}

export interface MapEntityFoe {
  combattants: number;
}
interface IMapEntityFoe extends MapEntityBase {
  type: MapEntityType.FOE;
  entity: MapEntityFoe;
}

export interface MapEntityObjective {
  name: string;
  description: string;
}
interface IMapEntityObject extends MapEntityBase {
  type: MapEntityType.OBJECT;
  entity: MapEntityObjective;
}

export type MapEntity = IMapEntitySquad | IMapEntityFoe | IMapEntityObject;