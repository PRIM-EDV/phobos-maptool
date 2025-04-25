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

export interface MapEntitySquad {
    name: string,
    callsign: string,
    trackerId: number,
    combattants: number,
    status: MapEntityStatus
}

export interface MapEntityEnemy {
    combattants: number;
}

export interface MapEntityObjective {
    name: string;
    description: string;
}
export interface MapEntity {
    id: string;
    type: MapEntityType;
    position: {
        x: number;
        y: number;
    };
    entity: MapEntitySquad | MapEntityEnemy | MapEntityObjective;
}
