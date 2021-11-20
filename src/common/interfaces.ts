export interface ILocationPoint {
    latitude: number;
    longitude: number;
    accuracy: number;
}

export interface IHaversine {
    distance: number;
    measurement: string;
    accuracy: number;
}

export interface ILocationHaversinePoint extends ILocationPoint {
    haversine: IHaversine;
}
