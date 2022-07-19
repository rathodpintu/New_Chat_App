
import 'react-native-gesture-handler'

import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { navigationRef } from './screen/Navigation/RootNavigation';
import { createStackNavigator } from '@react-navigation/stack'
import MyStack from './screen/Navigation/StackNavigate';

const Stack = createStackNavigator()

export default function App() {
  return (
    
    <NavigationContainer ref={navigationRef}>
       <MyStack/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
