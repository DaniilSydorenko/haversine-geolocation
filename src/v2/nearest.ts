import { Coordinate } from './coordinate';
import { distance, DistanceOptions } from './distance';

export interface NearestResult<T> {
    point: T;
    distance: number;
}

export const nearest = <T extends Coordinate>(
    origin: Coordinate,
    candidates: readonly T[],
    options: DistanceOptions = {},
): NearestResult<T> | undefined => {
    let closestPoint: T | undefined;
    let closestDistance = Infinity;

    for (const candidate of candidates) {
        const candidateDistance = distance(origin, candidate, options);

        if (candidateDistance < closestDistance) {
            closestPoint = candidate;
            closestDistance = candidateDistance;
        }
    }

    if (closestPoint === undefined) {
        return undefined;
    }

    return {
        point: closestPoint,
        distance: closestDistance,
    };
};
