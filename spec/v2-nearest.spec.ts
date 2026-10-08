import { nearest } from '../src/v2/nearest';

describe('V2 nearest', () => {
    const origin = {
        latitude: 52.2296756,
        longitude: 21.0122287,
    };

    it('returns the nearest candidate', () => {
        const candidates = [
            {
                id: 'oslo',
                latitude: 59.9138688,
                longitude: 10.7522454,
            },
            {
                id: 'warsaw-nearby',
                latitude: 52.2300,
                longitude: 21.0120,
            },
        ];

        const result = nearest(origin, candidates);

        expect(result).toBeDefined();
        expect(result!.point.id).toBe('warsaw-nearby');
        expect(result!.distance).toBeGreaterThanOrEqual(0);
    });

    it('preserves the original candidate object identity and metadata', () => {
        const candidate = {
            id: 'target',
            title: 'Target',
            latitude: 52.2300,
            longitude: 21.0120,
            metadata: {
                category: 'example',
            },
        };

        const result = nearest(origin, [candidate]);

        expect(result!.point).toBe(candidate);
        expect(result!.point.metadata.category).toBe('example');
    });

    it('does not mutate candidates or their array', () => {
        const candidate = Object.freeze({
            id: 'frozen',
            latitude: 52.2300,
            longitude: 21.0120,
        });
        const candidates = Object.freeze([candidate]);

        const result = nearest(origin, candidates);

        expect(result!.point).toBe(candidate);
        expect(candidates.length).toBe(1);
        expect(Object.keys(candidate)).toEqual([
            'id',
            'latitude',
            'longitude',
        ]);
    });

    it('returns undefined for an empty candidate collection', () => {
        expect(nearest(origin, [])).toBeUndefined();
    });

    it('selects the first candidate when distances are equal', () => {
        const candidates = [
            {
                id: 'first',
                latitude: 0,
                longitude: 1,
            },
            {
                id: 'second',
                latitude: 0,
                longitude: -1,
            },
        ];

        const result = nearest(
            { latitude: 0, longitude: 0 },
            candidates,
        );

        expect(result!.point.id).toBe('first');
    });

    it('propagates the requested distance unit', () => {
        const candidate = {
            latitude: 0,
            longitude: 1,
        };

        const kilometres = nearest(
            { latitude: 0, longitude: 0 },
            [candidate],
            { unit: 'km' },
        )!.distance;

        const metres = nearest(
            { latitude: 0, longitude: 0 },
            [candidate],
            { unit: 'm' },
        )!.distance;

        expect(metres).toBeCloseTo(kilometres * 1000, 8);
    });

    it('propagates a custom spherical radius', () => {
        const result = nearest(
            { latitude: 0, longitude: 0 },
            [{ latitude: 0, longitude: 90 }],
            {
                unit: 'm',
                radius: 1000,
            },
        );

        expect(result!.distance).toBeCloseTo(1000 * Math.PI / 2, 12);
    });

    it('validates candidate coordinates through distance()', () => {
        expect(() => nearest(
            origin,
            [{
                latitude: 100,
                longitude: 0,
            }],
        )).toThrowError(RangeError);
    });
});
