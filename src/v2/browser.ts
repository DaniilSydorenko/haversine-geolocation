const getGeolocation = (): Geolocation | undefined => {
    if (typeof navigator === 'undefined') {
        return undefined;
    }

    const geolocation = navigator.geolocation;
    return typeof geolocation?.getCurrentPosition === 'function' ? geolocation : undefined;
};

export const isGeolocationSupported = (): boolean => getGeolocation() !== undefined;

export const getCurrentPosition = (options?: PositionOptions): Promise<GeolocationPosition> =>
    new Promise((resolve, reject) => {
        const geolocation = getGeolocation();

        if (geolocation === undefined) {
            reject(new Error('Geolocation API is not available in this environment'));
            return;
        }

        geolocation.getCurrentPosition(resolve, reject, options);
    });
