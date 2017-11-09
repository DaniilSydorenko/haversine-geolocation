class HaversineGeolocation {

  /**
   * Check if geolocation enabled in user browser and users current position coordinates
   */
  isGeolocationAvailable(cb) {
    if (cb) {
      // Callback interface
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(cb, (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              throw Error("Error: Permission denied");
              break;
            case error.POSITION_UNAVAILABLE:
              throw Error("Error: Position unavailable");
              break;
            case error.TIMEOUT:
              throw Error("Error: Timeout");
              break;
          }
        });
      } else {
        throw Error("Error: Geolocation disabled in your browser");
      }
    } else {
      // Promise interface
      return new Promise((resolve, reject) => {
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition((data) => {
            resolve(data);
          }, (error) => {
            switch (error.code) {
              case error.PERMISSION_DENIED:
                reject(new Error("Error: Permission denied"));
                break;
              case error.POSITION_UNAVAILABLE:
                reject(new Error("Error: Position unavailable"));
                break;
              case error.TIMEOUT:
                reject(new Error("Error: Timeout"));
                break;
            }
          });
        } else {
          reject(new Error("Error: Geolocation disabled in your browser"));
        }
      });
    }
  };

  /**
   * Convert measurements: "km to mi" or "km to m"
   *
   * @param distance
   * @param measurement
   * @returns {*}
   */
  _convertMeasurements(distance, measurement = 'km') {
    let res = null;

    switch (measurement.toLowerCase()) {
      case 'mi' :
        res = (distance * 0.62137).toFixed(1);
        break;
      case 'km' :
        res = distance.toFixed(1);
        break;
      case 'm' :
        res = (distance * 1000).toFixed();
        break;
      default :
        res = distance.toFixed(1);
    }

    return parseInt(res);
  }

  /**
   * Get distance between positions by Haversine formula
   *
   * @param args
   * @return {number}
   */
  _haversine(...args) {
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
   *
   * @param p1
   * @param p2
   * @param measurement
   * @returns {number}
   */
  getDistanceBetween(p1, p2, measurement) {
    if (p1.hasOwnProperty('latitude') && p1.hasOwnProperty('longitude') &&
      p2.hasOwnProperty('latitude') && p2.hasOwnProperty('longitude')) {
      let d = this._haversine(
        p1.latitude,
        p1.longitude,
        p2.latitude,
        p2.longitude
      );

      return this._convertMeasurements(d, measurement)

    } else {
      throw new Error("Error: Position latitude or longitude is not correct");
    }
  }

  /**
   * Get closest position from array of positions
   *
   * @param current
   * @param otherPoints
   * @param measurement
   * @returns {{}}
   */
  getClosestPosition(current, otherPoints, measurement) {
    let distance = null;
    let data = {};

    otherPoints.map((position) => {
      let res = this.getDistanceBetween(current, position, measurement);
      if (distance === null || distance > res) {
        distance = res;
        for (let prop in position) {
          if (position.hasOwnProperty(prop)) {
            data[prop] = position[prop]
          }
        }
        data.haversine = { distance, measurement, accuracy: current.accuracy };
      }
    });
    return data;
  };
}

module.exports = new HaversineGeolocation();
