import React from 'react';
import {
    Appbar, Avatar, Text,
} from 'react-native-paper';
import {
    StackNavigator,
} from 'react-navigation';
import {
    SafeAreaView, TouchableOpacity, View, TextInput,
    Keyboard, YellowBox, Dimensions, ActivityIndicator
} from 'react-native';
YellowBox.ignoreWarnings(['Warning: ReactNative.createElement']);

import LinearGradient from 'react-native-linear-gradient'
import { translate, setI18nConfig } from '../../../i18n/i18n'
import * as RNLocalize from "react-native-localize";
import { Image } from 'react-native-elements';
import Icon from 'react-native-ionicons';
import { getNewsFromApiPage } from '../../../api/newsapi';
import ListItemChatComponent from '../../../Components/ListeItemChatComponent';
import ChatItemLeftComponent from '../../../Components/ChatItemLeftComponent';
import ChatItemRightComponent from '../../../Components/ChatItemRightComponent';

// Start Get data from Firebase
import { connect } from 'react-redux';
import { sendMessage, fetchMessages } from '../../../actions';
// End Get data from Firebase


import { FlatList } from 'react-native-gesture-handler';
import { white } from 'ansi-colors';

const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);

var styles = require('../../../assets/css/button');
var stylesChat = require('../../../assets/css/chat/ChatList');

class ChatListScreen extends React.Component {



    constructor(props) {
        super(props);

        setI18nConfig(); // set initial config
        this.state = {
            heightFlatList: 0.8,
            message: '',
            usertransmitter: {
                id: 1,
                username: 'Haitam Ghalem',
                avatar: 'https://miraclelearningcentre.com/wp-content/uploads/2016/04/mr.png'
            },
            userReceiver: {
                id: 2,
                username: 'Zainab Ghalem',
                avatar: 'https://studentchallenge.edublogs.org/files/2018/09/Avatar-example-Kathleen-Morris-190nulz-10ppb1u-300x281.png'
            },
            /*
            messages :[
             
              {
                userId: 2,
                text: 'Hello ! how are you ?',
                time: '15:45 AM',
              },
              {
                userId: 1,
                text: 'Hello',
                time: '15:42 PM',
              },
              {
                userId: 1,
                text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
                time: '15:48 PM',
              },
            ],
            */
            loadingList: false,


        };


        keyExtractor = (item, index) => index;





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



    // writing on the input
    onTyping(text) {
        if (text && text.length >= 2) {
            return 0;
        }
    };
    // on click button send
    onSendBtnPressed() {


        // Start - Get great Date Form
        /*
            var date = new Date();
            
            var hour = date.getHours(); //Current Hour
    
            if(hour <= 11)
            {
        
              TimeType = 'AM';
        
            }
            else{
        
              // If the Hour is Not less than equals to 11 then Set the Time format as PM.
              TimeType = 'PM';
        
            }
        
        
            // IF current hour is grater than 12 then minus 12 from current hour to make it in 12 Hours Format.
            if( hour > 12 )
            {
              hour = hour - 12;
            }
        
            // If hour value is 0 then by default set its value to 12, because 24 means 0 in 24 hours time format. 
            if( hour == 0 )
            {
                hour = 12;
            } 
        
        
            // Getting the current minutes from date object.
            min = date.getMinutes();
        
            // Checking if the minutes value is less then 10 then add 0 before minutes.
            if(min < 10)
            {
              min = '0' + min.toString();
            }
            */
        // End - Get great Date Form


        this.props.sendMessage(this.state.message, 1, new Date());

        /* code without firebase data
        
            this.setState({ messages });
            const messages = this.state.messages;
        
            const newMessage = {
              userId: 2,
                text: this.state.message,
                time: hour+":"+min+" "+TimeType
            };
        
            messages.unshift(newMessage);
            this.setState({ messages });
        */

        this.message.clear();
        Keyboard.dismiss();
    }
    // Add Message Sended on FLatList
    renderChatItem({ item }) {
        if (item.author == 2) {
            return <ChatItemLeftComponent message={item} />
        } else {
            return <ChatItemRightComponent message={item} />
        }

    }


    handleLocalizationChange
    componentDidMount() {
        // keyboaed effect with message textInput
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));



        RNLocalize.addEventListener("change", this.handleLocalizationChange);
        //Have a try and catch block for catching errors.
        try {
            //Assign the promise unresolved first then get the data using the json method. 
            getNewsFromApiPage(this.state.page).then(data => this.setState({ conversations: data.articles }));


        } catch (err) {
            console.log("Error fetching data-----------", err);
        }
    };

    componentWillMount() {
        this.props.fetchMessages()
    }


    _keyboardDidShow() {
        this.setState({ heightFlatList: 0.45 })
    }
    _keyboardDidHide() {
        this.setState({ heightFlatList: 0.8 })
    }

    componentWillUnmount() {
        // Start When keyboardDidShow Or Hide
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
        // End When keyboardDidShow Or Hide

        this.setState({ loadingList: false })
        RNLocalize.removeEventListener("change", this.handleLocalizationChange);

    };
    handleLocalizationChange() {
        setI18nConfig();
        this.forceUpdate();
    };
    /* End Code For i18n */

    showListOrSpinner() {
        if (this.props.fetching) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size='large' />
                </View>
            );
        }

        return (
            <FlatList
                inverted
                style={{ padding: 10, height: height * this.state.heightFlatList }}
                data={this.props.messages}
                renderItem={this.renderChatItem}
                keyExtractor={this.keyExtractor}
            />
        )
    }


    render() {

        return (

            <View>
                <LinearGradient
                    start={{ x: 0.0, y: 0.1 }} end={{ x: 1.0, y: 1.0 }}
                    colors={['#E7BD00', '#FE7058']}
                >
                    <Appbar style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between'

                    }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Avatar.Image size={40} style={{ marginLeft: 10 }} source={{ uri: this.state.usertransmitter.avatar }} />
                            <Text style={{ marginLeft: 10, fontSize: 17, paddingTop: 9 }}>{this.state.usertransmitter.username}</Text>
                        </View>
                        <Icon name="more" size={27} style={{ marginRight: 10 }} />
                    </Appbar>

                    <View style={stylesChat.container}>
                        <SafeAreaView style={{ margin: 7 }}>


                            {this.showListOrSpinner()}
                            {/**
                       <FlatList 
                        inverted
                        style={{padding:10, height:height* this.state.heightFlatList}}
                        data={this.state.messages}
                        renderItem={this.renderChatItem}
                        keyExtractor={this.keyExtractor}
                    />
                      */}


                            <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 5, paddingTop: 0 }}>
                                <TextInput
                                    multiline
                                    onSubmitEditing={Keyboard.dismiss}
                                    placeholder={translate("ScreenChatConversation.InputSendMessage")}
                                    value={this.state.message}
                                    underlineColorAndroid='transparent'
                                    onChangeText={message => this.setState({ message })}
                                    style={[styles.TextInputStyleClass, styles.shadowElement, { flex: 6, borderColor: "#fff" }]}
                                    ref={input => { this.message = input; }} />
                                <TouchableOpacity
                                    onPress={this.onSendBtnPressed.bind(this)}
                                    style={[styles.btnConnectionFb, styles.shadowElement, { flex: 1, marginLeft: 5, paddingBottom: 5 }]}

                                >
                                    <LinearGradient
                                        start={{ x: 0.0, y: 0.3 }} end={{ x: 1.0, y: 1.0 }}
                                        colors={['#fff', '#fff']}
                                        style={[styles.btnConnectionFb, styles.shadowElement]}>


                                        <Icon style={[stylesChat.Icon, { textAlign: 'center' }]} name="send" color={'#FE7058'} size={27} />


                                    </LinearGradient>
                                </TouchableOpacity>



                            </View>
                        </SafeAreaView>

                    </View>
                </LinearGradient>
            </View>


        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        fetching: state.chat.fetching,
        messages: state.chat.messages,
    }
}

export default connect(mapStateToProps, { sendMessage, fetchMessages })(ChatListScreen);
