import Home from './components/Home';
import ImageForm from './components/ImageForm';
import InstagramLogin from './components/InstagramLogin';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { TokenProvider } from './providers/TokenProvider';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <TokenProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={InstagramLogin} />
          <Stack.Screen name="Form" component={ImageForm} />
        </Stack.Navigator>
      </NavigationContainer>
    </TokenProvider>
  );
}
