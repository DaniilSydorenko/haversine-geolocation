import HaversineGeolocation from "../src/index";

describe("Haversine mathematical reference suite", () => {
    const EARTH_RADIUS_KM = 6372.8;

    const rawDistance = (
        latitude1: number,
        longitude1: number,
        latitude2: number,
        longitude2: number,
    ): number => HaversineGeolocation._haversine(
        latitude1,
        longitude1,
        latitude2,
        longitude2,
    );

    it("returns zero for coincident points", () => {
        expect(rawDistance(0, 0, 0, 0)).toBe(0);
    });

    it("matches the analytic one-degree equatorial arc", () => {
        const expected = EARTH_RADIUS_KM * Math.PI / 180;

        expect(rawDistance(0, 0, 0, 1)).toBeCloseTo(expected, 10);
    });

    it("matches the analytic quarter circumference along the equator", () => {
        const expected = EARTH_RADIUS_KM * Math.PI / 2;

        expect(rawDistance(0, 0, 0, 90)).toBeCloseTo(expected, 10);
    });

    it("matches the analytic pole-to-equator quarter circumference", () => {
        const expected = EARTH_RADIUS_KM * Math.PI / 2;

        expect(rawDistance(90, 0, 0, 0)).toBeCloseTo(expected, 10);
    });

    it("matches the analytic antipodal half circumference", () => {
        const expected = EARTH_RADIUS_KM * Math.PI;

        expect(rawDistance(0, 0, 0, 180)).toBeCloseTo(expected, 10);
    });

    it("takes the short path across the antimeridian", () => {
        const expected = EARTH_RADIUS_KM * (0.002 * Math.PI / 180);

        expect(rawDistance(0, 179.999, 0, -179.999)).toBeCloseTo(expected, 9);
    });

    it("is symmetric for representative coordinates", () => {
        const forward = rawDistance(52.2296756, 21.0122287, 59.9138688, 10.7522454);
        const reverse = rawDistance(59.9138688, 10.7522454, 52.2296756, 21.0122287);

        expect(forward).toBeCloseTo(reverse, 12);
    });

    it("returns finite non-negative values for representative valid coordinates", () => {
        const fixtures = [
            [0, 0, 0, 0],
            [0, 0, 0, 1],
            [90, 0, 0, 0],
            [-90, 0, 0, 0],
            [0, 179.999, 0, -179.999],
            [52.2296756, 21.0122287, 59.9138688, 10.7522454],
            [-33.8688, 151.2093, 35.6762, 139.6503],
        ];

        fixtures.forEach((fixture) => {
            const distance = rawDistance(
                fixture[0],
                fixture[1],
                fixture[2],
                fixture[3],
            );

            expect(Number.isFinite(distance)).toBe(true);
            expect(distance).toBeGreaterThanOrEqual(0);
        });
    });

    it("returns a finite result for a representative near-antipodal pair", () => {
        const distance = rawDistance(
            18.5032297229626,
            -89.06975041360795,
            -18.503229714326764,
            90.93024968423809,
        );

        expect(Number.isFinite(distance)).toBe(true);
        expect(distance).toBeGreaterThan(20000);
    });
});
