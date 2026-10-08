import {
    distance,
    EARTH_MEAN_RADIUS_M,
} from '../src/v2/distance';

describe('V2 spherical distance', () => {
    const origin = { latitude: 0, longitude: 0 };

    it('returns zero for coincident points', () => {
        expect(distance(origin, origin)).toBe(0);
    });

    it('defaults to kilometres without presentation rounding', () => {
        const expected = EARTH_MEAN_RADIUS_M * Math.PI / 180 / 1000;

        expect(distance(origin, {
            latitude: 0,
            longitude: 1,
        })).toBeCloseTo(expected, 12);
    });

    it('supports metres', () => {
        const expected = EARTH_MEAN_RADIUS_M * Math.PI / 180;

        expect(distance(
            origin,
            { latitude: 0, longitude: 1 },
            { unit: 'm' },
        )).toBeCloseTo(expected, 9);
    });

    it('supports miles through the typed unit primitive', () => {
        const expectedMetres = EARTH_MEAN_RADIUS_M * Math.PI / 180;
        const expectedMiles = expectedMetres / 1609.344;

        expect(distance(
            origin,
            { latitude: 0, longitude: 1 },
            { unit: 'mi' },
        )).toBeCloseTo(expectedMiles, 12);
    });

    it('matches an analytic quarter circumference', () => {
        const expected = EARTH_MEAN_RADIUS_M * Math.PI / 2 / 1000;

        expect(distance(origin, {
            latitude: 0,
            longitude: 90,
        })).toBeCloseTo(expected, 10);
    });

    it('matches an analytic antipodal half circumference', () => {
        const expected = EARTH_MEAN_RADIUS_M * Math.PI / 1000;

        expect(distance(origin, {
            latitude: 0,
            longitude: 180,
        })).toBeCloseTo(expected, 10);
    });

    it('takes the short path across the antimeridian', () => {
        const expected = EARTH_MEAN_RADIUS_M * (0.002 * Math.PI / 180) / 1000;

        expect(distance(
            { latitude: 0, longitude: 179.999 },
            { latitude: 0, longitude: -179.999 },
        )).toBeCloseTo(expected, 9);
    });

    it('is symmetric', () => {
        const warsaw = { latitude: 52.2296756, longitude: 21.0122287 };
        const oslo = { latitude: 59.9138688, longitude: 10.7522454 };

        expect(distance(warsaw, oslo)).toBeCloseTo(
            distance(oslo, warsaw),
            12,
        );
    });

    it('returns a finite result for a representative near-antipodal pair', () => {
        const result = distance(
            {
                latitude: 18.5032297229626,
                longitude: -89.06975041360795,
            },
            {
                latitude: -18.503229714326764,
                longitude: 90.93024968423809,
            },
        );

        expect(Number.isFinite(result)).toBe(true);
        expect(result).toBeGreaterThan(20_000);
    });

    it('supports an explicit custom spherical radius in metres', () => {
        const customRadius = 1000;

        expect(distance(
            origin,
            { latitude: 0, longitude: 90 },
            { unit: 'm', radius: customRadius },
        )).toBeCloseTo(customRadius * Math.PI / 2, 12);
    });

    it('rejects malformed coordinates', () => {
        expect(() => distance(
            { latitude: NaN, longitude: 0 },
            origin,
        )).toThrowError(TypeError);
    });

    it('rejects out-of-range coordinates', () => {
        expect(() => distance(
            { latitude: 91, longitude: 0 },
            origin,
        )).toThrowError(RangeError);
    });

    it('rejects non-finite custom radii', () => {
        expect(() => distance(
            origin,
            { latitude: 0, longitude: 1 },
            { radius: Infinity },
        )).toThrowError(TypeError);
    });

    it('rejects zero and negative custom radii', () => {
        expect(() => distance(
            origin,
            { latitude: 0, longitude: 1 },
            { radius: 0 },
        )).toThrowError(RangeError);

        expect(() => distance(
            origin,
            { latitude: 0, longitude: 1 },
            { radius: -1 },
        )).toThrowError(RangeError);
    });
});
