import {createStackNavigator} from '@react-navigation/stack';
import {MapScreen} from '../pages/MapScreen';
import {PermissionsScreen} from '../pages/PermissionsScreen';
import {useContext} from 'react';
import {PermissionsContext} from '../context/PermissionsContext';
import {LoadingScreen} from '../pages/LoadingScreen';
import {CounterScreen} from '../pages/CounterScreen';
import {BlackButton} from '../components/BlackButton';
import {useDispatch} from 'react-redux';
import {decrement, increment} from '../store/counter/counterSlice';
import {LoginScreen} from '../pages/LoginScreen';
import {RegisterScreen} from '../pages/RegisterScreen';

const Stack = createStackNavigator();

export const Navigator = () => {
  const {permissions} = useContext(PermissionsContext);

  if (permissions.locationStatus === 'unavailable') {
    return <LoadingScreen />;
  }

  // const dispatch = useDispatch();

  return (
    <>
      {/* <LoginScreen /> */}
      <RegisterScreen />
      {/* <BlackButton title="Increment" onPress={() => dispatch(increment())} />

      <BlackButton title="Decrement" onPress={() => dispatch(decrement())} /> */}
    </>
    // <Stack.Navigator
    //   screenOptions={{
    //     headerShown: false,
    //     cardStyle: {
    //       backgroundColor: 'white',
    //     },
    //   }}>
    //   {permissions.locationStatus === 'granted' ? (
    //     <Stack.Screen name="MapScreen" component={MapScreen} />
    //   ) : (
    //     <Stack.Screen name="PermissionScreen" component={PermissionsScreen} />
    //   )}
    // </Stack.Navigator>
  );
};
