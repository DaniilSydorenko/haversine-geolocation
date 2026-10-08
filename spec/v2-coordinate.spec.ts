import {
    assertCoordinate,
    isCoordinate,
} from '../src/v2/coordinate';

describe('V2 coordinate validation', () => {
    it('accepts zero coordinates', () => {
        expect(isCoordinate({ latitude: 0, longitude: 0 })).toBe(true);
    });

    it('accepts inclusive geographic boundaries', () => {
        expect(isCoordinate({ latitude: 90, longitude: 180 })).toBe(true);
        expect(isCoordinate({ latitude: -90, longitude: -180 })).toBe(true);
    });

    it('accepts extra metadata without changing the coordinate contract', () => {
        expect(isCoordinate({
            latitude: 52.2297,
            longitude: 21.0122,
            accuracy: 5,
            id: 'warsaw',
        })).toBe(true);
    });

    it('rejects null and primitive values', () => {
        expect(isCoordinate(null)).toBe(false);
        expect(isCoordinate(undefined)).toBe(false);
        expect(isCoordinate('52,21')).toBe(false);
        expect(isCoordinate(0)).toBe(false);
    });

    it('rejects missing coordinate properties', () => {
        expect(isCoordinate({ latitude: 10 })).toBe(false);
        expect(isCoordinate({ longitude: 10 })).toBe(false);
    });

    it('rejects non-numeric coordinate values', () => {
        expect(isCoordinate({ latitude: '52', longitude: 21 })).toBe(false);
        expect(isCoordinate({ latitude: 52, longitude: '21' })).toBe(false);
    });

    it('rejects NaN and Infinity', () => {
        expect(isCoordinate({ latitude: NaN, longitude: 0 })).toBe(false);
        expect(isCoordinate({ latitude: 0, longitude: Infinity })).toBe(false);
        expect(isCoordinate({ latitude: -Infinity, longitude: 0 })).toBe(false);
    });

    it('rejects out-of-range coordinates', () => {
        expect(isCoordinate({ latitude: 90.000001, longitude: 0 })).toBe(false);
        expect(isCoordinate({ latitude: -90.000001, longitude: 0 })).toBe(false);
        expect(isCoordinate({ latitude: 0, longitude: 180.000001 })).toBe(false);
        expect(isCoordinate({ latitude: 0, longitude: -180.000001 })).toBe(false);
    });

    it('throws TypeError for malformed values', () => {
        expect(() => assertCoordinate(null)).toThrowError(TypeError);
        expect(() => assertCoordinate({
            latitude: '52',
            longitude: 21,
        })).toThrowError(TypeError);
        expect(() => assertCoordinate({
            latitude: NaN,
            longitude: 21,
        })).toThrowError(TypeError);
    });

    it('throws RangeError for finite out-of-range values', () => {
        expect(() => assertCoordinate({
            latitude: 91,
            longitude: 0,
        })).toThrowError(RangeError);

        expect(() => assertCoordinate({
            latitude: 0,
            longitude: 181,
        })).toThrowError(RangeError);
    });

    it('returns normally for a valid coordinate', () => {
        expect(() => assertCoordinate({
            latitude: 52.2297,
            longitude: 21.0122,
        })).not.toThrow();
    });
});
