import { isNodeJs, showError } from './';
import { ERRORS } from '../common/consts';

export const getHaversineEntity = <T>(
    HaversineGeolocation: new () => T,
): T | Record<string, never> => {
    const nodeJsEnv = isNodeJs();
    if (nodeJsEnv) showError(ERRORS.WRONG_ENV);
    return nodeJsEnv ? {} : new HaversineGeolocation();
};
