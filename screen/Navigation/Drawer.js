
import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import GroupChat from '../Screen/GroupChat';
import ManageUser from '../Screen/ManageUser';
import MyTabs from '../Screen/ManageDocument';
import Dashboard from '../Screen/Dashboard';
import CustomDrawer from './CostumNavigation';

import Ionicons from 'react-native-vector-icons/Ionicons';

import ProfileDetails from '../Screen/Profile';

const Drawer = createDrawerNavigator(); 


export default function MyDrawer() {
  return (
    <Drawer.Navigator useLegacyImplementation drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen name="Dashboard" component={Dashboard} options={{
        drawerIcon: ({ color }) => (
          <Ionicons name="home-outline" size={22} color={color} />
        ),
      }} />
      <Drawer.Screen name="Profile" component={ProfileDetails} options={{
        drawerIcon: ({ color }) => (
          <Ionicons name="person-circle-outline" size={22} color={color} />
        ),
      }} />
      <Drawer.Screen name="GroupChat" component={GroupChat} options={{
        drawerIcon: ({ color }) => (
          <Ionicons name="chatbubbles-outline" size={22} color={color} />
        ),
      }} />
      <Drawer.Screen name="Manage Document" component={MyTabs} options={{
        drawerIcon: ({ color }) => (
          <Ionicons name="documents-outline" size={22} color={color} />
        ),
      }} />
      <Drawer.Screen name="Manage User" component={ManageUser} options={{
        drawerIcon: ({ color }) => (
          <Ionicons name="people-outline" size={22} color={color} />
        ),
      }} />
     
    </Drawer.Navigator>
  );
}

