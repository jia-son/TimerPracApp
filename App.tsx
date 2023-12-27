import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from './lib/screens/HomeScreen';
import {Text, TouchableOpacity, View} from 'react-native';
import {TodoScreen} from './lib/screens/TodoScreen';
import {BottomMenuBar} from './lib/screens/BottomMenuBar';
import {TimerChart} from './lib/screens/TimerChart';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Todo"
          component={TodoScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator> */}
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: ({current, layouts}) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
          gestureEnabled: true,
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Todo" component={TodoScreen} />
        <Stack.Screen name="BottomMenuBar" component={BottomMenuBar} />
        <Stack.Screen name="TimerChart" component={TimerChart} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
