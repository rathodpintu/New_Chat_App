import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBTF-Y4okyxJpWOO-ZAmqLDdWV8RmEPQCQ",
  authDomain: "chat-app-b673c.firebaseapp.com",
  databaseURL: "https://chat-app-b673c-default-rtdb.firebaseio.com",
  projectId: "chat-app-b673c",
  storageBucket: "chat-app-b673c.appspot.com",
  messagingSenderId: "61116231177",
  appId: "1:61116231177:web:cfa18b21fd9743cdce92d8",
  measurementId: "G-EG13TS4PYF"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

export { database };
