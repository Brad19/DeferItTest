/**
 */

import * as React from 'react';
import { ReactElement } from 'react';
import { MenuProvider } from 'react-native-popup-menu';
import { NavigationContainer } from '@react-navigation/native';

import NavStack from './navigation/NavStack';

const App = (): ReactElement => {
  return (
    <MenuProvider>
      <NavigationContainer>
        <NavStack />
      </NavigationContainer>
    </MenuProvider>
  );
};

export default App;
