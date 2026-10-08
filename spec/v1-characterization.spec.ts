import HaversineGeolocation from "../src/index";

describe("V1 characterization", () => {
    const pointA = {
        latitude: 61.5322204,
        longitude: 28.7515963,
        accuracy: 5,
    };

    const pointB = {
        latitude: 51.9971208,
        longitude: 22.1455439,
        accuracy: 10,
    };

    it("keeps the historical raw Haversine fixture", () => {
        const distance = HaversineGeolocation._haversine(
            pointA.latitude,
            pointA.longitude,
            pointB.latitude,
            pointB.longitude,
        );

        expect(distance).toBeCloseTo(1133.0627006180137, 10);
    });

    it("rounds kilometres to one decimal place", () => {
        expect(
            HaversineGeolocation.getDistanceBetween(pointA, pointB, "km"),
        ).toBe(1133.1);
    });

    it("rounds miles to one decimal place", () => {
        expect(
            HaversineGeolocation.getDistanceBetween(pointA, pointB, "mi"),
        ).toBe(704.1);
    });

    it("rounds metres to an integer", () => {
        expect(
            HaversineGeolocation.getDistanceBetween(pointA, pointB, "m"),
        ).toBe(1133063);
    });

    it("uses kilometres when measurement is omitted at runtime", () => {
        expect(
            HaversineGeolocation.getDistanceBetween(pointA, pointB, undefined as any),
        ).toBe(1133.1);
    });

    it("legacy behavior: unknown measurements silently fall back to kilometre-style output", () => {
        expect(
            HaversineGeolocation.getDistanceBetween(pointA, pointB, "bananas"),
        ).toBe(1133.1);
    });

    it("returns zero for the same point", () => {
        expect(
            HaversineGeolocation.getDistanceBetween(pointA, pointA, "km"),
        ).toBe(0);
    });

    it("accepts valid zero-valued coordinates because V1 checks property presence", () => {
        const origin = {
            latitude: 0,
            longitude: 0,
            accuracy: 1,
        };

        const equatorPoint = {
            latitude: 0,
            longitude: 1,
            accuracy: 1,
        };

        expect(
            HaversineGeolocation.getDistanceBetween(origin, equatorPoint, "km"),
        ).toBe(111.2);
    });

    it("legacy behavior: does not reject out-of-range coordinate values", () => {
        const invalidLatitude = {
            latitude: 91,
            longitude: 0,
            accuracy: 1,
        };

        const origin = {
            latitude: 0,
            longitude: 0,
            accuracy: 1,
        };

        expect(
            HaversineGeolocation.getDistanceBetween(invalidLatitude, origin, "km"),
        ).toBeGreaterThan(0);
    });

    it("throws when latitude or longitude properties are missing", () => {
        const missingLongitude = {
            latitude: 10,
            accuracy: 1,
        };

        expect(() => HaversineGeolocation.getDistanceBetween(
            missingLongitude as any,
            pointB,
            "km",
        )).toThrowError("Error: Position latitude or longitude is not correct");
    });

    it("returns the closest candidate and preserves its metadata", () => {
        const current = {
            latitude: 51.5,
            longitude: 21.5,
            accuracy: 7,
        };

        const candidates = [
            {
                id: "far",
                title: "Far",
                latitude: 61.5322204,
                longitude: 28.7515963,
                accuracy: 100,
            },
            {
                id: "near",
                title: "Near",
                latitude: 51.9971208,
                longitude: 22.1455439,
                accuracy: 100,
            },
        ];

        const result = HaversineGeolocation.getClosestPosition(
            current,
            candidates as any,
            "km",
        ) as any;

        expect(result.id).toBe("near");
        expect(result.title).toBe("Near");
        expect(result.haversine.measurement).toBe("km");
        expect(result.haversine.accuracy).toBe(7);
        expect(result.haversine.distance).toBeGreaterThan(0);
    });

    it("chooses the first candidate when distances are equal", () => {
        const current = {
            latitude: 0,
            longitude: 0,
            accuracy: 3,
        };

        const candidates = [
            {
                id: "first",
                latitude: 0,
                longitude: 1,
                accuracy: 1,
            },
            {
                id: "second",
                latitude: 0,
                longitude: -1,
                accuracy: 1,
            },
        ];

        const result = HaversineGeolocation.getClosestPosition(
            current,
            candidates as any,
            "km",
        ) as any;

        expect(result.id).toBe("first");
    });

    it("legacy behavior: empty candidate collections produce only haversine metadata", () => {
        const current = {
            latitude: 0,
            longitude: 0,
            accuracy: 3,
        };

        const result = HaversineGeolocation.getClosestPosition(
            current,
            [],
            "km",
        ) as any;

        expect(result.haversine.distance).toBeUndefined();
        expect(result.haversine.measurement).toBe("km");
        expect(result.haversine.accuracy).toBe(3);
    });
});
