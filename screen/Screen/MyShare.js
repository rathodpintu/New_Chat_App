// import React, { useState, useEffect } from 'react';
// import { View, StyleSheet, Text, FlatList,TouchableOpacity } from 'react-native';

// export default function Share(){
//     return(
//         <Text>Share Docs</Text>
//     )
// }
import React, { useEffect, useState } from "react";
import {
  View,
  TouchableWithoutFeedback,
  TextInput,
  Button,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import { database } from "../../database/confige.js";
import firebase from "firebase";
import {
  Container,
  Card,
  UserName,
  UserImgWrapper,
  UserImg,
  TextSection,
  UserInfo,
  UserInfoText,
  MessageText,
  PostTime,
} from "../Style/userStyle.js";


export default function Share() {
  // functional component
  const [newsData, setData] = useState([]); // initial value is empty array

  useEffect(() => {
    database.ref("sharedDocument")
      .once("value")
      .then((item) => {
        var user = [];
        item.forEach((childSnapshot) => {
          user.push(childSnapshot.val());
        });
        setData(user); // updating state
        console.log(newsData);
      });
  }, []);

  return (
    <Container style={styles.container}>
      <FlatList
        data={newsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <UserInfo>
            <TextSection>
              <UserInfoText>
                <UserName>{item.filename}</UserName>
                <UserName>shared By-{item.currentUser}</UserName>
                <UserName>{item.time}</UserName>
              </UserInfoText>
            </TextSection>
          </UserInfo>
        )}
      ></FlatList>
    </Container>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "85%",
    padding: 20,
  },
  title: {
    paddingBottom: 10,
    fontWeight: "bold",
  },
});