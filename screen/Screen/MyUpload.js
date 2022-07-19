import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    Button,
    TouchableOpacity,
    FlatList,
    Share,
} from "react-native";
import {
    UserName,
    TextSection,
    UserInfo,
    UserInfoText,
    MessageText,
    
} from "../Style/userStyle.js";

import firebase from "firebase";
import * as DocumentPicker from "expo-document-picker";
import Icon from "react-native-vector-icons/AntDesign";
import { database } from "../../database/confige";

const UploadFile = ({ navigation }) => {
    const [filename, setFileName] = useState("");
    const [fileURI, setFileUri] = useState("");
    const [mimeType, setMimeType] = useState("");
    const [filedetails, setFileDetails] = useState("");
    const [docDetails, setDocDetails] = useState("");
    const pickFile = async () => {
        let result = await DocumentPicker.getDocumentAsync({
            type: "/",
        });
        console.log(result);
        if (!result.cancelled) {
            setFileName(result.name);
            setFileUri(result.uri);
            setMimeType(result.mimeType);
        }
    };
    const currentUser= JSON.parse(localStorage.getItem("currentUser"))
    const storeDoc = () => {
        if (filename=="") {
            alert("Please Select file")
           }
       else {const data = {
            id: Number(new Date()),
            uploadUser: currentUser.name,
            filename: filename,
            fileURI: fileURI,
            mimeType: mimeType,
        };
        database
            .ref("documents")
            .update({ [data.id]: data })
            .then(() => {
                console.log("Inserted");
            })
            .catch((error) => {
                console.log(error);
            });
        getUpload();}
    };

    const onShare = async () => {
        try {
            const result = await Share.share({
                message:
                   "React Native | A framework for building native apps using React",

            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            // alert(error.message);
        }
    };

    const getUpload = () => {
        database
            .ref("documents")
            .once("value")
            .then((item) => {
                var user = [];
                item.forEach((childSnapshot) => {
                    user.push(childSnapshot.val());
                });
                setDocDetails(user); // updating state
            });
        navigation.navigate("Manage Document");
    };
    useEffect(() => {
        getUpload();
    }, []);

    const editDoc=(i)=>{
        console.log(i);
        //navigation.navigate("edit", {id:i})
       navigation.navigate( 'Edit'
          
          );
    }

    const deletedocument = (i) => {
        console.log(i);
        firebase
            .database()
            .ref("/documents/" + i)
            .remove();
        getUpload();
    };

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "gray",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "85%",
                padding: 20,
            }}
        >
            <FlatList
                data={docDetails}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <UserInfo>
                        <TextSection>
                            <UserInfoText>
                                <UserName>{item.filename}</UserName>
                                <Icon name="delete" size={20} color={"red"} onPress={() => deletedocument(item.id)} />
                                <Icon name="edit" size={20} color={"green"} onPress={() => editDoc(item.id)}></Icon>
                                <Icon name="sharealt" size={20} color={"yellow"} onPress={() => onShare()} />
                            </UserInfoText>
                            <MessageText>{item.mimeType}</MessageText>
                        </TextSection>
                    </UserInfo>
                )}
            />
            <View style={ {flexDirection: "row",}}>
                <TouchableOpacity>
                    <Button
                        style={StyleSheet.btn}
                        title="Choose file"
                        onPress={pickFile}
                    />
                </TouchableOpacity>
                <Text>{filename}</Text>
            </View>
            <TouchableOpacity>
                <Button
                    style={StyleSheet.btn2}
                    title="Click to Upload"
                    onPress={storeDoc}
                />
            </TouchableOpacity>
        </View>
    );
};
export default UploadFile;
const style = StyleSheet.create({
    btn: {
        flex: 1,
        marginTop: 15,
    },
    btncontainer: {
       
    },
    btn2: {
        flex: 1,
        marginTop: 15,
    },
});


