import * as React from 'react';
import { Text, View, Switch, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeScreen from './screens/HomeScreen';
import ChartScreen from './screens/ChartScreen';
import styles from './assets/styles/HistoryChartStyles';
import { darkModeContext } from './context/isDark';
import DarkSwitch from './components/DarkSwitch';
import colorSheet from './assets/styles/color';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

function Content() {
  return (
    <View style={{ marginRight: 20 }}>
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
                <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
                <Tab.Navigator sceneContainerStyle={{ backgroundColor: color.backgroundColor }}>
                  <Tab.Screen name="Home" component={HomeScreen} options={{
                    tabBarIcon: ({ focused }) => (
                      <Icon name="home" size={30} color={focused ? color.navigationFocusedColor : color.navigationColor} />
                    ),
                    tabBarStyle: { backgroundColor: color.backgroundColor },
                    headerStyle: { backgroundColor: color.backgroundColor },
                    headerTintColor: color.fontColor,
                    headerRight: (props) => (
                      <Content />
                    )
                  }} />

                  <Tab.Screen name="Chart" component={ChartScreen} options={{
                    tabBarIcon: ({ focused }) => (
                      <Icon name="bar-chart" size={30} color={focused ? color.navigationFocusedColor : color.navigationColor} />
                    ),
                    tabBarStyle: { backgroundColor: color.backgroundColor, },
                    headerStyle: { backgroundColor: color.backgroundColor, },
                    headerTintColor: color.fontColor,
                    headerRight: (props) => (
                      <Content />
                    )
                  }} />
                </Tab.Navigator>
              </NavigationContainer>
            )
          }}
        </darkModeContext.Consumer>
      </darkModeContext.Provider >
    </View>
  );
}