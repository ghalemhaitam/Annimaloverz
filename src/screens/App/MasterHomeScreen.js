import React from 'react'
import { Text, View, } from 'react-native'
import { createBottomTabNavigator, createAppContainer } from 'react-navigation'
import HomeScreen from '../../screens/App/Home/HomeScreen'
import ArticleScreen from '../../screens/App/Article/ArticleScreen'
import NotificationsScreen from '../../screens/App/Notification/NotificationScreen'
import FontAwesome from "react-native-vector-icons/FontAwesome"


const TabNavigator = createBottomTabNavigator(
    {
        Article: {
            screen: ArticleScreen,
            navigationOptions: {

                tabBarIcon: ({ focused, tintColor }) => (
                    focused ?
                        <FontAwesome name="newspaper-o" color={tintColor} size={23} /> :
                        <FontAwesome name="newspaper-o" color={tintColor} size={23} />
                )
            }
        },

        Home: {
            screen: HomeScreen,
            navigationOptions: {

                tabBarIcon: ({ focused, tintColor }) => (
                    focused ?
                        <FontAwesome name="heart" color={tintColor} size={25} /> :
                        <FontAwesome name="heart-o" color={tintColor} size={23} />
                )
            }
        },

        Notification: {
            screen: NotificationsScreen,
            navigationOptions: {

                tabBarIcon: ({ focused, tintColor }) => (
                    focused ?
                        <FontAwesome name="bell" color={tintColor} size={25} /> :
                        <FontAwesome name="bell-o" color={tintColor} size={23} />
                )
            }
        }
    },
    {
        initialRouteName: "Article",
        tabBarOptions: {
            showLabel: false,
            activeTintColor: '#fe7c4a',
            inactiveTintColor: 'black'
        }
    }
)

export default createAppContainer(TabNavigator)
