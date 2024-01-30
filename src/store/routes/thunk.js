// routeThunks.js
// import NetInfo from '@react-native-community';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setRoute, clearRoute } from './routeSlice';

export const addPositionToRoute = (newPosition) => {
  return async (dispatch, getState) => {
    const isConnected = await NetInfo.fetch().then(state => state.isConnected);

    const { userRoute } = getState().route;

    if (!isConnected) {
      // Sin conexión a Internet. Guardar localmente en AsyncStorage
      const updatedRoute = [...userRoute, newPosition];
      await AsyncStorage.setItem('userRoute', JSON.stringify(updatedRoute));
      console.log('Posición guardada localmente:', newPosition);
    } else {
      // Con conexión a Internet. Actualizar la ruta en el estado y realizar acciones adicionales
      const updatedRoute = [...userRoute, newPosition];
      dispatch(setRoute(updatedRoute));
      console.log('Posición guardada en línea:', newPosition);

      // Puedes sincronizar la ruta con Firebase u otro servicio aquí
      // Ejemplo: await syncRouteWithFirebase(updatedRoute);
    }
  };
};

export const clearUserRoute = () => {
  return async (dispatch) => {
    // Limpiar la ruta en el estado
    dispatch(clearRoute());

    // También puedes realizar la lógica de limpieza local aquí si es necesario (por ejemplo, limpiar AsyncStorage)
    await AsyncStorage.removeItem('userRoute');
  };
};

export const loadRouteFromStorage = () => {
  return async (dispatch) => {
    try {
      const storedRoute = await AsyncStorage.getItem('userRoute');
      if (storedRoute) {
        const parsedRoute = JSON.parse(storedRoute);
        dispatch(setRoute(parsedRoute));
      }
    } catch (error) {
      console.error('Error al cargar la ruta desde AsyncStorage:', error);
    }
  };
};
