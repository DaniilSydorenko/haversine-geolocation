Geolocation
========

[![NPM](https://nodei.co/npm/haversine-geolocation.png)](https://nodei.co/npm/haversine-geolocation/)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![Travis CI](https://travis-ci.org/DaniilSydorenko/haversine-geolocation.svg?branch=master)](https://travis-ci.org/DaniilSydorenko/haversine-geolocation)

- [Introduction](#introduction)
    - [Haversine Formula](#Formula)
    - [Pseudocode](#pseudocode)
- [Installation](#installation)
    - [Download](#download)
    - [via NPM](#NPM)
- [Basic usage](#basic-usage)
- [License](#license)

## Introduction
If you want to calculate the distance between two points or you want to get closest position to current point let me introduce haversine-geolocation module. It based on the Haversine Formula:

<img width="439" alt="haversine" src="https://user-images.githubusercontent.com/2789198/27240436-e9a459da-52d4-11e7-8f84-f96d0b312859.png">

### Formula:
![haversine_2](https://user-images.githubusercontent.com/2789198/27240432-e67a0cf0-52d4-11e7-9acb-b935e1a84f47.png)

### Pseudocode:

```code()
dlon = lon2 - lon1 
dlat = lat2 - lat1 
a = (sin(dlat/2))^2 + cos(lat1) * cos(lat2) * (sin(dlon/2))^2 
c = 2 * atan2( sqrt(a), sqrt(1-a) ) 
d = R * c (where R is the radius of the Earth)

R = 6367 km OR 3956 mi
```
## Installation

### Download
```bash
git clone https://github.com/DaniilSydorenko/haversine-geolocation.git
```
### NPM
```bash
npm i haversine-geolocation -S
```
## Basic usage

### Is geolocation enabled

``` javascript
const geolocation = require('haversine-geolocation');
const onSuccess = (data) => {   
    // Get users current position
    console.log(data.coords.latitude, data.coords.longitude);
};
const onError = (error) => {
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
};

Geolocation.isGeolocationAvilable(onSuccess, onError);
```

### Calculate distance between two points

``` javascript
const geolocation = require('haversine-geolocation');
const positionsToCompare = [
    {
        latitude: 61.5322204,
        longitude: 28.7515963
    },
    {
        latitude: 51.9971208,
        longitude: 22.1455439
    }
];

let distance = Geolocation.getDistanceBetween(positionsToCompare[0], positionsToCompare[1]);
console.log(distance); // 1133.0627006180137
```

### Calculate the closest position to user

``` javascript
const geolocation = require('haversine-geolocation');
const positionsToCompare = [
    {
        id: 1,
        title: 'Point 1',
        latitude: 61.5322204,
        longitude: 28.7515963
    },
    {
        id: 2,
        title: 'Point 2',
        latitude: 51.9971208,
        longitude: 22.1455439
    },
    {
        id: 3,
        title: 'Point 3',
        latitude: 45.3571207,
        longitude: 30.3435456
    }
];
const onSuccess = (data) => {
    let closetsPosition = Geolocation.getClosestPosition ({
            latitude: data.coords.latitude,
            longitude: data.coords.longitude
        },
        positionsToCompare
    );

    console.log(closetsPosition);
};
const onError = (error) => {
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
};

Geolocation.isGeolocationAvilable(onSuccess, onError);
```

License
-------

The MIT License (MIT)

Copyright (c) 2017 Daniil Sydorenko

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial
portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
DEALINGS IN THE SOFTWARE.
