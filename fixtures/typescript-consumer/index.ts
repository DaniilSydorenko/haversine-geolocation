import legacyDefault, {
  distance,
  nearest,
  type Coordinate,
  type NearestResult,
} from 'haversine-geolocation';
import {
  getCurrentPosition,
  isGeolocationSupported,
} from 'haversine-geolocation/browser';
import legacy from 'haversine-geolocation/legacy';

type Place = Coordinate & {
  id: string;
  metadata: {
    region: string;
  };
};

const origin: Coordinate = {
  latitude: 59.9139,
  longitude: 10.7522,
};

const candidates = [
  {
    id: 'oslo',
    latitude: 59.9139,
    longitude: 10.7522,
    metadata: { region: 'NO-03' },
  },
  {
    id: 'bergen',
    latitude: 60.3913,
    longitude: 5.3221,
    metadata: { region: 'NO-46' },
  },
] satisfies readonly Place[];

const km: number = distance(origin, candidates[1], { unit: 'km' });
const closest = nearest(origin, candidates);

if (closest !== undefined) {
  const typedResult: NearestResult<Place> = closest;
  const id: string = typedResult.point.id;
  const region: string = typedResult.point.metadata.region;
  const meters: number = typedResult.distance;

  void id;
  void region;
  void meters;
}

const geolocationSupported: boolean = isGeolocationSupported();
const currentPosition: Promise<GeolocationPosition> = getCurrentPosition();

const legacyOrigin = {
  ...origin,
  accuracy: 0,
};

const legacyCandidate = {
  ...candidates[0],
  accuracy: 0,
};

const legacyRootDistance: number = legacyDefault.getDistanceBetween(
  legacyOrigin,
  legacyCandidate,
  'km',
);

const legacySubpathDistance: number = legacy.getDistanceBetween(
  legacyOrigin,
  legacyCandidate,
  'km',
);

void km;
void geolocationSupported;
void currentPosition;
void legacyRootDistance;
void legacySubpathDistance;
