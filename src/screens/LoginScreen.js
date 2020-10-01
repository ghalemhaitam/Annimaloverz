import React from 'react'
import { Button } from 'react-native-paper'

import { TextInput, View, Image, Text } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { translate, setI18nConfig } from '../i18n/i18n'
import * as RNLocalize from "react-native-localize"

var styles = require('../assets/css/button')

import { connect } from 'react-redux'
import { login, authHandler } from '../actions'

class LoginScreen extends React.Component {

    static navigationOptions = {
        title: 'Login'
    }

    state = {
        email: '',
        password: ''
    }
{}

    /* Start Code For i18n */
    constructor(props) {
        super(props)
        setI18nConfig() // set initial config
    }

    handleLocalizationChange

    componentWillMount() {
        this.props.authHandler()
    }

    componentDidMount() {
        RNLocalize.addEventListener('change', this.handleLocalizationChange)
    }

    componentWillUnmount() {
        RNLocalize.removeEventListener('change', this.handleLocalizationChange)
    }

    handleLocalizationChange = () => {
        setI18nConfig()
        this.forceUpdate()
    }
    /* End Code For i18n */

    handleLogin = () => {
        this.props.login(this.state.email, this.state.password)
    }

    componentWillReceiveProps(newProps) {
        if (newProps.user) {
            this.props.navigation.navigate('HomeScreen')
        }
    }

    render() {
        if (this.props.loading) {
            return (
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Image style={{ width: 200, height: 200 }} source={require('../assets/images/loader.gif')} />
                </View>
            )
        }

        else return (
            <View style={styles.container}>

                <View style={styles.loginContainer}>
                    <View>
                        <Image
                            style={styles.image}
                            source={require('../assets/images/authentification/login.png')} />
                    </View>

                    <View style={styles.bluebox}>
                        <TextInput
                            placeholder={translate("ScreenLogin.InputEmailPlaceholder")}
                            value={this.state.email}
                            underlineColorAndroid='transparent'
                            onChangeText={email => this.setState({ email })}
                            style={[styles.TextInputStyleClass, styles.shadowElement]} />

                        <TextInput
                            secureTextEntry={true}
                            placeholder={translate("ScreenLogin.InputPasswordPlaceholder")}
                            value={this.state.password}
                            underlineColorAndroid='transparent'
                            onChangeText={password => this.setState({ password })}
                            style={[styles.TextInputStyleClass, styles.shadowElement]} />
                    </View>

                    {this.props.error ? <Text style={{ color: 'red', alignSelf: 'center', marginTop: 10 }}>{this.props.error}</Text> : null}

                    <View style={styles.blackbox} >
                        <View style={styles.btnsLogin}>
                            <LinearGradient
                                start={{ x: 0.0, y: 0.1 }} end={{ x: 1.0, y: 1.0 }}
                                colors={['#E7BD00', '#FE7058']}
                                style={[styles.btnOrange, { marginRight: 5 }, styles.shadowElement]}>

                                <Button
                                    uppercase={false}
                                    mode="text"
                                    //onPress={() => this.props.navigation.navigate('HomeScreen')}
                                    onPress={this.handleLogin}
                                >
                                    {translate("ScreenLogin.BtnConnecter")}
                                </Button>
                            </LinearGradient>

                            <LinearGradient
                                start={{ x: 0.0, y: 0.3 }} end={{ x: 1.0, y: 1.0 }}
                                colors={['#FE7058', '#E7BD00']}
                                style={[styles.btnOrange, { marginLeft: 5 }, styles.shadowElement]}>

                                <Button
                                    uppercase={false}
                                    mode="text"
                                    onPress={() => this.props.navigation.navigate('Inscription')}
                                >
                                    {translate("ScreenLogin.BtnRegister")}
                                </Button>
                            </LinearGradient>
                        </View>

                        <View style={styles.btnView}>
                            {/* {<LinearGradient
                                start={{ x: 0.0, y: 0.3 }} end={{ x: 1.0, y: 1.0 }}
                                colors={['#CC1111', '#AA2222', '#CC1111']}
                                style={[styles.btnConnectionFb, styles.shadowElement]}>

                                <Button
                                    uppercase={false}
                                    mode="text"
                                    onPress={this.handleGoogleLogin}>
                                    Google
                                </Button>
                            </LinearGradient>}

                            {<LinearGradient
                                start={{ x: 0.0, y: 0.3 }} end={{ x: 1.0, y: 1.0 }}
                                colors={['#009EFA', '#2C73D2', '#009EFA']}
                                style={[styles.btnConnectionFb, styles.shadowElement]}>

                                <Button
                                    uppercase={false}
                                    mode="text"
                                    onPress={() => this.props.navigation.navigate('Inscription')}>
                                    {translate("ScreenLogin.BtnConnecterByFacebook")}
                                </Button>
                            </LinearGradient>} */}

                            <Button
                                style={styles.btnSinscrire}
                                uppercase={false}
                                mode="text" color="#FE7058"
                                onPress={() => this.props.navigation.navigate('PasswordForget')}>
                                {translate("ScreenLogin.BtnForgetPassword")}
                            </Button>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        loading: state.auth.loading,
        error: state.auth.error
    }
}

export default connect(mapStateToProps, { login, authHandler })(LoginScreen)
