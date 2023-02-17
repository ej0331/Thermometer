import * as React from 'react';
import { Text, View, Switch } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeScreen from './screens/HomeScreen';
import ChartScreen from './screens/ChartScreen';
import styles from './assets/styles/HistoryChartStyles';
import { darkModeContext } from './context/isDark';
import DarkSwitch from './components/DarkSwitch';
import colorSheet from './assets/styles/color';


const Tab = createBottomTabNavigator();

function Content() {
  return (
    <View>
      <DarkSwitch />
    </View>
  )
}

export default function App() {
  const [isDark, setIsDark] = React.useState(false)
  function toggleIsDark() {
    setIsDark(!isDark)
  }



  return (
    <View style={{ flex: 1, backgroundColor: isDark ? '#181818' : '#f8f8f8' }}>
      <darkModeContext.Provider value={{ isDark, toggleIsDark }}>
        <darkModeContext.Consumer>
          {({ isDark, toggleIsDark }) => {
            const color = colorSheet(isDark)
            return (
              <NavigationContainer >


                <Tab.Navigator sceneContainerStyle={{ backgroundColor: color.backgroundColor }}>
                  <Tab.Screen name="Home" component={HomeScreen} options={{
                    tabBarIcon: ({ focused }) => (
                      <Icon name="home" size={30} color={focused ? color.navigationFocusedColor : color.navigationColor} />
                    ),
                    tabBarStyle: { backgroundColor: color.backgroundColor },
                    headerStyle: { backgroundColor: color.backgroundColor },
                    headerTintColor: color.fontColor
                  }} />

                  <Tab.Screen name="Chart" component={ChartScreen} options={{
                    tabBarIcon: ({ focused }) => (
                      <Icon name="bar-chart" size={30} color={focused ? color.navigationFocusedColor : color.navigationColor} />
                    ),
                    tabBarStyle: { backgroundColor: color.backgroundColor, },
                    headerStyle: { backgroundColor: color.backgroundColor, },
                    headerTintColor: color.fontColor
                  }} />
                </Tab.Navigator>
                <Content />


              </NavigationContainer>
            )
          }}
        </darkModeContext.Consumer>
      </darkModeContext.Provider >
    </View>
  );
}