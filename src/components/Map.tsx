import React, {useEffect, useRef, useState} from 'react';
import MapView, {PROVIDER_GOOGLE, Marker, Polyline} from 'react-native-maps';
import {useLocation} from '../hooks/useLocation';
import {LoadingScreen} from '../pages/LoadingScreen';
import {Fab} from './Fab';
import { useAppDispatch } from '../store/store';
import { startLogout } from '../store/auth';
import { StartRoute } from './StartRoute';
import { StopRoute } from './StopRoute';

interface Props {
  markers?: Marker[];
}

export const Map = ({markers}: Props) => {
  const [showPolyline, setShowPolyline] = useState(true);
  const dispatch = useAppDispatch()
  const onLogout = () => {
    dispatch(startLogout())
}

  const {
    hasLocation,
    initialPosition,
    getCurrentLocation,
    followUserLocation,
    userLocation,
    stopFollowUserLocation,
    routeLines,
  } = useLocation();

  const mapViewRef = useRef<MapView>();
  const following = useRef<boolean>(true);

  // Marcador

  useEffect(() => {
    followUserLocation();
    return () => {
      // cleanup
      stopFollowUserLocation();
    };
  }, []);

  useEffect(() => {
    if (!following.current) return;
    const {latitude, longitude} = userLocation;
    mapViewRef.current?.animateCamera({
      center: {
        latitude,
        longitude,
      },
    });
  }, [userLocation]);

  const centerPosition = async () => {
    const {latitude, longitude} = await getCurrentLocation();
    following.current = true;

    mapViewRef.current?.animateCamera({
      center: {
        latitude,
        longitude,
      },
    });
  };

  if (!hasLocation) {
    return <LoadingScreen />;
  }

  return (
    <>
      <MapView
        // provider={PROVIDER_GOOGLE}
        ref={el => (mapViewRef.current = el!)}
        showsUserLocation
        style={{flex: 1}}
        region={{
          latitude: initialPosition.latitude,
          longitude: initialPosition.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        onTouchStart={() => (following.current = false)}>
        {showPolyline && (
          <Polyline
            coordinates={routeLines}
            strokeColor="black"
            strokeWidth={3}
          />
        )}

      </MapView>
      {/* <StartRoute />
      <StopRoute /> */}
      {/* PAra cerrar sesion */}
      <Fab
        iconName="log-out-outline"
        onPress={onLogout}
        style={{
          position: 'absolute',
          bottom: 20,
          left: 20,
        }}
      />
      {/* Icono para detener una ruta */}
      
      
    </>
  );
};
