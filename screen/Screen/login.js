import React, { useState, useEffect } from "react";
import { database } from "../../database/confige";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  StyleSheet,
  ImageBackground,
  Text,
  View,
  ScrollView,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";

export default function Login({ navigation }) {
  // default value is empty
  const [email, emailChange] = useState("");
  const [password, passwordChange] = useState("");
  const [Data, setUsers] = useState([]);

  useEffect(() => {
    database
      .ref("users")
      .once("value")
      .then((item) => {
        var user = [];
        item.forEach((childSnapshot) => {
          user.push(childSnapshot.val());
        });

        setUsers(user); // updating state
        console.log(user);
      });
  }, []);

  const loginUser = () => {
    var count = 0;
    for (let i = 0; i < Data.length; i++) {
      if (email == Data[i].email && password == Data[i].password) {
        count = 1;
        localStorage.setItem("currentUser", JSON.stringify(Data[i]));
      }
    }
    if (count == 1) {
      alert("Login Successfully");
      navigation.replace("Home");
    } else {
      alert("User does not exists");
    }
  };

  const validation = () => {
    let apos = email.indexOf("@");
    let dotpos = email.lastIndexOf(".");
    if (email == "") {
      alert("Please enter email");
      return false;
    } else if (password == "") {
      alert("Please enter password");
      return false;
    } else if (apos < 1 || dotpos - apos < 2) {
      alert("Enter a valid Email address");
      return false;
    } else {
      loginUser();
    }
  };

  return (
    <ImageBackground
      style={styles.container}
      source={{
        uri: "https://www.freecodecamp.org/news/content/images/2021/06/w-qjCHPZbeXCQ-unsplash.jpg",
      }}
    >
      <View>
      <Text style={{fontSize:30, color:"Black", fontWeight:"bold"}}> Welcome to Login Page</Text>
        <ScrollView>
          <Text style={styles.label1}>Email *</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => emailChange(text)}
            placeholder="enter email"
            value={email}
          />
          <Text style={styles.label}>Password *</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => passwordChange(text)}
            secureTextEntry={true}
            placeholder="enter password"
            value={password}
          />
          <TouchableOpacity style={styles.Button}>
            <Button title="Login" color={"green"} onPress={validation} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.Button1}>
            <Button
              title="Registration"
              color={"yellow"}
              onPress={() => navigation.navigate("Registration")}
            />
          </TouchableOpacity>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  input: {
    height: 40,
    borderColor: "black",
    borderWidth: 1,
   
    fontSize: 15,
    width: 250,
  },
  label1: {
    fontSize: 18,
    paddingTop: 20,
 
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 18,
    
    paddingTop: 20,
  },
  Button: {
    paddingTop: 20,
    marginTop: 15,
  },
  Button1: {
    paddingTop: 20,
    marginTop: 15,
  },

  multi: {
    borderColor: "black",
    borderWidth: 1,
    fontSize: 16,
    width: 300,
  },

  // container: {
  //     flex: 1,
  //     backgroundColor: '#009387'
  //   },
  //   header: {
  //       flex: 1,
  //       justifyContent: 'flex-end',
  //       paddingHorizontal: 20,
  //       paddingBottom: 50
  //   },
  //   footer: {
  //       flex: 3,
  //       backgroundColor: '#fff',
  //       borderTopLeftRadius: 30,
  //       borderTopRightRadius: 30,
  //       paddingHorizontal: 20,
  //       paddingVertical: 30
  //   },
  //   text_header: {
  //       color: '#fff',
  //       fontWeight: 'bold',
  //       fontSize: 30
  //   },
  //   text_footer: {
  //       color: '#05375a',
  //       fontSize: 18
  //   },
  //   action: {
  //       flexDirection: 'row',
  //       marginTop: 10,
  //       borderBottomWidth: 1,
  //       borderBottomColor: '#f2f2f2',
  //       paddingBottom: 5
  //   },
  //   actionError: {
  //       flexDirection: 'row',
  //       marginTop: 10,
  //       borderBottomWidth: 1,
  //       borderBottomColor: '#FF0000',
  //       paddingBottom: 5
  //   },
  //   textInput: {
  //       flex: 1,
  //       marginTop: Platform.OS === 'ios' ? 0 : -12,
  //       paddingLeft: 10,
  //       color: '#05375a',
  //   },
  //   errorMsg: {
  //       color: '#FF0000',
  //       fontSize: 14,
  //   },
  //   button: {
  //       alignItems: 'center',
  //       marginTop: 50
  //   },
  //   signIn: {
  //       width: '100%',
  //       height: 50,
  //       justifyContent: 'center',
  //       alignItems: 'center',
  //       borderRadius: 10
  //   },
  //   textSign: {
  //       fontSize: 18,
  //       fontWeight: 'bold'
  //   }
});
