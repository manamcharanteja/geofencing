import {useState} from 'react';
import Geolocation from 'react-native-geolocation-service';
import useAsyncEffect from './useAsyncEffect';

const useGeofence = (centerLatitude, centerLongitude, radius) => {
  const [location, setLocation] = useState(null);
  const [isEntered, setEntered] = useState(false);
  const [info, setInfo] = useState({});

  useAsyncEffect(async () => {
    getCurrentLocation();

    watchId = Geolocation.watchPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setLocation({latitude, longitude});
        checkIfWithinFence(latitude, longitude);
      },
      error => {
        console.log('watchPosition', error);
      },
      {enableHighAccuracy: true, distanceFilter: 10, interval: 10000},
    );

    return () => {
      Geolocation.clearWatch(watchId);
    };
  }, []);

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setLocation({latitude, longitude});
        checkIfWithinFence(latitude, longitude);
      },
      error => {
        console.log('🚀 ~ getCurrentLocation ~ error:', error);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const checkIfWithinFence = (latitude, longitude) => {
    const distance = getDistanceFromLatLonInMeters(
      latitude,
      longitude,
      centerLatitude,
      centerLongitude,
    );

    console.log('distance <= radius', distance, radius);
    setInfo({distance: Math.round(distance), latitude, longitude});
    setEntered(distance <= radius);
  };

  const getDistanceFromLatLonInMeters = (lat1, lon1, lat2, lon2) => {
    const R = 6371000; // Radius of the Earth in meters
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in meters
    return distance;
  };

  const deg2rad = deg => deg * (Math.PI / 180);

  return {location, isEntered, radius, ...info};
};

export default useGeofence;
