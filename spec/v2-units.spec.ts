import {
    assertDistanceUnit,
    convertDistance,
} from '../src/v2/units';

describe('V2 distance units', () => {
    it('keeps metres unchanged', () => {
        expect(convertDistance(12.5, 'm', 'm')).toBe(12.5);
    });

    it('converts kilometres to metres exactly', () => {
        expect(convertDistance(1.234, 'km', 'm')).toBe(1234);
    });

    it('converts metres to kilometres without presentation rounding', () => {
        expect(convertDistance(1234.567, 'm', 'km')).toBeCloseTo(1.234567, 12);
    });

    it('uses the international mile definition', () => {
        expect(convertDistance(1, 'mi', 'm')).toBe(1609.344);
        expect(convertDistance(1609.344, 'm', 'mi')).toBeCloseTo(1, 12);
    });

    it('converts kilometres and miles without V1 rounding', () => {
        const miles = convertDistance(10, 'km', 'mi');

        expect(miles).toBeCloseTo(6.2137119223733395, 12);
    });

    it('round-trips between units within floating-point tolerance', () => {
        const source = 123.456789;
        const miles = convertDistance(source, 'km', 'mi');
        const roundTrip = convertDistance(miles, 'mi', 'km');

        expect(roundTrip).toBeCloseTo(source, 12);
    });

    it('allows zero and negative numeric conversion primitives', () => {
        expect(convertDistance(0, 'km', 'm')).toBe(0);
        expect(convertDistance(-1, 'km', 'm')).toBe(-1000);
    });

    it('rejects non-finite distance values', () => {
        expect(() => convertDistance(NaN, 'm', 'km')).toThrowError(TypeError);
        expect(() => convertDistance(Infinity, 'm', 'km')).toThrowError(TypeError);
        expect(() => convertDistance(-Infinity, 'm', 'km')).toThrowError(TypeError);
    });

    it('rejects unknown units', () => {
        expect(() => assertDistanceUnit('yards')).toThrowError(TypeError);
        expect(() => convertDistance(1, 'yards' as any, 'm')).toThrowError(TypeError);
        expect(() => convertDistance(1, 'm', 'yards' as any)).toThrowError(TypeError);
    });
});
