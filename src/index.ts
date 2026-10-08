export { default } from './legacy';

export {
    assertCoordinate,
    assertDistanceUnit,
    convertDistance,
    distance,
    EARTH_MEAN_RADIUS_M,
    isCoordinate,
    nearest,
} from './v2';

export type {
    Coordinate,
    DistanceOptions,
    DistanceUnit,
    NearestResult,
} from './v2';
