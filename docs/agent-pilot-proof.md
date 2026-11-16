# OpenHands Distance API Documentation

This document explains the `distance(a, b)` API from the OpenHands project as referenced in Issue #220.

## API Overview
The `distance` function calculates the distance between two geographical coordinates.

### Signature
```typescript
function distance(from: Coordinate, to: Coordinate, options?: DistanceOptions): number
```

### Parameters
- **from**: The starting geographical coordinate.
- **to**: The destination geographical coordinate.
- **options**: Optional parameters that can include:
  - `unit`: The unit of measurement for the distance (e.g., kilometers).
  - `radius`: The radius to be used for distance calculation.

### Usage Example
```typescript
const pointA: Coordinate = { latitude: 34.0522, longitude: -118.2437 }; // Los Angeles
const pointB: Coordinate = { latitude: 40.7128, longitude: -74.0060 }; // New York
const options: DistanceOptions = { unit: 'km' };
const dist = distance(pointA, pointB, options);
console.log(`Distance: ${dist} km`);
```

### Important Note
This documentation does not change library behavior.