import {
    getCurrentPosition,
    isGeolocationSupported,
} from '../src/v2/browser';

describe('V2 browser geolocation adapter', () => {
    it('detects the browser Geolocation API at call time', () => {
        expect(isGeolocationSupported()).toBe(
            typeof navigator !== 'undefined' &&
            navigator.geolocation !== undefined,
        );
    });

    it('resolves with the native GeolocationPosition', (done) => {
        const position = {
            coords: {
                accuracy: 5,
                altitude: null,
                altitudeAccuracy: null,
                heading: null,
                latitude: 52.2297,
                longitude: 21.0122,
                speed: null,
            },
            timestamp: 123456789,
        } as GeolocationPosition;

        spyOn(
            navigator.geolocation,
            'getCurrentPosition',
        ).and.callFake((success) => {
            success(position);
        });

        getCurrentPosition({ enableHighAccuracy: true })
            .then((result) => {
                expect(result).toBe(position);
                done();
            })
            .catch(done.fail);
    });

    it('rejects with the native geolocation error', (done) => {
        const error = {
            code: 1,
            message: 'Permission denied',
            PERMISSION_DENIED: 1,
            POSITION_UNAVAILABLE: 2,
            TIMEOUT: 3,
        } as GeolocationPositionError;

        spyOn(
            navigator.geolocation,
            'getCurrentPosition',
        ).and.callFake((_success, failure) => {
            if (failure) {
                failure(error);
            }
        });

        getCurrentPosition()
            .then(() => done.fail('Expected geolocation to reject'))
            .catch((result) => {
                expect(result).toBe(error);
                done();
            });
    });
});
