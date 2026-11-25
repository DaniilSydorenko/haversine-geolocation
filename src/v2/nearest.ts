import { assertCoordinate } from './coordinate.js';
import type { Coordinate } from './coordinate.js';
import { assertDistanceOptions, distance } from './distance.js';
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

    if (candidates.length === 0) {
        assertDistanceOptions(options);
        return undefined;
    }

    let closestPoint: T | undefined;
    let closestDistance = options.radius === Infinity ? Infinity : Number.MAX_VALUE;

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
