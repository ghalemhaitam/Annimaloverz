import React from 'react';
import {
    Avatar
} from 'react-native-paper';
import {
    StackNavigator,
} from 'react-navigation';
import { ActivityIndicator, TouchableOpacity, View, ScrollView, Dimensions } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { translate, setI18nConfig } from '../../../i18n/i18n'
import * as RNLocalize from "react-native-localize";
import { Image } from 'react-native-elements';
import Icon from 'react-native-ionicons';
import { getNewsFromApiPage } from '../../../api/newsapi';
import ListItemChatComponent from '../../../Components/ListeItemChatComponent';

const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);


var styles = require('../../../assets/css/button');
var stylesChat = require('../../../assets/css/chat/ChatList');

class ChatListScreen extends React.Component {

    /* Start Code For i18n */
    static navigationOptions = {
        title: 'Conversations'
    };

    constructor(props) {
        super(props);
        setI18nConfig(); // set initial config
        this.state = {
            conversations: [],
            loadingList: false,
            page: 1,
        };
        isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
            const paddingToBottom = 20;
            this.setState({ loadingList: false })

            return layoutMeasurement.height + contentOffset.y >=
                contentSize.height - paddingToBottom;
        };
        //Scroll Bottom View
        enableSomeButton = async () => {
            try {
                this.setState(state => ({
                    page: state.page + 1,
                }));
                getNewsFromApiPage(this.state.page).then(data => this.setState(state => ({ news: [...state.conversations, ...data.articles] })));


            } catch (err) {
                console.log("Error fetching data-----------", err);
            }
        }
    };

    handleLocalizationChange
    componentDidMount() {
        RNLocalize.addEventListener("change", this.handleLocalizationChange);
        //Have a try and catch block for catching errors.
        try {
            //Assign the promise unresolved first then get the data using the json method. 
            getNewsFromApiPage(this.state.page).then(data => this.setState({ conversations: data.articles }));

        } catch (err) {
            console.log("Error fetching data-----------", err);
        }
    };

    componentWillUnmount() {
        this.setState({ loadingList: false })
        RNLocalize.removeEventListener("change", this.handleLocalizationChange);
    };
    handleLocalizationChange() {
        setI18nConfig();
        this.forceUpdate();
    };
    /* End Code For i18n */


    render() {
        return (

            <View>
                <LinearGradient
                    start={{ x: 0.0, y: 0.1 }} end={{ x: 1.0, y: 1.0 }}
                    colors={['#E7BD00', '#FE7058']}
                >
                    <View style={stylesChat.container}>

                        <ListItemChatComponent
                            onPress={() =>
                                this.props.navigation.navigate('ChatConversationScreen')}
                            style={{ paddingTop: 5 }}
                            name="Haitam"
                            message="Salut toi! ...."
                            time="18:46"
                        />
                        <ListItemChatComponent
                            onPress={() =>
                                this.props.navigation.navigate('ChatConversationScreen')}
                            name="Mouad"
                            message="comment ca vas ?"
                            time="12:30"
                        />

                    </View>
                </LinearGradient>
            </View>


        );
    }
}


export default ChatListScreen
