import { ILocationHaversinePoint, ILocationPoint } from './common/interfaces';
import { convertMeasurement, showError, showGeolocationError, getHaversineEntity, calculateHaversine } from './utils';
import {ERRORS} from "./common/consts";

class Haversine {
    isGeolocationAvailable(): Promise<GeolocationPosition> {
        return new Promise((resolve) => {
            if ('geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition((data: GeolocationPosition) => {
                    resolve(data);
                }, (error: GeolocationPositionError) => {
                    showGeolocationError(error);
                });
            } else {
                showError(ERRORS.WRONG_BROWSER);
            }
        });
    };

    getDistanceBetween(p1: ILocationPoint, p2: ILocationPoint, measurement: string): number {
        let distanceBetweenPoints;
        if (p1.latitude && p1.longitude && p2.latitude && p2.longitude) {
            const distance: number = calculateHaversine(
                p1.latitude,
                p1.longitude,
                p2.latitude,
                p2.longitude
            );
            distanceBetweenPoints = convertMeasurement(distance, measurement)
        } else {
            showError(`${ERRORS.WRONG_DATA} ${p1} \n ${p2}`);
            distanceBetweenPoints = 0;
        }
        return distanceBetweenPoints;
    }

    getClosestPosition(
        current: ILocationPoint,
        otherPoints: ILocationPoint[],
        measurement: string,
    ): ILocationHaversinePoint | void {
        const distances: number[] = otherPoints
            .map((value: any) => this.getDistanceBetween(current, value, measurement))
            .filter(Boolean);
        if (distances.length > 0) {
            const indexOfSmallest: number = distances.indexOf(Math.min(...distances));
            return {
                ...otherPoints[indexOfSmallest],
                haversine: {
                    distance: distances[indexOfSmallest],
                    measurement,
                    accuracy: current.accuracy
                },
            };
        }
    };
}

const HaversineGeolocation = getHaversineEntity(Haversine);

export { HaversineGeolocation };
