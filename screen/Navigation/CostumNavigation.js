import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from '@react-navigation/drawer';

import Ionicons from 'react-native-vector-icons/Ionicons';
//import { navigationRef } from '../../RootNavigation';


const CustomDrawer = (props, navigation) => {

  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  console.log(currentUser)
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: '#8200d6' }}>
        <ImageBackground
          source={{ uri: "https://cdn.wallpapersafari.com/76/81/sjP3HI.png" }}
          style={{ padding: 20 }}>
          <TouchableOpacity onPress={() => { navigation.navigate('Home', { screen: 'Profile' }); }}>
            <Image
              source={{ uri: currentUser.image }}
              style={{ height: 80, width: 80, borderRadius: 40, marginBottom: 10 }}
            />
          </TouchableOpacity>

          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              fontFamily: 'Roboto-Medium',
              marginBottom: 5,
            }}>
            {currentUser.name}
          </Text>

        </ImageBackground>
        <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#ccc' }}>

        <TouchableOpacity onPress={() => { localStorage.removeItem('currentUser'); }} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="exit-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Roboto-Medium',
                marginLeft: 5,
              }}>
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;