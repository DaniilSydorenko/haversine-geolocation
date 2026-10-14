import { assertCoordinate } from './coordinate.js';
import type { Coordinate } from './coordinate.js';
import { distance } from './distance.js';
import type { DistanceOptions } from './distance.js';

export interface NearestResult<T> {
    point: T;
    distance: number;
}

export const nearest = <T extends Coordinate>(
    origin: Coordinate,
    candidates: readonly T[],
    options: DistanceOptions = {},
): NearestResult<T> | undefined => {
    assertCoordinate(origin);

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
