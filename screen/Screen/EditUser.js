import React,{useState} from "react";
import { View, Text, TextInput, Button } from "react-native";

export default function EditUser(route){
    const [newUserName, setNewUserName] = useState("");
    // const {id}=route.params;
//    console.log(id)

//    console.log(id)
    return(
        <View>
            <Text>welcome to edit page</Text>
            <TextInput placeholder="enter new username"
                  onChangeText={(text) => setNewUserName(text)}
                  value={newUserName} />
            <Button title="edit" />
        </View>
    )
}