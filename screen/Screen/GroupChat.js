// import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Entypo";
import { database } from "../../database/confige";
import {
  Container,
  UserInfo,
  UserImgWrapper,
  UserImg,
  UserInfoText,
  UserName,
  MessageText,
  TextSection,
  PostTime,
} from "../Style/userStyle.js";

export default function GroupChat() {
  const [message, setMssg] = useState("");
  const [errMsg, setErrMsg] = useState();
  const [Messages, setData] = useState([]);
  const [currentUser, SetCurrentUser] = useState(null);
  useEffect(() => {
    SetCurrentUser(JSON.parse(localStorage.getItem("currentUser").toString()));
    getsUser();
  }, []); // effect will run only once
  console.log(currentUser);
  const getsUser = () => {
    database
      .ref("chatList")
      .once("value")
      .then((item) => {
        let users = [];
        console.log(item.val());
        item.forEach((childSnapshot) => {
          users.push(childSnapshot.val());
        });
        console.log(users);
        setData(users); // updating state
      });
  };
  const storyItem = ({ item }) => {
    return (
      <UserInfo>
        <UserImgWrapper>
          <UserImg source={{ uri: item.image }} />
        </UserImgWrapper>
        <TextSection>
          <UserInfoText>
            <UserName>{item.userName}</UserName>
            <MessageText>{item.time}</MessageText>
          </UserInfoText>
          <MessageText>{item.message}</MessageText>
        </TextSection>
      </UserInfo>
    );
  };

  postMessage = () => {
    let today = new Date();
    // let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let time = today.getHours() + ":" + today.getMinutes();
    if (!message) {
      setErrMsg("Message can't be empty");
    } else {
      const data = {
        id: Number(new Date()),
        time: time,
        userName: currentUser.name,
        message: message,
        image: currentUser.image,
      };
      database
        .ref("chatList")
        .update({ [data.id]: data })
        .then(() => {
          console.log("Inserted");
        })
        .catch((error) => {
          console.log(error);
        });
      getsUser();
    }
  };

  return (
    <Container style={styles.container}>
      <Text>{errMsg}</Text>
      <Container>
        <FlatList
          data={Messages}
          keyExtractor={(item) => item.id}
          renderItem={storyItem}
        ></FlatList>
      </Container>
      <Container style={styles.buttons}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setMssg(text)}
          value={message}
          placeholder="Type here"
        />
        <Icon name="direction" onPress={() => postMessage()} size={30}></Icon>
      </Container>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    height: 80,
  },
  buttons: {
    flex: 1,
    justifyContent: "space-around",
    flexDirection: "row",
    marginTop: "90%",
    height: 80,
    //marginBottom: '0',
    width: "100%",
    position: "fixed",
    bottom: 0,
    backgroundColor: "lightblue",
  },
  input: {
    borderColor: "black",
    borderWidth: 1,
    fontSize: 20,
    height: 30,
  },
});
