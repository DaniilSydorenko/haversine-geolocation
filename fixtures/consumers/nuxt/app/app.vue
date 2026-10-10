<script setup lang="ts">
import { distance } from 'haversine-geolocation';
import { isGeolocationSupported } from 'haversine-geolocation/browser';

const kilometres = distance(
  { latitude: 52.2296756, longitude: 21.0122287 },
  { latitude: 59.9138688, longitude: 10.7522454 },
);

const geolocationSupported = import.meta.client
  ? isGeolocationSupported()
  : false;
</script>

<template>
  <main>
    Warsaw → Oslo: {{ kilometres.toFixed(2) }} km;
    geolocation supported: {{ geolocationSupported }}
  </main>
</template>
