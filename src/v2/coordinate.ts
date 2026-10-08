export interface Coordinate {
    latitude: number;
    longitude: number;
}

const isFiniteNumber = (value: unknown): value is number =>
    typeof value === 'number' && Number.isFinite(value);

const hasCoordinateShape = (
    value: unknown,
): value is { latitude: unknown; longitude: unknown } =>
    typeof value === 'object' &&
    value !== null &&
    'latitude' in value &&
    'longitude' in value;

export const assertCoordinate = (
    value: unknown,
): asserts value is Coordinate => {
    if (!hasCoordinateShape(value)) {
        throw new TypeError('Coordinate must provide latitude and longitude');
    }

    if (!isFiniteNumber(value.latitude) || !isFiniteNumber(value.longitude)) {
        throw new TypeError('Coordinate latitude and longitude must be finite numbers');
    }

    if (value.latitude < -90 || value.latitude > 90) {
        throw new RangeError('Coordinate latitude must be between -90 and 90');
    }

    if (value.longitude < -180 || value.longitude > 180) {
        throw new RangeError('Coordinate longitude must be between -180 and 180');
    }
};

export const isCoordinate = (value: unknown): value is Coordinate => {
    try {
        assertCoordinate(value);
        return true;
    } catch {
        return false;
    }
};
