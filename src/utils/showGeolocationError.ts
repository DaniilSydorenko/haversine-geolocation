import { showError } from './showError';

export const showGeolocationError = (error: GeolocationPositionError): void => {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            showError(error.message);
            break;
        case error.POSITION_UNAVAILABLE:
            showError(error.message);
            break;
        case error.TIMEOUT:
            showError(error.message);
            break;
    }
}