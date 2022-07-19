import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View, TouchableOpacity } from "react-native";
import firebase from "firebase";
import Icon from "react-native-vector-icons/AntDesign";

import {
  Container,
  Card,
  UserName,
  UserImgWrapper,
  UserImg,
  TextSection,
  UserInfo,
  UserInfoText,
} from "../Style/userStyle.js";
import { database } from "../../database/confige";
export default function ManageUser(props) {
  // functional component
  const [newsData, setData] = useState([]); // initial value is empty array
  useEffect(() => {
    getsUser();
  }, []);
  const getsUser = () => {
    database
      .ref("users")
      .once("value")
      .then((item) => {
        var user = [];
        item.forEach((childSnapshot) => {
          user.push(childSnapshot.val());
        });
        setData(user); // updating state
      });
  };

  const editUser=(i)=>{
    console.log(i)
    props.navigation.navigate("Edit", {id:i});
  }
  const deleteUser = (i) => {
    console.log(i);
    firebase
      .database()
      .ref("/users/" + i)
      .remove();
    getsUser();
  };

  return (
    <Container style={styles.container}>
      <FlatList
        data={newsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card backgroundColor={"gray"}
            // onPress={() => {
            //   navigation.navigate("edit");
            // }}
          >
            <UserInfo>
              <UserImgWrapper>
                <UserImg source={{ uri: item.image }} />
              </UserImgWrapper>
              <TextSection>
                <UserInfoText>
                  <UserName>{item.name}</UserName>
                    <View style={styles.icon}>
                      <Icon
                        name="delete"
                        color={"red"}
                        style={{marginRight:10}}
                        size={15}
                        onPress={() => deleteUser(item.id)}
                      ></Icon>
                      <Icon name="edit" style={{marginLeft:15}} color={"yellow"} size={20} onPress={() => editUser(item.id)}></Icon>
                    
                    </View>
                    
                </UserInfoText>
              </TextSection>
            </UserInfo>
          </Card>
        )}
      ></FlatList>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "gray",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "85%",
    padding: 20,
  },
  icon:{
    flexDirection:"row",
    justifyContent:"space-between"
  },
  title: {
    paddingBottom: 10,
    fontWeight: "bold",
  },
});
