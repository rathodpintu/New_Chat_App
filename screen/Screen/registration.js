import React, { useState, useEffect } from "react";
import { database } from "../../database/confige";
import {
  StyleSheet,
  ImageBackground,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function Registration({ navigation }) {
  const [name, nameChange] = useState("");
  const [email, emailChange] = useState("");
  const [password, passwordChange] = useState("");
  const [phone, phoneChange] = useState("");
  const [confirmPassword, confirmPasswordChange] = useState("");
  const [Data, setUsers] = useState([]);
  const [image, setImage] = useState("");
  const [isRegistrationsSuccess, setIsRegistrationSuccess] = useState(false);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      borderRadius: 8,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
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

  if (isRegistrationsSuccess) {
    return (
      <View
        style={{
          backgroundColor: "blue",
          flexDirection: "column",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <Image
          source={{
            uri: "https://www.pngitem.com/pimgs/m/277-2778613_success-icon-png-transparent-png.png",
          }}
          style={{
            height: 150,
            resizeMode: "contain",
            alignSelf: "center",
            width: "100%",
          }}
        />
        <Text style={styles.successTextStyle}>Registration Successful</Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.buttonTextStyle}>Login Now</Text>
        </TouchableOpacity>
      </View>
    );
  }
  const verification = () => {
    var count = 0;
    var flex = 0;
    for (let i = 0; i < Data.length; i++) {
      if (email == Data[i].email) count = 1;
    }
    if (count == 1) {
      alert("user already exist");
    } else {
      signup();
      flex = 1;
      if (flex == 1) {
        setIsRegistrationSuccess(true);
      }
    }
  };

  const validation = () => {
    let apos = email.indexOf("@");
    let dotpos = email.lastIndexOf(".");
    if (name == "") {
      alert("Please enter username");
      return false;
    } else if (email == "") {
      alert("Please enter email");
      return false;
    } else if (password == "") {
      alert("Please enter password");
      return false;
    } else if (confirmPassword == "") {
      alert("Please enter Confirm password");
      return false;
    } else if (password != confirmPassword) {
      alert("Passwords must be same");
      return false;
    } else if (apos < 1 || dotpos - apos < 2) {
      alert("Enter a valid Email address");
      return false;
    } else {
      // signup();
      // alert("You are sucessfully registered")
      // navigation.navigate("Login");
      verification();
    }
  };
  const signup = () => {
    const data = {
      id: Number(new Date()),
      name: name,
      email: email,
      image: image,
      mobile_number: phone,
      password: password,
      confirmPassword: confirmPassword,
    };
    database
      .ref("users")
      .update({ [data.id]: data })
      .then(() => {
        console.log("Inserted");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <ImageBackground
    style={styles.container}
    source={{
      uri: "https://www.freecodecamp.org/news/content/images/2021/06/w-qjCHPZbeXCQ-unsplash.jpg",
    }}
  >
    <View style={styles.container}>
    <Text style={{fontSize:30, color:"Black", fontWeight:"bold"}}> New Registration Page</Text>
    <Image style={{ width: "150px", height: "150px", }} source={{uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb9NKmmD0eYA9pllYDb3_Ja6MDk5ldhg3Uiw&usqp=CAU"}}></Image>
      <ScrollView>
        <Text style={styles.label}>Name *</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => nameChange(text)}
          placeholder="enter name"
          value={name}
        />

        <Text style={styles.label}>Email *</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => emailChange(text)}
          placeholder="enter email"
          value={email}
        />

        <Text style={styles.label}>Phone </Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => phoneChange(text)}
          placeholder="enter Phone number"
          value={phone}
        />

        <Text style={styles.label}>Password *</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => passwordChange(text)}
          secureTextEntry={true}
          placeholder="enter password"
          value={password}
        />

        <Text style={styles.label}>Confirm Password *</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => confirmPasswordChange(text)}
          secureTextEntry={true}
          placeholder="enter confirm Password"
          value={confirmPassword}
        />
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", marginTop:20 }}>
          <Button title="Upload image" onPress={pickImage} />
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200 }}
            />
          )}
        </View>

        {/* <TouchableOpacity style={styles.Button} onPress={validation}>
          <Text style={styles.B}>Login</Text>
        </TouchableOpacity> */}

        <TouchableOpacity style={styles.Button}>
            <Button title="Registration" color={"green"} onPress={validation} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.Button1}>
            <Button
              title="Login"
              color={"yellow"}
              onPress={() => navigation.navigate("Login")}
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

     //backgroundColor: "#009387",
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
  label: {
    fontSize: 18,
    paddingTop: 20,
  },
  successTextStyle: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    padding: 30,
  },
  buttonStyle: {
    backgroundColor: "#7DE24E",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#7DE24E",
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 10,
    fontSize: 16,
  },
 
  Button: {
    paddingTop: 20,
    marginTop: 15,
  },
  Button1: {
    paddingTop: 20,
    marginTop: 15,
    marginBottom:20
  },
});
