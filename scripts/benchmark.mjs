import { performance } from 'node:perf_hooks';
import { distance, nearest } from '../dist/index.mjs';

const DISTANCE_ITERATIONS = 500_000;
const NEAREST_CANDIDATES = 10_000;
const NEAREST_ITERATIONS = 50;

const origin = {
    latitude: 52.2296756,
    longitude: 21.0122287,
};

const destinations = Array.from({ length: 1024 }, (_, index) => ({
    latitude: -80 + ((index * 37) % 160) + (index % 100) / 1000,
    longitude: -170 + ((index * 53) % 340) + (index % 100) / 1000,
}));

const candidates = Array.from({ length: NEAREST_CANDIDATES }, (_, index) => ({
    id: index,
    latitude: -80 + ((index * 17) % 160) + (index % 1000) / 10_000,
    longitude: -170 + ((index * 29) % 340) + (index % 1000) / 10_000,
}));

const benchmark = (name, operations, run) => {
    const started = performance.now();
    const checksum = run();
    const elapsedMs = performance.now() - started;
    const operationsPerSecond = operations / (elapsedMs / 1000);

    return {
        name,
        operations,
        elapsedMs,
        operationsPerSecond,
        checksum,
    };
};

for (let index = 0; index < 50_000; index += 1) {
    distance(origin, destinations[index % destinations.length]);
}

for (let index = 0; index < 5; index += 1) {
    nearest(origin, candidates);
}

const distanceResult = benchmark('distance()', DISTANCE_ITERATIONS, () => {
    let total = 0;

    for (let index = 0; index < DISTANCE_ITERATIONS; index += 1) {
        total += distance(origin, destinations[index % destinations.length]);
    }

    return total;
});

const nearestResult = benchmark(
    'nearest() candidate evaluations',
    NEAREST_CANDIDATES * NEAREST_ITERATIONS,
    () => {
        let total = 0;

        for (let index = 0; index < NEAREST_ITERATIONS; index += 1) {
            const result = nearest(origin, candidates);

            if (!result) {
                throw new Error('nearest() benchmark unexpectedly returned undefined');
            }

            total += result.distance;
        }

        return total;
    },
);

const format = (result) => ({
    benchmark: result.name,
    operations: result.operations,
    elapsedMs: Number(result.elapsedMs.toFixed(2)),
    operationsPerSecond: Math.round(result.operationsPerSecond),
    checksum: Number(result.checksum.toFixed(6)),
});

const report = {
    node: process.version,
    platform: process.platform,
    arch: process.arch,
    benchmarks: [format(distanceResult), format(nearestResult)],
};

console.log(JSON.stringify(report, null, 2));
