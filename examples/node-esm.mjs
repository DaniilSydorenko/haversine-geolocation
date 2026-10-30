// Run after installing the packed haversine-geolocation package in a Node project.
import assert from 'node:assert/strict';
import { distance, nearest } from 'haversine-geolocation';

const oslo = { latitude: 59.9139, longitude: 10.7522 };
const bergen = { latitude: 60.3913, longitude: 5.3221 };
const candidates = [
  { id: 'oslo', ...oslo, region: 'NO-03' },
  { id: 'bergen', ...bergen, region: 'NO-46' },
];

const km = distance(oslo, bergen); // kilometres by default, no rounding
const metres = distance(oslo, bergen, { unit: 'm' });
assert.ok(Number.isFinite(km) && km > 0);
assert.ok(Number.isFinite(metres) && metres > km);
assert.equal(distance(oslo, oslo), 0);

const closest = nearest(oslo, candidates, { unit: 'm' });
assert.ok(closest);
assert.equal(closest.point, candidates[0]); // same object, metadata retained
assert.equal(closest.point.region, 'NO-03');
assert.equal(closest.distance, 0);
assert.equal(nearest(oslo, []), undefined);

console.log('Packed ESM V2 example passed');
