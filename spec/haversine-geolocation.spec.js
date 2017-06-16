"use strict";

const geolocation = require('../index');

describe("Test for Haversine-Geolocation", () => {

    // TODO test: isGeolocationAvilable, getClosestPosition, important: Current position

    let distance = null,
        distanceBetween = null,
        closestPosition = null;

    beforeEach(() => {
        const positionsToCompare = [
            {
                id: 1,
                latitude: 61.5322204,
                longitude: 28.7515963
            },
            {
                id: 2,
                latitude: 51.9971208,
                longitude: 22.1455439
            },
            {
                id: 3,
                latitude: 45.3571207,
                longitude: 30.3435456
            },
            {
                id: 4,
                latitude: 51.2971208,
                longitude: 22.0455439
            },
            {
                id: 5,
                latitude: 62.0971208,
                longitude: 13.0455439
            },
        ];

        distance = geolocation.haversine(
            positionsToCompare[0].latitude,
            positionsToCompare[0].longitude,
            positionsToCompare[1].latitude,
            positionsToCompare[1].longitude
        );

        distanceBetween = geolocation.getDistanceBetween({
            latitude: positionsToCompare[0].latitude,
            longitude: positionsToCompare[0].longitude,
        },{
            latitude: positionsToCompare[0].latitude,
            longitude: positionsToCompare[0].longitude
        });

        closestPosition = geolocation.getClosestPosition(positionsToCompare[0], positionsToCompare);
    });

    it("haversine: value type number", () => expect(distance).toEqual(jasmine.any(Number)));
    it("getDistanceBetween: value type number", () => expect(distanceBetween).toEqual(jasmine.any(Number)));
    it("closestPosition: value type object", () => expect(closestPosition).toEqual(jasmine.any(Object)));
});
