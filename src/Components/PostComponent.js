import React, { useState, useEffect } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Text, Avatar, Button, Card, Title, Paragraph } from 'react-native-paper'
import { Image } from 'react-native-elements'
import Icon from 'react-native-ionicons'

export default function PostComponent(props) {
    // State
    const [likes, setLikes] = useState(0)
    const [star, setStar] = useState(false)
    const [shares, setShares] = useState(0)

    useEffect(() => {

    })

    // Render
    return (
        <Card style={{ margin: 8, borderRadius: 5, elevation: 5 }}>

            <Card.Content style={{ flexDirection: 'row', marginBottom: 10 }}>
                <Avatar.Image style={{ marginRight: 20 }} size={50} source={{ uri: 'https://playjoor.com/assets/avatar/elliot.jpg' }} />

                <View style={{ flexDirection: 'column' }}>
                    <Title>Card title</Title>
                    <Text>5 minutes ago</Text>
                </View>
            </Card.Content>

            <Card.Cover source={require('../assets/images/post/post.jpg')} />

            <View style={{ flex: 1, flexDirection: 'row' }}>
                <Text style={{ fontWeight: 'bold', paddingRight: 10 }}>
                    <Icon name="heart" color={'#DF0069'} size={14} />
                    {likes}
                </Text>
                <Text style={{ fontWeight: 'bold', paddingRight: 10 }}>
                    <Icon name="share-alt" color={'#009FF2'} size={14} />
                    {shares}
                </Text>

                {star && <Icon name="star" color={'orange'} size={16} />}
            </View>

            <Card.Actions style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 10 }}>
                <TouchableOpacity style={{ elevation: 7, marginHorizontal: 10, borderRadius: 50, width: 60, height: 60, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }} onPress={() => setLikes(likes + 1)}>
                    <View>
                        <Icon name="heart" color={'#DF0069'} size={40} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={{ elevation: 7, marginHorizontal: 10, borderRadius: 50, width: 60, height: 60, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }} onPress={() => setStar(!star)}>
                    <View>
                        <Icon name="star" color={'orange'} size={40} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={{ elevation: 7, marginHorizontal: 10, borderRadius: 50, width: 60, height: 60, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }} onPress={() => setShares(shares + 1)}>
                    <View>
                        <Icon name="share-alt" color={'#009FF2'} size={40} />
                    </View>
                </TouchableOpacity>
            </Card.Actions>

        </Card>

        // <Card style={styleCard.card}>
        //     <Card.Content style={styleCard.cardContent}>

        //         <View style={styleCard.cardContentTop}>
        //             <View style={{ marginRight: 10 }}>
        //                 <Avatar.Image size={35} source={{ uri: 'https://playjoor.com/assets/avatar/elliot.jpg' }} />
        //             </View>
        //             <View style={{ flex: 1, flexDirection: 'column' }}>
        //                 <Text>ayoub benabid</Text>
        //                 <Text>5 minutes ago</Text>
        //             </View>
        //         </View>

        //         <View style={styleCard.cardContentCenter}>
        //                 <Image source={require('../assets/images/post/post.jpg')} style={styleCard.cardContentCenterImage} />
        //                 <View style={{ flex: 1, flexDirection: 'row' }}>
        //                     <Text style={{ fontWeight: 'bold', paddingRight: 10 }}>
        //                         <Icon style={styleCard.Icon} name="heart" color={'#DF0069'} size={14} />
        //                         {likes}
        //                     </Text>
        //                     <Text style={{ fontWeight: 'bold', paddingRight: 10 }}>
        //                         <Icon style={styleCard.Icon} name="share-alt" color={'#009FF2'} size={14} />
        //                         {shares}
        //                     </Text>

        //                     {star && <Icon style={styleCard.Icon} name="star" color={'orange'} size={16} />}

        //                 </View>

        //                 <Paragraph>
        //                     <Text style={{ fontWeight: 'bold' }}>lorem ipsum dolor sit amet</Text>
        //                     description of the lorem ipsum dolor sit amet
        //                 </Paragraph>
        //             </View>

        //             <View style={styleCard.cardContentCenterIcons}>
        //                 <TouchableOpacity onPress={(e) => setLikes(likes + 1)}>
        //                     <View style={styleCard.cardContentCenterIconsBorder}>
        //                         <Icon style={styleCard.Icon} name="heart" color={'#DF0069'} size={30} />
        //                     </View>
        //                 </TouchableOpacity>
        //                 <TouchableOpacity onPress={(e) => setStar(!star)}>
        //                     <View style={styleCard.cardContentCenterIconsBorder}>
        //                         <Icon style={styleCard.Icon} name="star" color={'orange'} size={30} />
        //                     </View>
        //                 </TouchableOpacity>
        //                 <TouchableOpacity onPress={(e) => setShares(shares + 1)}>
        //                     <View style={styleCard.cardContentCenterIconsBorder}>
        //                         <Icon style={styleCard.Icon} name="share-alt" color={'#009FF2'} size={30} />
        //                     </View>
        //                 </TouchableOpacity>
        //             </View>

        //     </Card.Content>
        // </Card>
    )
}

const styleCard = StyleSheet.create({
    card: {
        marginTop: 6,
        marginBottom: 8,
        marginHorizontal: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.8,
        elevation: 7,
        borderRadius: 7
    },
    cardContent: {
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    cardContentTop: {
        margin: 0,
        padding: 0,
        width: '100%',
        height: 20,
        flex: 1,
        flexDirection: 'row'
    },
    cardContentCenter: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 25,
    },
    cardContentCenterImage: {
        width: null,
        height: 250,
        borderRadius: 7,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.8,
    },
    cardContentCenterIcons: {
        flex: 1,
        flexDirection: 'row',
        marginVertical: 10,
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
    },
    cardContentCenterIconsBorder: {
        borderRadius: 50,
        width: 50,
        height: 50,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 10,
    }
})