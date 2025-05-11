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
}

export interface MapEntityFriend extends MapEntityBase {
  type: MapEntityType.FRIEND;
  entity: {
    name: string;
    callsign: string;
    trackerId: number;
    combattants: number;
    status: MapEntityStatus;
  };
}

export interface MapEntityFoe extends MapEntityBase {
  type: MapEntityType.FOE;
  entity: {
    combattants: number;
  };
}

export interface MapEntityObject extends MapEntityBase {
  type: MapEntityType.OBJECT;
  entity: {
    name: string;
    description: string;
  };
}

export type MapEntity = MapEntityFriend | MapEntityFoe | MapEntityObject;