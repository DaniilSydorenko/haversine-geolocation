import {
    assertCoordinate,
    assertDistanceUnit,
    convertDistance,
    distance,
    EARTH_MEAN_RADIUS_M,
    isCoordinate,
    nearest,
} from '../src/v2';

describe('V2 core barrel', () => {
    it('exposes the pure V2 core as one cohesive module', () => {
        expect(typeof assertCoordinate).toBe('function');
        expect(typeof assertDistanceUnit).toBe('function');
        expect(typeof convertDistance).toBe('function');
        expect(typeof distance).toBe('function');
        expect(typeof isCoordinate).toBe('function');
        expect(typeof nearest).toBe('function');
        expect(EARTH_MEAN_RADIUS_M).toBe(6_371_008.8);
    });

    it('can calculate distance and nearest through the barrel', () => {
        const origin = { latitude: 0, longitude: 0 };
        const candidates = [
            { id: 'near', latitude: 0, longitude: 1 },
            { id: 'far', latitude: 0, longitude: 2 },
        ];

        expect(distance(origin, candidates[0])).toBeGreaterThan(0);
        expect(nearest(origin, candidates)!.point.id).toBe('near');
    });
});
