import React, { useState, useEffect } from 'react'
import { ActivityIndicator, TouchableOpacity, View, ScrollView, Dimensions, TextInput, Modal, PermissionsAndroid } from 'react-native'
import { Text, Appbar, Avatar, Card, Paragraph, Button } from 'react-native-paper'
import LinearGradient from 'react-native-linear-gradient'
import { connect } from 'react-redux'
import { setI18nConfig } from '../../../i18n/i18n'
import * as RNLocalize from "react-native-localize"
import { Image } from 'react-native-elements'
import Icon from 'react-native-ionicons'
import { logout } from '../../../actions/AuthAction'
import { postArticle, fetchArticles, getActiveProfile, switchProfile } from '../../../actions'
import moment from 'moment'
import ImagePicker from 'react-native-image-picker'
import Post from "../../../Components/PostComponent"
import firebase from 'react-native-firebase'

const width = Math.round(Dimensions.get('window').width)
const height = Math.round(Dimensions.get('window').height)

var styles = require('../../../assets/css/button')
var styleCard = require('../../../assets/css/card')

const options = {
    title: 'Select Image',
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
}

const ArticleScreen = props => {

    setI18nConfig()
    handleLocalizationChange

    const [likes, setLikes] = useState(0)
    const [shares, setShares] = useState(0)
    const [star, setStar] = useState(false)
    const [imgSource, setImgSource] = useState('')
    const [imgPath, setImgPath] = useState('')
    const [postType, setPostType] = useState('')
    const [articleTitle, setArticleTitle] = useState('')
    const [articleText, setArticleText] = useState('')
    const [limit, setLimit] = useState(12)
    const [profileModalVisible, setProfileModalVisible] = useState(false)
    const [postModalVisible, setPostModalVisible] = useState(false)

    useEffect(() => {
        RNLocalize.addEventListener("change", handleLocalizationChange)

        props.getActiveProfile(props.user.uid)
        props.fetchArticles(limit)

        return () => {
            RNLocalize.removeEventListener("change", handleLocalizationChange)
        }
    }, [])

    useEffect(() => {
        if (!props.user) props.navigation.navigate('LoginScreen')
    }, [props.user])

    const handleLocalizationChange = () => {
        setI18nConfig()
        forceUpdate()
    }

    const pickImage = () => {
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
            title: 'Animaloverz camera Permission',
            message: 'Animaloverz needs access to your camera',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
        })
            .then(granted => {
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log('You can use camera')

                    ImagePicker.showImagePicker(options, response => {
                        if (response.didCancel) {
                            console.log('You cancelled image picker')
                        }
                        else if (response.error) {
                            console.log('And error occured: ', response.error)
                        }
                        else {
                            setImgSource(response.uri)
                            setImgPath('file://' + response.path)
                        }
                    })
                }
                else {
                    console.log('camera permission denied')
                }
            })
    }

    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        const paddingToBottom = 20

        let canFetchNext = layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom

        if (canFetchNext && !props.fetching) {
            const progressRate = 12

            setLimit(limit => limit + progressRate)
            props.fetchArticles(limit)
        }
    }

    const onPressButtonLike = () => {
        setLikes(likes => likes + 1)
    }

    const onPressButtonStar = () => {
        setStar(star => !star)
    }

    const onPressButtonShare = () => {
        setShares(shares => shares + 1)

        // if(visible) {
        //     firebase.database().ref('profiles').push({
        //         user: 'DI8s0G32yNY4m217ie02tLzBSL33',
        //         name: '',
        //         gender: '',
        //         birthday: '',
        //         type: 'dog',
        //         active: false,
        //         avatar: 'https://cdn.editorchoice.com/wp-content/uploads/2019/06/dogtilt.jpg'
        //     })
        // }
    }

    const handleLogout = () => {
        props.logout()
    }

    const handleArticleTitleChange = (text) => {
        setArticleTitle(text)
    }

    const handleArticleTextChange = (text) => {
        setArticleText(text)
    }

    const handleArticleClick = () => {
        setPostModalVisible(true)
        setPostType('article')
    }

    const handleImageClick = () => {
        setPostModalVisible(true)
        setPostType('image')
    }

    const handleVideoClick = () => {
        setPostModalVisible(true)
        setPostType('video')
    }

    const handleLinkClick = () => {
        setPostModalVisible(true)
        setPostType('link')
    }

    const postArticle = () => {
        let content

        if (postType === 'article') content = articleText
        else if (postType === 'image') content = imgPath

        props.postArticle(props.activeProfile.uid, articleTitle, content, postType)
        setPostModalVisible(false)
        setArticleText('')
    }

    const switchProfile = (profileId) => {
        props.switchProfile(props.activeProfile.uid, profileId)
        setProfileModalVisible(false)
    }

    return (
        <LinearGradient start={{ x: 0.0, y: 0.1 }} end={{ x: 1.0, y: 1.0 }} colors={['#E7BD00', '#FE7058']}>
            <ScrollView
                keyboardShouldPersistTaps='handled'
                style={{ backgroundColor: 'transparent', width: '100%', height: '100%' }}
                onScroll={({ nativeEvent }) => isCloseToBottom(nativeEvent)}
                scrollEventThrottle={400}
                ListFooterComponent={() => <ActivityIndicator animating />}>

                <Appbar style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={() => setProfileModalVisible(true)}>
                        <Avatar.Image size={40} style={{ marginLeft: 10 }} source={props.activeProfile ? { uri: props.activeProfile.avatar } : null} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleLogout}>
                        <Text>{props.activeProfile ? props.activeProfile.name : null}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => props.navigation.navigate('ChatListScreen')}>
                        <Appbar.Action icon="message" />
                    </TouchableOpacity>
                </Appbar>

                <Modal
                    transparent={true}
                    animationType="fade"
                    visible={profileModalVisible}>
                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000080' }}>
                        <View style={{ width: '80%', height: '50%', backgroundColor: '#fff', padding: 20, borderRadius: 10 }}>
                            <ScrollView >

                                <TouchableOpacity onPress={() => { }}>
                                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
                                        <Avatar.Image size={80} style={{ marginLeft: 10, flex: 1 }} source={require('../../../assets/images/plus.png')} />
                                        <Text style={{ flex: 2 }}>Ajouter profile</Text>
                                    </View>
                                </TouchableOpacity>

                                {
                                    props.user ?

                                        props.user.profiles.map((profile, key) => {
                                            return (
                                                <TouchableOpacity key={key} onPress={() => switchProfile(profile.uid)}>
                                                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
                                                        <Avatar.Image size={80} style={{ marginLeft: 10, flex: 1 }} source={{ uri: profile.avatar }} />
                                                        <Text style={{ flex: 2 }}>{profile.name}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            )
                                        })

                                        : null
                                }

                            </ScrollView>
                        </View>
                    </View>
                </Modal>

                <View style={{ flex: 1, flexDirection: 'row', marginTop: 10, marginBottom: 5 }}>
                    <ScrollView
                        keyboardShouldPersistTaps='handled'
                        style={{ backgroundColor: 'transparent', width: '100%', height: '100%' }}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}>
                        <Avatar.Image size={70} style={{ marginHorizontal: 4 }} source={require('../../../assets/images/plus.png')} />
                        <Avatar.Image size={70} style={{ marginHorizontal: 4 }} source={{ uri: 'https://playjoor.com/assets/avatar/elliot.jpg' }} />
                        <Avatar.Image size={70} style={{ marginHorizontal: 4 }} source={{ uri: 'https://playjoor.com/assets/avatar/eve.png' }} />
                        <Avatar.Image size={70} style={{ marginHorizontal: 4 }} source={{ uri: 'https://playjoor.com/assets/avatar/helen.jpg' }} />
                        <Avatar.Image size={70} style={{ marginHorizontal: 4 }} source={{ uri: 'https://playjoor.com/assets/avatar/jenny.jpg' }} />
                        <Avatar.Image size={70} style={{ marginHorizontal: 4 }} source={{ uri: 'https://playjoor.com/assets/avatar/molly.png' }} />
                        <Avatar.Image size={70} style={{ marginHorizontal: 4 }} source={{ uri: 'https://playjoor.com/assets/avatar/nan.jpg' }} />
                        <Avatar.Image size={70} style={{ marginHorizontal: 4 }} source={{ uri: 'https://playjoor.com/assets/avatar/rachel.png' }} />
                        <Avatar.Image size={70} style={{ marginHorizontal: 4 }} source={{ uri: 'https://playjoor.com/assets/avatar/steve.jpg' }} />
                        <Avatar.Image size={70} style={{ marginHorizontal: 4 }} source={{ uri: 'https://playjoor.com/assets/avatar/mark.png' }} />
                        <Avatar.Image size={70} style={{ marginHorizontal: 4 }} source={{ uri: 'https://playjoor.com/assets/avatar/joe.jpg' }} />
                        <Avatar.Image size={70} style={{ marginHorizontal: 4 }} source={{ uri: 'https://playjoor.com/assets/avatar/stevie.jpg' }} />
                    </ScrollView>
                </View>

                <Card style={styleCard.card}>
                    <Card.Content style={styleCard.cardContent}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Button mode="text" style={{ flex: 1 }} onPress={handleArticleClick}>
                                <Icon name="paper" color="#232323" />
                            </Button>
                            <Button mode="text" style={{ flex: 1 }} onPress={handleImageClick}>
                                <Icon name="images" color="#232323" />
                            </Button>
                            <Button mode="text" style={{ flex: 1 }} onPress={handleVideoClick}>
                                <Icon name="videocam" color="#232323" />
                            </Button>
                            <Button mode="text" style={{ flex: 1 }} onPress={handleLinkClick}>
                                <Icon name="link" color="#232323" />
                            </Button>
                        </View>
                    </Card.Content>
                </Card>

                <Modal
                    transparent={true}
                    animationType="fade"
                    visible={postModalVisible}>
                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000080' }}>
                        <View style={{ width: '90%', height: '60%', backgroundColor: '#fff', padding: 20, borderRadius: 10 }}>
                            <TextInput
                                underlineColorAndroid='transparent'
                                style={[styles.TextInputStyleClass, styles.shadowElement]}
                                value={articleTitle}
                                onChangeText={text => handleArticleTitleChange(text)}
                                placeholder="titre du publication.."
                            />

                            {
                                postType === 'article' ?

                                    <TextInput
                                        multiline
                                        numberOfLines={12}
                                        underlineColorAndroid='transparent'
                                        style={[styles.TextInputStyleClass, styles.shadowElement]}
                                        value={articleText}
                                        onChangeText={text => handleArticleTextChange(text)}
                                    />

                                    : null
                            }

                            {
                                postType === 'image' ?

                                    <View>
                                        <TouchableOpacity onPress={pickImage}>
                                            <View>
                                                <Text>Pick image</Text>
                                            </View>
                                        </TouchableOpacity>

                                        {
                                            imgSource ?

                                                <Image source={{ uri: imgSource }} style={{ width: 250, height: 200 }} />

                                                : null
                                        }

                                    </View>

                                    : null
                            }

                            {
                                postType === 'video' ?

                                    <Text>video</Text>

                                    : null
                            }

                            {
                                postType === 'link' ?

                                    <Text>link</Text>

                                    : null
                            }

                            <LinearGradient
                                start={{ x: 0.0, y: 0.1 }} end={{ x: 1.0, y: 1.0 }}
                                colors={['#E7BD00', '#FE7058']}
                                style={[styles.btnOrange, { marginRight: 5 }, styles.shadowElement]}>

                                <Button
                                    uppercase={false}
                                    mode="text"
                                    onPress={(postArticle)}>
                                    Ajouter article
                            </Button>
                            </LinearGradient>
                        </View>
                    </View>
                </Modal>

                {
                    props.articles.length === 0 && props.fetching ?

                        <View style={{ alignItems: "center", justifyContent: "center", height: height - 50, width: width }}>
                            <View style={{ borderRadius: 30, width: 45, height: 45, backgroundColor: 'white' }}>
                                <Image style={[styleCard.Icon, { width: 50, height: 50 }]} source={require('../../../assets/images/loader.gif')} />
                            </View>
                        </View>

                        :

                        props.articles.map((item, key) => {
                            return (
                                <Card item={item} key={key} style={styleCard.card}>
                                    <Card.Content style={styleCard.cardContent}>

                                        <View style={styleCard.cardContentTop}>
                                            <View style={{ marginRight: 10 }}>
                                                <Avatar.Image size={40} source={{ uri: item.author.avatar }} />
                                            </View>
                                            <View style={{ flex: 1, flexDirection: 'column' }}>
                                                <Text>{item.author.name}</Text>
                                                <Text>{moment(item.createdAt).fromNow()}</Text>
                                                <Text>{item.title}</Text>
                                            </View>
                                        </View>

                                        <View style={styleCard.cardContentCenter}>
                                            <Image source={require('../../../assets/images/post/post.jpg')} style={styleCard.cardContentCenterImage} />
                                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                                <Text style={{ fontWeight: 'bold', paddingRight: 10 }}>
                                                    <Icon style={styleCard.Icon} name="heart" color={'#DF0069'} size={14} />
                                                    {' ' + likes}
                                                </Text>
                                                <Text style={{ fontWeight: 'bold', paddingRight: 10 }}>
                                                    <Icon style={styleCard.Icon} name="share-alt" color={'#009FF2'} size={14} />
                                                    {' ' + shares}
                                                </Text>

                                                {star && <Icon style={styleCard.Icon} name="star" color={'orange'} size={16} />}

                                            </View>

                                            <Text style={{ fontWeight: 'bold' }}> {item.content}</Text>
                                        </View>

                                        <View style={styleCard.cardContentCenterIcons}>
                                            <TouchableOpacity onPress={(e) => onPressButtonLike(e)}>
                                                <View style={styleCard.cardContentCenterIconsBorder}>
                                                    <Icon style={styleCard.Icon} name="heart" color={'#DF0069'} size={30} />
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={(e) => onPressButtonStar(e)}>
                                                <View style={styleCard.cardContentCenterIconsBorder}>
                                                    <Icon style={styleCard.Icon} name="star" color={'orange'} size={30} />
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={(e) => onPressButtonShare(e)}>
                                                <View style={styleCard.cardContentCenterIconsBorder}>
                                                    <Icon style={styleCard.Icon} name="share-alt" color={'#009FF2'} size={30} />
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </Card.Content>
                                </Card>
                            )
                        })
                }

                {
                    props.articles.length > 0 && props.fetching ?

                        <View style={{ alignItems: "center", justifyContent: "center", height: 30, width: width, paddingTop: 22, paddingBottom: 30 }}>
                            <View style={{ borderRadius: 30, width: 45, height: 45, backgroundColor: 'white' }}>
                                <Image style={[styleCard.Icon, { width: 50, height: 50 }]} source={require('../../../assets/images/loader.gif')} />
                            </View>
                        </View>

                        :

                        null
                }
            </ScrollView>
        </LinearGradient>
    )
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        loading: state.auth.loading,
        activeProfile: state.profile.profile,
        fetching: state.article.fetching,
        articles: state.article.articles
    }
}

export default connect(mapStateToProps, { logout, postArticle, fetchArticles, getActiveProfile, switchProfile })(ArticleScreen)