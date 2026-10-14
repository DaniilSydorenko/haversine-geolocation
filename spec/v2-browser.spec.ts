import { afterEach, describe, expect, it, vi } from 'vitest';

import { getCurrentPosition, isGeolocationSupported } from '../src/v2/browser';

describe('V2 browser geolocation adapter', () => {
    afterEach(() => {
        vi.unstubAllGlobals();
        vi.restoreAllMocks();
    });

    it('detects the browser Geolocation API at call time', () => {
        vi.stubGlobal('navigator', {
            geolocation: {
                getCurrentPosition: vi.fn(),
            },
        });

        expect(isGeolocationSupported()).toBe(true);
    });

    it('returns false when navigator is unavailable', () => {
        vi.stubGlobal('navigator', undefined);

        expect(isGeolocationSupported()).toBe(false);
    });

    it('returns false when navigator has no geolocation API', () => {
        vi.stubGlobal('navigator', {});

        expect(isGeolocationSupported()).toBe(false);
    });

    it('treats a null or incomplete geolocation provider as unsupported', async () => {
        vi.stubGlobal('navigator', { geolocation: null });
        expect(isGeolocationSupported()).toBe(false);
        await expect(getCurrentPosition()).rejects.toThrow(
            'Geolocation API is not available in this environment',
        );

        vi.stubGlobal('navigator', { geolocation: {} });
        expect(isGeolocationSupported()).toBe(false);
        await expect(getCurrentPosition()).rejects.toThrow(
            'Geolocation API is not available in this environment',
        );
    });

    it('resolves with the native GeolocationPosition', async () => {
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

        const nativeGetCurrentPosition = vi.fn((success: PositionCallback) => {
            success(position);
        });

        vi.stubGlobal('navigator', {
            geolocation: {
                getCurrentPosition: nativeGetCurrentPosition,
            },
        });

        await expect(getCurrentPosition({ enableHighAccuracy: true })).resolves.toBe(position);

        expect(nativeGetCurrentPosition).toHaveBeenCalledTimes(1);
        expect(nativeGetCurrentPosition.mock.calls[0][2]).toEqual({
            enableHighAccuracy: true,
        });
    });

    it('rejects with the native geolocation error', async () => {
        const error = {
            code: 1,
            message: 'Permission denied',
            PERMISSION_DENIED: 1,
            POSITION_UNAVAILABLE: 2,
            TIMEOUT: 3,
        } as GeolocationPositionError;

        const nativeGetCurrentPosition = vi.fn(
            (_success: PositionCallback, failure?: PositionErrorCallback | null) => {
                failure?.(error);
            },
        );

        vi.stubGlobal('navigator', {
            geolocation: {
                getCurrentPosition: nativeGetCurrentPosition,
            },
        });

        await expect(getCurrentPosition()).rejects.toBe(error);
    });

    it('rejects clearly when geolocation is unavailable', async () => {
        vi.stubGlobal('navigator', undefined);

        await expect(getCurrentPosition()).rejects.toThrow(
            'Geolocation API is not available in this environment',
        );
    });
});
