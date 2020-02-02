import React from 'react'
import { StyleSheet, TextInput, View, Image, Dimensions, } from 'react-native'
import { Text, Button } from 'react-native-paper'
import LinearGradient from 'react-native-linear-gradient'

import { translate, setI18nConfig } from '../../i18n/i18n'
import * as RNLocalize from "react-native-localize"

import { connect } from 'react-redux'
import { register } from '../../actions'
import LoginScreen from '../../screens/LoginScreen'

var width = Dimensions.get('window').width //full width
var height = Dimensions.get('window').height //full height
var styles = require('../../assets/css/button')
var registerStyle = require('../../screens/Register/register.css')

class Inscription extends React.Component {

    static navigationOptions = {
        title: 'Formulaire d\'inscription'
    }

    state = {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        passwordConf: ''
    }

    /* Start Code For i18n */
    constructor(props) {
        super(props)
        setI18nConfig()
    }

    handleLocalizationChange

    componentDidMount() {
        RNLocalize.addEventListener("change", this.handleLocalizationChange)
    }

    componentWillUnmount() {
        RNLocalize.removeEventListener("change", this.handleLocalizationChange)
    }

    handleLocalizationChange = () => {
        setI18nConfig()

        this.forceUpdate()
    }
    /* End Code For i18n */

    // function on click btn register after input all informations we need to accpet
    handleRegister = () => {
        this.props.register(
            this.state.firstname,
            this.state.lastname,
            this.state.email,
            this.state.password,
            this.state.passwordConf
        )
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user) {
            this.props.navigation.navigate('HomeScreen')
        }
    }

    render() {
        if (this.props.loading) {
            return (
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Image style={{ width: 200, height: 200 }} source={require('../../assets/images/loader.gif')} />
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <View style={styles.loginContainer}>
                    <View>
                        <Image
                            style={styles.image}
                            source={require('../../assets/images/authentification/signup.png')} />

                    </View>

                    <View style={styles.bluebox}>
                        <View style={styles.btnsLogin}>
                            <TextInput
                                placeholder={translate("ScreenRegister.InputFirstnamePlaceholder")}
                                value={this.state.firstname}
                                underlineColorAndroid='transparent'
                                onChangeText={firstname => this.setState({ firstname })}
                                style={[styles.TextInputStyleClass, styles.InputMidleWidth, { marginRight: 4 }, styles.shadowElement]} />

                            <TextInput
                                placeholder={translate("ScreenRegister.InputLastnamePlaceholder")}
                                value={this.state.lastname}
                                underlineColorAndroid='transparent'
                                onChangeText={lastname => this.setState({ lastname })}
                                style={[styles.TextInputStyleClass, styles.InputMidleWidth, styles.shadowElement, { marginTop: 15, marginLeft: 4 }]} />
                        </View>

                        <TextInput
                            placeholder={translate("ScreenRegister.InputEmailPlaceholder")}
                            value={this.state.email}
                            underlineColorAndroid='transparent'
                            onChangeText={email => this.setState({ email })}
                            style={[styles.TextInputStyleClass, styles.shadowElement, { marginTop: 15 }]} />

                        <TextInput
                            secureTextEntry={true}
                            placeholder={translate("ScreenRegister.InputPasswordPlaceholder")}
                            value={this.state.password}
                            underlineColorAndroid='transparent'
                            onChangeText={password => this.setState({ password })}
                            style={[styles.TextInputStyleClass, styles.shadowElement, { marginTop: 15 }]} />

                        <TextInput
                            secureTextEntry={true}
                            placeholder={translate("ScreenRegister.InputPasswordConfPlaceholder")}
                            value={this.state.passwordConf}
                            underlineColorAndroid='transparent'
                            onChangeText={passwordConf => this.setState({ passwordConf })}
                            style={[styles.TextInputStyleClass, styles.shadowElement, { marginTop: 15 }]} />
                    </View>

                    {this.props.error ? <Text style={{ color: 'red', alignSelf: 'center', marginTop: 10 }}>{this.props.error}</Text> : null}

                    <View style={styles.blackbox}>
                        <View style={styles.btnView}>
                            <LinearGradient
                                start={{ x: 0.0, y: 0.3 }} end={{ x: 1.0, y: 1.0 }}
                                colors={['#E7BD00', '#FE7058', '#E7BD00']}
                                style={[styles.btnOrangeUltraWidth, styles.shadowElement]}>

                                <Button
                                    uppercase={false}
                                    mode="text"
                                    onPress={this.handleRegister}>
                                    {translate("ScreenRegister.BtnRegister")}
                                </Button>
                            </LinearGradient>
                            <LinearGradient
                                start={{ x: 0.0, y: 0.3 }} end={{ x: 1.0, y: 1.0 }}
                                colors={['#009EFA', '#2C73D2', '#009EFA']}
                                style={[styles.btnConnectionFb, styles.shadowElement]}>

                                <Button
                                    uppercase={false}
                                    mode="text"
                                    onPress={() => this.props.navigation.navigate('LoginScreen')}>
                                    {translate("ScreenRegister.BtnRegisterWithFacebook")}
                                </Button>
                            </LinearGradient>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.register.user,
        loading: state.register.loading,
        error: state.register.error
    }
}

export default connect(mapStateToProps, { register })(Inscription)

//export default Inscription