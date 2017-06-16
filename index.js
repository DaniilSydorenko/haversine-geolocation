"use strict";

class Geolocation {
    // TODO: Distance in miles

    /**
     * Check if geolocation enabled in user browser and users current position coordinates
     *
     * @param success
     * @param error
     */
    isGeolocationAvilable(success, error) {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(success, error)
        }
    };

    /**
     * Get distance between positions by Haversine formula
     *
     * @param args
     * @return {number}
     */
    haversine(...args) {
        let rad = args.map(deg => deg / 180.0 * Math.PI);
        let lat1 = rad[0],
            lon1 = rad[1],
            lat2 = rad[2],
            lon2 = rad[3];
        let R = 6372.8;
        let dLat = lat2 - lat1;
        let dLon = lon2 - lon1;
        let a = Math.sin(dLat / 2) *
            Math.sin(dLat / 2) +
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2) *
            Math.cos(lat1) *
            Math.cos(lat2);
        let c = 2 * Math.asin(Math.sqrt(a));
        return R * c;
    };

    /**
     * Wrapper on Haversine
     *
     * @param currentPosition
     * @param positionToCompare
     * @return {*}
     */
    getDistanceBetween(currentPosition, positionToCompare) {
        if (currentPosition.hasOwnProperty('latitude') &&
            currentPosition.hasOwnProperty('longitude') &&
            positionToCompare.hasOwnProperty('latitude') &&
            positionToCompare.hasOwnProperty('longitude')) {
            return this.haversine(
                currentPosition.latitude,
                currentPosition.longitude,
                positionToCompare.latitude,
                positionToCompare.longitude
            );
        } else {
            throw new Error("Error: Position latitude or longitude is not correct");
        }
    }

    /**
     * Get closest position from array of positions
     *
     * @param currentPosition
     * @param positionsToCompare
     * @return {{}}
     */
    getClosestPosition(currentPosition, positionsToCompare) {
        let distance = null;
        let data = {};

        positionsToCompare.map((position) => {
            let res = this.getDistanceBetween(currentPosition, position);
            if (distance === null || distance > res) {
                distance = res;
                data.id = position.id;
                data.distance = distance;
                data.latitude = position.latitude;
                data.longitude = position.longitude;
            }
        });
        return data;
    };
}

module.exports = new Geolocation();
