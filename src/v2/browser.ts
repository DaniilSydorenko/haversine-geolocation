const getGeolocation = (): Geolocation | undefined => {
    if (typeof navigator === 'undefined') {
        return undefined;
    }

    return navigator.geolocation;
};

export const isGeolocationSupported = (): boolean =>
    getGeolocation() !== undefined;

export const getCurrentPosition = (
    options?: PositionOptions,
): Promise<GeolocationPosition> =>
    new Promise((resolve, reject) => {
        const geolocation = getGeolocation();

        if (geolocation === undefined) {
            reject(new Error('Geolocation API is not available in this environment'));
            return;
        }

        geolocation.getCurrentPosition(
            resolve,
            reject,
            options,
        );
    });
