export type DistanceUnit = 'm' | 'km' | 'mi';

const METRES_PER_UNIT: Record<DistanceUnit, number> = {
    m: 1,
    km: 1000,
    mi: 1609.344,
};

export const assertDistanceUnit = (
    value: unknown,
): asserts value is DistanceUnit => {
    if (value !== 'm' && value !== 'km' && value !== 'mi') {
        throw new TypeError('Distance unit must be one of: m, km, mi');
    }
};

export const convertDistance = (
    value: number,
    from: DistanceUnit,
    to: DistanceUnit,
): number => {
    if (!Number.isFinite(value)) {
        throw new TypeError('Distance value must be a finite number');
    }

    assertDistanceUnit(from);
    assertDistanceUnit(to);

    const metres = value * METRES_PER_UNIT[from];

    return metres / METRES_PER_UNIT[to];
};
