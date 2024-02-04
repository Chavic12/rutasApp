import {createStackNavigator} from '@react-navigation/stack';
import {useContext} from 'react';
import {PermissionsContext} from '../context/PermissionsContext';
import {LoadingScreen} from '../pages/LoadingScreen';
import {LoginScreen} from '../pages/LoginScreen';
import {RegisterScreen} from '../pages/RegisterScreen';
import { useCheckAuth } from '../hooks/useCheckAuth';
import { MapScreen } from '../pages/MapScreen';
import { PermissionsScreen } from '../pages/PermissionsScreen';

const Stack = createStackNavigator();

export const Navigator = () => {
  const status = useCheckAuth();
  const {permissions} = useContext(PermissionsContext);

  if (permissions.locationStatus === 'unavailable') {
    return <LoadingScreen />;
  }

  console.log(permissions.locationStatus)

  if(status === 'checking'){
    return <LoadingScreen />
  }

  // const dispatch = useDispatch();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}
    >
      {status === 'authenticated' ? (
        permissions.locationStatus === 'granted' ? (
          <Stack.Screen name="MapScreen" component={MapScreen} />
        ) : (
          <Stack.Screen name="PermissionScreen" component={PermissionsScreen} />
        )
      ) : (
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
      )}
      {/* Para la página de registro */}
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
    </Stack.Navigator>
  );
};
