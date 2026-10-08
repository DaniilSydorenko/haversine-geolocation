import { assertCoordinate, Coordinate } from './coordinate';
import { convertDistance, DistanceUnit } from './units';

export const EARTH_MEAN_RADIUS_M = 6_371_008.8;

export interface DistanceOptions {
    unit?: DistanceUnit;
    radius?: number;
}

const degreesToRadians = (degrees: number): number =>
    degrees * Math.PI / 180;

const assertRadius = (radius: number): void => {
    if (!Number.isFinite(radius)) {
        throw new TypeError('Radius must be a finite number');
    }

    if (radius <= 0) {
        throw new RangeError('Radius must be greater than zero');
    }
};

export const distance = (
    from: Coordinate,
    to: Coordinate,
    options: DistanceOptions = {},
): number => {
    assertCoordinate(from);
    assertCoordinate(to);

    const unit = options.unit ?? 'km';
    const radius = options.radius ?? EARTH_MEAN_RADIUS_M;

    assertRadius(radius);

    const latitude1 = degreesToRadians(from.latitude);
    const longitude1 = degreesToRadians(from.longitude);
    const latitude2 = degreesToRadians(to.latitude);
    const longitude2 = degreesToRadians(to.longitude);

    const latitudeDelta = latitude2 - latitude1;
    const longitudeDelta = longitude2 - longitude1;

    const latitudeHaversine = Math.sin(latitudeDelta / 2);
    const longitudeHaversine = Math.sin(longitudeDelta / 2);

    const a =
        latitudeHaversine * latitudeHaversine +
        longitudeHaversine * longitudeHaversine *
        Math.cos(latitude1) *
        Math.cos(latitude2);

    const safeA = Math.min(1, Math.max(0, a));
    const centralAngle = 2 * Math.asin(Math.sqrt(safeA));
    const metres = radius * centralAngle;

    return convertDistance(metres, 'm', unit);
};
