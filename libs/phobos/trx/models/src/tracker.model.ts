export enum TrackerType {
    UNDEFINED = 0,
    FOE = 1,
    FRIEND = 2,
    OBJECT = 3,
}

export interface TrackerPosition {
    x: number;
    y: number;
}

export interface Tracker {
    id: string;
    size?: number;
    type: TrackerType;
    position: TrackerPosition;
}
