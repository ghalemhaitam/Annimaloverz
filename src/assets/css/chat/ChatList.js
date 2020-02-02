'use strict';

var React = require('react-native');

var {
  StyleSheet
} = React;

module.exports = StyleSheet.create({

    container: {
        paddingTop:5,
        height:"100%",
    },
    itemChat: {
        margin:2.5,
        borderRadius: 50
    },
    avatarItem: {
        paddingTop:9
    },
    rightItem:{
        flex:1,flexDirection:"column", alignItems:"flex-end", marginTop: 6
    }


});