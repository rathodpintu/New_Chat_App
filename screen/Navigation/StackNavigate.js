import 'react-native-gesture-handler'
import Login from "../Screen/login";
import Registration from "../Screen/registration";
import 'react-native-gesture-handler'
import EditUser from "../Screen/EditUser";
import { createStackNavigator } from '@react-navigation/stack'
import SplashScreen from "../Screen/welcome";
import Dashboard from "../Screen/Dashboard";
import ProfileDetails from "../Screen/Profile";
import GroupChat from "../Screen/GroupChat";
import MyTabs from "../Screen/ManageDocument";
import UploadFile from "../Screen/MyUpload";
import Share from "../Screen/MyShare";
import ManageUser from "../Screen/ManageUser";
import MyDrawer from "../Navigation/Drawer";
// import CustomDrawer from "./Component/CostumNavigation";

const Stack = createStackNavigator()
export default function MyStack(props){
    return(
        <Stack.Navigator >
            <Stack.Screen name='Welcome' component={SplashScreen}/>
            <Stack.Screen name='Login' component={Login}/>
            <Stack.Screen name='Edit' component={EditUser}/>
            <Stack.Screen name='Registration' component={Registration}/> 
            <Stack.Screen name='Home' component={MyDrawer} options={{ headerShown: false}}/>
            <Stack.Screen name='Dashboard' component={Dashboard}/>
            <Stack.Screen name='Profile' component={ProfileDetails}/>
            <Stack.Screen name='GroupChat' component={GroupChat}/>
            <Stack.Screen name='Manage Document' component={MyTabs}/>
            <Stack.Screen name='My Uploads' component={UploadFile}/>
            <Stack.Screen name='Shared Uploads' component={Share}/>
            <Stack.Screen name='Manage User' component={ManageUser}/>
             {/* <Stack.Screen name='Custom Drawer' component={CustomDrawer}/>  */}
        </Stack.Navigator>
    )
}
