import { StyleSheet } from 'react-native'

module.exports = StyleSheet.create({
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
