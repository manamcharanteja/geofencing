import {useState} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';

const useLocationPermission = () => {
  const [hasPermission, setHasPermission] = useState(false);

  const requestPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        setHasPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
      } catch (err) {
        console.warn(err);
        setHasPermission(false);
      }
    } else {
      setHasPermission(true); // iOS handles permissions differently
    }
  };

  return {hasPermission, requestPermission}; // Return function explicitly
};

export default useLocationPermission;
