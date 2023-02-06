import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeScreen from './components/screens/HomeScreen';
import ChartScreen from './components/screens/ChartScreen';
import styles from './components/styles/ShareStyles';

const Tab = createBottomTabNavigator();
const originColor = "#ced4da"
const focusedColor = "#495057"

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} options={{
              tabBarIcon: ({ focused }) => (
                  <Icon name="home" size={30} color={focused ? focusedColor : originColor} />
              )
          }}/>
        <Tab.Screen name="Chart" component={ChartScreen} options={{
              tabBarIcon: ({ focused }) => (
                  <Icon name="bar-chart" size={30} color={focused ? focusedColor : originColor} />
              )
          }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}