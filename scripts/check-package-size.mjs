import { execFileSync } from 'node:child_process';

const KIB = 1024;
const MAX_PACKED_BYTES = 32 * KIB;
const MAX_UNPACKED_BYTES = 96 * KIB;

const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';

const output = execFileSync(
    npm,
    ['pack', '--dry-run', '--json'],
    {
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'inherit'],
    },
);

const report = JSON.parse(output)[0];

if (
    !report ||
    !Number.isFinite(report.size) ||
    !Number.isFinite(report.unpackedSize)
) {
    throw new Error('npm pack did not return valid size metadata');
}

const formatKiB = (bytes) => (bytes / KIB).toFixed(2);

console.log(
    `Package size: ${formatKiB(report.size)} KiB packed / ` +
    `${formatKiB(report.unpackedSize)} KiB unpacked ` +
    `(${report.files.length} files)`,
);

console.log(
    `Budget: ${formatKiB(MAX_PACKED_BYTES)} KiB packed / ` +
    `${formatKiB(MAX_UNPACKED_BYTES)} KiB unpacked`,
);

if (report.size > MAX_PACKED_BYTES) {
    throw new Error(
        `Packed package exceeds budget: ${formatKiB(report.size)} KiB > ` +
        `${formatKiB(MAX_PACKED_BYTES)} KiB`,
    );
}

if (report.unpackedSize > MAX_UNPACKED_BYTES) {
    throw new Error(
        `Unpacked package exceeds budget: ${formatKiB(report.unpackedSize)} KiB > ` +
        `${formatKiB(MAX_UNPACKED_BYTES)} KiB`,
    );
}
