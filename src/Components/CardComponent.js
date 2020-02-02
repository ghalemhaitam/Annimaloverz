// @flow
import * as React from "react";
import {
  Image, StyleSheet, View, Text,
} from "react-native";
import Animated from "react-native-reanimated";
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-ionicons';

const { Value } = Animated;


export default class Card extends React.Component {
  static defaultProps = {
    likeOpacity: 1,
    nopeOpacity: 1,
  };

  render() {
    const {  likeOpacity, nopeOpacity } = this.props;
    return (
      <View style={StyleSheet.absoluteFill}>
        <Image style={styles.image}  source={require('../assets/images/chien.jpg')}/>
        <View style={styles.overlay}>
          <View style={styles.header}>
            <Animated.View style={[styles.like, { opacity: likeOpacity }]}>
              <Text style={styles.likeLabel}>Like</Text>
            </Animated.View>
            <Animated.View style={[styles.nope, { opacity: nopeOpacity }]}>
              <Text style={styles.nopeLabel}>NOPE</Text>
            </Animated.View>
          </View>

          
          <View style={{flex:1, flexDirection:'column', justifyContent:'flex-end'}}>
            <View style={{ flexDirection:'row'}}>
              <Text style={styles.name}>Chien Chienne </Text>
              <Text style={styles.age}>5</Text>
            </View>  
          </View>
          <View style={styles.footer}> 
            <View style={{ flex:1, flexDirection:'row',height:20, paddingTop:4 }}>
              <Icon  name="male" color={'white'} size={18} style={{height:18, marginRight:5}} /> 
              <Text style={styles.sex}> mâle</Text>
          </View> 
          <View style={{ flex:1, flexDirection:'row'}}>
              <Icon  name="pin" color={'white'} size={19} style={{paddingBottom:4,marginRight:6,paddingRight:3}} /> 
              <Text style={styles.sex}> à 8 Km</Text>
          </View> 

    
          </View>

        
          </View>
        </View>
     
    );
  }
}

const styles = StyleSheet.create({
  image: {
    ...StyleSheet.absoluteFillObject,
    width: null,
    height: '100%',
    
    
    borderRadius: 8,
  },
  overlay: {
    flex: 1,
    justifyContent: "space-between",
    padding: 16,
    paddingBottom:0
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footer: {
    flexDirection: "column",
    flex:0.15,
  },
  name: {
    color: "white",
    fontWeight: '700',
    fontSize: 32,
  },
  age:{
    color: "white",
    fontWeight: '100',
    fontSize:23,
    marginTop:9
  },
  sex:{
    color: "white",
    fontWeight: "normal",
    fontSize: 15,
    bottom:0,
    height:20
  },
  like: {
    borderWidth: 4,
    borderRadius: 5,
    padding: 8,
    borderColor: "#6ee3b4",
  },
  likeLabel: {
    fontSize: 32,
    color: "#6ee3b4",
    fontWeight: "bold",

  },
  nope: {
    borderWidth: 4,
    borderRadius: 5,
    padding: 8,
    borderColor: "#ec5288",
  },
  nopeLabel: {
    fontSize: 32,
    color: "#ec5288",
    fontWeight: "bold",
  },
});