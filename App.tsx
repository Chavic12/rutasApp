import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Navigator} from './src/navigator/Navigator';
import {PermissionsProvider} from './src/context/PermissionsContext';
import {Provider} from 'react-redux';
import {store} from './src/store';

const AppState = ({children}: any) => {
  return <PermissionsProvider>{children}</PermissionsProvider>;
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppState>
          <Navigator />
        </AppState>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
