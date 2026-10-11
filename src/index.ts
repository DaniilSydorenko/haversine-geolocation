export { default } from './legacy.js';

export {
    assertCoordinate,
    assertDistanceUnit,
    convertDistance,
    distance,
    EARTH_MEAN_RADIUS_M,
    isCoordinate,
    nearest,
} from './v2/index.js';

export type {
    Coordinate,
    DistanceOptions,
    DistanceUnit,
    NearestResult,
} from './v2/index.js';
