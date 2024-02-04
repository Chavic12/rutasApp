import React from 'react';
import {Fab} from './Fab';
import {useLocation} from '../hooks/useLocation';

export const StartRoute = () => {
  const {followUserLocation} = useLocation();

  const startTracking = () => {
    followUserLocation();
  };

  return (
    <Fab
      iconName="log-out-outline" // Reemplaza con el nombre de tu icono
      onPress={startTracking}
      style={{
        position: 'absolute',
        bottom: 20,
        right: 20,
      }}
    />
  );
};
