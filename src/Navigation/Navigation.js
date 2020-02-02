import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation'
import LoginScreen from '../screens/LoginScreen'
import Inscription from '../screens/Register/Inscription'
import PasswordForget from '../screens/PasswordForget'
import ResetPassword from '../screens/ResetPassword'
import MasterHomeScreen from '../screens/App/MasterHomeScreen'
import ChatListScreen from '../screens/App/Chat/ChatListScreen'
import ChatConversationScreen from '../screens/App/Chat/ChatConversationScreen'

const Navigation = createStackNavigator({
    LoginScreen: {
        screen: LoginScreen,
        navigationOptions: ({ navigation }) => ({
            header: null,
            tabBarVisible: false,
            headerMode: "screen"
        })
    },

    HomeScreen: {
        screen: MasterHomeScreen,
        navigationOptions: ({ navigation }) => ({
            header: null,
            tabBarVisible: true,
            headerMode: "screen",
        })
    },

    Inscription: {
        screen: Inscription,
        navigationOptions: ({ navigation }) => ({
            header: null,
            tabBarVisible: false,
            headerMode: "screen",
        })
    },

    PasswordForget: {
        screen: PasswordForget,
        navigationOptions: ({ navigation }) => ({
            header: null,
            tabBarVisible: false,
            headerMode: "screen",
        })
    },

    ResetPassword: {
        screen: ResetPassword,
        navigationOptions: ({ navigation }) => ({
            header: null,
            tabBarVisible: false,
            headerMode: "screen",
        })
    },

    ChatListScreen: {
        screen: ChatListScreen,
        navigationOptions: ({ navigation }) => ({

            tabBarVisible: false,
            headerMode: "screen",
        })
    },

    ChatConversationScreen: {
        screen: ChatConversationScreen,
        navigationOptions: ({ navigation }) => ({
            header: null,
            tabBarVisible: true,
            headerMode: "screen",
        })
    }
})

export default createAppContainer(Navigation)
