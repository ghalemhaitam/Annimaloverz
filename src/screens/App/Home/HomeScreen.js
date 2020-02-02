import React from 'react'
import { Text, Button, Appbar, Avatar, Card } from 'react-native-paper'

import { View, ScrollView, TouchableOpacity, AsyncStorage } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { translate, setI18nConfig } from '../../../i18n/i18n'
import * as RNLocalize from "react-native-localize"
import { Image } from 'react-native-elements'
import Icon from 'react-native-ionicons'
import CardComponent from '../../../Components/CardComponent'
import firebase from '../../../api/firebase'
import { connect } from 'react-redux'
import { authListener } from '../../../actions'

var styles = require('../../../assets/css/button')
var styleCard = require('../../../assets/css/card')

class HomeScreen extends React.Component {

    /* Start Code For i18n */

    constructor(props) {
        super(props)
        setI18nConfig() // set initial config
    }

    handleLocalizationChange

    componentDidMount() {
        RNLocalize.addEventListener("change", this.handleLocalizationChange)
        // AsyncStorage.getItem('user_info')
        //     .then(user => {
        //         if (user) {
        //             const userObject = JSON.parse(user)
        //             this.props.loggedIn(userObject)
        //         } else {
        //             this.props.navigation.navigate('LoginScreen')
        //         }
        //     })
    }

    componentWillUnmount() {
        RNLocalize.removeEventListener("change", this.handleLocalizationChange)
    }

    handleLocalizationChange = () => {
        setI18nConfig()
        this.forceUpdate()
    }

    /* End Code For i18n */

    componentWillReceiveProps(newProps) {
        if (!newProps.user) {
            this.props.navigation.navigate('LoginScreen')
        }
    }

    onPressButtonLike() {

    }

    render() {
        return (
            <LinearGradient
                start={{ x: 0.0, y: 0.1 }} end={{ x: 1.0, y: 1.0 }}
                colors={['#E7BD00', '#FE7058']}
            >

                <ScrollView style={{ backgroundColor: 'transparent', width: '100%', height: '100%' }}>
                    <Appbar style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                        <Avatar.Image size={40} style={{ marginLeft: 10 }} source={require('../../../assets/images/avatar.png')} />
                        <Text >Animaloverz</Text>
                        <Appbar.Action icon="message" />
                    </Appbar>

                    <Card style={[styleCard.card, { height: 560, backgroundColor: 'transparent' }]}>
                        <Card.Content style={[styleCard.cardContent, { height: '100%', width: 400, }]}>
                            <CardComponent />
                        </Card.Content>
                    </Card>

                    <View style={styleCard.cardContentCenterIcons}>
                        <TouchableOpacity onPress={(e) => this.onPressButtonLike(e)}>
                            <View style={[styleCard.cardContentCenterIconsBorder, { width: 40, height: 40 }]}>
                                <Icon style={[styleCard.Icon, { flexDirection: 'column-reverse' }]} name="refresh" rotate={90} color={'#fe7c4a'} size={30} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={(e) => this.onPressButtonLike(e)}>
                            <View style={styleCard.cardContentCenterIconsBorder}>
                                <Icon style={styleCard.Icon} name="close" color={'red'} size={30} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={(e) => this.onPressButtonLike(e)}>
                            <View style={[styleCard.cardContentCenterIconsBorder, { width: 40, height: 40 }]}>
                                <Icon style={styleCard.Icon} name="star" color={'orange'} size={27} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={(e) => this.onPressButtonLike(e)}>
                            <View style={styleCard.cardContentCenterIconsBorder}>
                                <Icon style={styleCard.Icon} name="heart" color={'#DF0069'} size={30} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={(e) => this.onPressButtonLike(e)}>
                            <View style={[styleCard.cardContentCenterIconsBorder, { width: 40, height: 40 }]}>
                                <Icon style={styleCard.Icon} name="share-alt" color={'#009FF2'} size={30} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </LinearGradient>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        authListener: () => dispatch(authListener())
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
