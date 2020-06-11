import { ILocationPoint } from "./interfaces/ILocationPoint";

class HaversineGeolocation {
    _convertMeasurements(distance: number, measurement: string = 'km'): number {
        let rawValue: string = '';
        switch (measurement.toLowerCase()) {
            case 'mi' :
                rawValue = (distance * 0.62137).toFixed(1);
                break;
            case 'km' :
                rawValue = distance.toFixed(1);
                break;
            case 'm' :
                rawValue = (distance * 1000).toFixed();
                break;
            default :
                rawValue = distance.toFixed(1);
        }
        return parseFloat(rawValue);
    }

    _haversine(...args: number[]): number {
        const rad: number[] = args.map((deg: number) => deg / 180.0 * Math.PI);
        const lat1: number = rad[0];
        const lon1: number = rad[1];
        const lat2: number = rad[2];
        const lon2: number = rad[3];
        const R: number = 6372.8;
        const dLat: number = lat2 - lat1;
        const dLon: number = lon2 - lon1;

        const a: number = Math.sin(dLat / 2) *
            Math.sin(dLat / 2) +
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2) *
            Math.cos(lat1) *
            Math.cos(lat2);

        const c: number = 2 * Math.asin(Math.sqrt(a));

        return R * c;
    };

    isGeolocationAvailable(): Promise<Position> {
        return new Promise((resolve, reject) => {
            if ('geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition((data: Position) => {
                    resolve(data);
                }, (error: PositionError) => {
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            reject(new Error("Error: Permission denied"));
                            break;
                        case error.POSITION_UNAVAILABLE:
                            reject(new Error("Error: Position unavailable"));
                            break;
                        case error.TIMEOUT:
                            reject(new Error("Error: Timeout"));
                            break;
                    }
                });
            } else {
                reject(new Error("Error: Geolocation disabled in your browser"));
            }
        });
    };

    getDistanceBetween(p1: ILocationPoint, p2: ILocationPoint, measurement: string): number {
        if (p1.hasOwnProperty('latitude') && p1.hasOwnProperty('longitude') &&
            p2.hasOwnProperty('latitude') && p2.hasOwnProperty('longitude')) {
            const distance: number = this._haversine(
                p1.latitude,
                p1.longitude,
                p2.latitude,
                p2.longitude
            );

            return this._convertMeasurements(distance, measurement)

        } else {
            throw new Error("Error: Position latitude or longitude is not correct");
        }
    }

    getClosestPosition(current: ILocationPoint, otherPoints: ILocationPoint[], measurement: string): ILocationPoint {
        const distances: number[] = otherPoints.map((value: any) => this.getDistanceBetween(current, value, measurement));
        const indexOfSmallest: number = distances.indexOf(Math.min(...distances));

        return {
            ...otherPoints[indexOfSmallest],
            haversine: {
                distance: distances[indexOfSmallest],
                measurement,
                accuracy: current.accuracy
            },
        };
    };
}

export default new HaversineGeolocation();
