export const showError = (errorMessage: string): void => {
    console.error('\x1b[31m%s\x1b[0m', '[HAVERSINE-GEOLOCATION]:', `${errorMessage}`);
};
