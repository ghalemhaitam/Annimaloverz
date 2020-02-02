'use strict';

var React = require('react-native');

var {
  StyleSheet, Dimensions
} = React;
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
module.exports = StyleSheet.create({

    image: {
        alignSelf: 'center',
        padding:2, 
        height:200,
        width: '60%',  
       },
       
});