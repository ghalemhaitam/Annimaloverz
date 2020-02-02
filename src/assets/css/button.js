'use strict';

var React = require('react-native');

var {
    StyleSheet, Dimensions
} = React;
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
module.exports = StyleSheet.create({

    myCustomText: {
        fontFamily: 'Roboto',
    },
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    image: {
        alignSelf: 'stretch',
        margin: 2,
        padding: 2,
        height: 300,
        width: width,
    },
    bluebox: {
        width: width - 130,
        marginHorizontal: 70,
        // backgroundColor: 'blue'
    },
    btnView: {
        marginHorizontal: 10,
        // backgroundColor: 'blue'
    },
    btnsLogin: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center'
    }
    ,
    blackbox: {
        paddingTop: 20,
        marginHorizontal: 60,
    },
    loginContainer: {
        flexGrow: 1,
    },
    btnOrange: {
        alignContent: 'center',
        justifyContent: 'center',
        height: 40,
        width: '45%',
        borderRadius: 30,
        backgroundColor: 'transparent',
        marginTop: 10,
    },
    InputMidleWidth: {
        alignContent: 'center',
        justifyContent: 'center',
        width: '48%',
        borderRadius: 30,

    },
    btnOrangeUltraWidth: {
        alignContent: 'center',
        justifyContent: 'center',
        height: 40,
        width: '100%',
        borderRadius: 30,
        backgroundColor: 'transparent',
        marginTop: 10,
    },
    btnSinscrire: {
        marginTop: 0,

    },
    btnConnectionFb: {
        alignContent: 'center',
        justifyContent: 'center',
        height: 40,
        width: '100%',
        borderRadius: 30,
        backgroundColor: 'transparent',
        marginTop: 10,
    },
    btnSinscrire: {
        marginTop: 0,

    },
    // Shadow Elements
    shadowElement: {
        // shadow btn
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },


    textInput: {
        height: 40,
        padding: 0
    },

    TextInputStyleClass: {
        textAlign: 'center',
        marginTop: 15,
        // height: 40,
        borderWidth: 1.5,
        borderColor: '#FF5722',
        borderRadius: 20,
        backgroundColor: "#FFFFFF"
    },


});