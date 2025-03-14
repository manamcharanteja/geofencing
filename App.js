import React, {useEffect, useState} from 'react';
import Geolocation from 'react-native-geolocation-service';
import useLocationPermission from './src/hooks/useLocationPermission';

import {Alert, AppState, Button, StyleSheet, Text, View} from 'react-native';
import {useCheckUserGeofence} from './src/hooks/useCheckUserGeofence';

const App = () => {
  const {hasPermission, requestPermission} = useLocationPermission();
  const {GeofenceAlert, data} = useCheckUserGeofence();

  const [location, setLocation] = useState(null);

  const getLocation = async () => {
    if (!hasPermission) {
      const permissionGranted = await requestPermission();
      if (!permissionGranted) {
        console.log('Permission denied.');
        return;
      }
    }

    Geolocation.getCurrentPosition(
      position => {
        setLocation(position.coords);
        console.log('Location:', position.coords);
      },
      error => console.error('Error getting location:', error),
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  useEffect(() => {
    getLocation();
  }, [hasPermission]);

  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      console.log(`Previous State: ${appState}`);
      console.log(`Current State: ${nextAppState}`);

      if (appState !== nextAppState) {
        Alert.alert(
          `State Changed`,
          `App moved from ${appState} to ${nextAppState}`,
        );
      }

      setAppState(nextAppState);
    });

    return () => {
      subscription.remove(); // Clean up to prevent memory leaks
    };
  }, [appState]);

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 20, color: 'black', fontWeight: 'bold'}}>
        Current App State: {appState}
      </Text>
      <Text style={{fontSize: 20, color: 'black', fontWeight: 'bold'}}>
        Geofence Location
      </Text>
      <Text style={{fontSize: 16, color: 'black', fontWeight: 'bold'}}>
        Latitude: {location ? `${location.latitude}` : 'Unknown'}
      </Text>
      <Text style={{fontSize: 16, color: 'black', fontWeight: 'bold'}}>
        Longitude: {location ? `${location.longitude}` : 'Unknown'}
      </Text>
      <Button title="Get Location" color={'green'} onPress={getLocation} />
      <GeofenceAlert onOkayClick={() => {}} />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 100,
    rowGap: 15,
  },
});
