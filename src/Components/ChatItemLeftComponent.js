import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import moment from 'moment';
import 'moment/min/locales';
import * as RNLocalize from "react-native-localize";


class ChatItemLeftComponent extends Component {
    render(){
       
        const locales = RNLocalize.getLocales();
        moment.locale(locales[0].languageTag);
        
        const message = this.props.message;
        const time = moment( message.date || moment.now() ).calendar();
       
        return (
            <View style={styles.messageContainer}>                
                <View style={{width:'100%'}}>
                    <Text>{message.text}</Text>
                    <Text style={styles.textMessage}>{time}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    messageContainer: {
        paddingVertical : 7,
        paddingHorizontal:15,
        marginVertical : 5,
        marginRight: '20%',
        flexDirection: 'row',
        backgroundColor:'#fff',
        borderRadius: 30,
    },
    textMessage: {
        color: '#FE7058',
        fontSize: 11,
        textAlign: 'right',
    }
})

export default ChatItemLeftComponent;