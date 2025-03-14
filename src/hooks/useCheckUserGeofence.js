import React, {useEffect, useState} from 'react';
import useGeofence from './useGeofence';
import GeofenceImage from '../assets/geofence.png';
import GeofenceModal from '../components/GeofenceModal';
import {Image, Text} from 'react-native';

export function useCheckUserGeofence() {
  const [showGeofenceAlert, setShowGeofenceAlert] = useState(false);
  const YOUR_LATITUDE = 17.44164115000162;
  const YOUR_LONGITUDE = 78.39561316250183;
  //   const YOUR_LATITUDE = 17.45292922014363;
  //   const YOUR_LONGITUDE = 78.36561799049377;
  const YOUR_RADIUS = 50; // Replace with your office radius in meters
  const data = useGeofence(YOUR_LATITUDE, YOUR_LONGITUDE, YOUR_RADIUS);

  useEffect(() => {
    if (!data?.isEntered === showGeofenceAlert) return;

    console.log(
      '🚀 ~ useEffect ~ data?.isEntered && showGeofenceAlert:',
      !data.isEntered,
    );
    setShowGeofenceAlert(true);
  }, [data?.isEntered]);

  const GeofenceAlert = React.memo(({onOkayClick, ...props}) => (
    <GeofenceModal
      visible={showGeofenceAlert && data?.distance !== undefined}
      buttonText="Okay, Got it"
      buttonClick={() => {
        setShowGeofenceAlert(false);
        onOkayClick();
      }}
      {...props}>
      <Image source={GeofenceImage} style={{width: '100%', height: 140}} />
      <Text
        style={{
          textAlign: 'center',
          paddingVertical: 10,
          fontSize: 16,
          fontWeight: 'bold',
        }}>
        {data?.isEntered
          ? 'You are inside the Store.'
          : `You are ${data?.distance} meters from the Store.`}
      </Text>
    </GeofenceModal>
  ));
  return {GeofenceAlert, data};
}
