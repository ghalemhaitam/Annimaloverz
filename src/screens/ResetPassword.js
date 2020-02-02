import React from 'react';
import { View,Image,TextInput} from 'react-native';
import { 
   Button
} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient'
import {translate, setI18nConfig} from '../i18n/i18n'
import * as RNLocalize from "react-native-localize";
var styles = require('../assets/css/button');

class ResetPassword extends React.Component {
  static navigationOptions = {
    title: 'Mot de passe Oublié'
   };
   state = {
    password: '',
    passwordConf: '',
  }; 
  /* Start Code For i18n */ 
  constructor(props) {
    super(props);
    setI18nConfig(); // set initial config
  };
  handleLocalizationChange
  componentDidMount() {
    RNLocalize.addEventListener("change", this.handleLocalizationChange);
  };
  componentWillUnmount() {
    RNLocalize.removeEventListener("change", this.handleLocalizationChange);
  };
  handleLocalizationChange = () => {
    setI18nConfig();
    this.forceUpdate();
  };
  /* End Code For i18n */

 render() {
 return (
  <View style = {styles.container}>
  <View style = {styles.loginContainer}>
  <View> 
    <Image 
      style = {styles.image} 
      source={require('../assets/images/authentification/passwordreset.png')}/>

   </View>

<View style = {styles.bluebox}>
  
      <TextInput
          placeholder={translate("ScreenResetPassword.InputPasswordPlaceholder")}
          value={this.state.password}
          underlineColorAndroid='transparent' 
          onChangeText={password => this.setState({ password })}
          style={[styles.TextInputStyleClass, styles.shadowElement, {marginTop:15}]}/>  

      <TextInput
          placeholder={translate("ScreenResetPassword.InputPasswordConfPlaceholder")}
          value={this.state.passwordConf}
          underlineColorAndroid='transparent' 
          onChangeText={passwordConf => this.setState({ passwordConf })}
          style={[styles.TextInputStyleClass, styles.shadowElement, {marginTop:15}]}/>  
 
</View> 

<View style = {styles.blackbox}>
  <View style = {styles.btnView}>
    <LinearGradient
          start={{x: 0.0, y: 0.3}} end={{x: 1.0, y: 1.0}}
          colors={['#E7BD00' ,'#FE7058', '#E7BD00']}
          style={[ styles.btnOrangeUltraWidth, styles.shadowElement ]}>
          
          <Button 
            uppercase={false} 
            mode="text" 
            onPress={() => this.props.navigation.navigate('LoginScreen')}>
            {translate("ScreenResetPassword.BtnConfirmation")}
          </Button>
    </LinearGradient>
  </View>

</View>

</View> 
</View>
);
}
}

export default ResetPassword;