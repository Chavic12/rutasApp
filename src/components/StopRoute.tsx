// StopTrackingFab.tsx

import React from 'react';
import {Fab} from './Fab';
import {useLocation} from '../hooks/useLocation';

export const StopRoute = () => {
  const {stopFollowUserLocation} = useLocation();

  const stopTracking = () => {
    stopFollowUserLocation();
  };

  return (
    <Fab
      iconName="stop-tracking-icon" // Reemplaza con el nombre de tu icono
      onPress={stopTracking}
      style={{
        position: 'absolute',
        bottom: 20,
        right: 20,
      }}
    />
  );
};
