import { isNodeJs, showError } from './';
import { ERRORS } from '../common/consts';

export const getHaversineEntity = (HaversineGeolocation: any) => {
    const nodeJsEnv = isNodeJs();
    if (nodeJsEnv) showError(ERRORS.WRONG_ENV);
    return nodeJsEnv ? {} : new HaversineGeolocation();
};
