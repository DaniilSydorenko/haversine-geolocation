export const calculateHaversine = (...args: number[]): number => {
    const rad: number[] = args.map((deg: number) => deg / 180.0 * Math.PI);
    const lat1: number = rad[0];
    const lon1: number = rad[1];
    const lat2: number = rad[2];
    const lon2: number = rad[3];
    const R: number = 6372.8;
    const dLat: number = lat2 - lat1;
    const dLon: number = lon2 - lon1;

    const a: number = Math.sin(dLat / 2) *
        Math.sin(dLat / 2) +
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2) *
        Math.cos(lat1) *
        Math.cos(lat2);

    const c: number = 2 * Math.asin(Math.sqrt(a));

    return R * c;
};
