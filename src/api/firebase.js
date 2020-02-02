import firebase from 'react-native-firebase'
//import { catchClause } from '@babel/types'
//import { runCLI } from 'jest-runtime'

var config = {
    apiKey: "AIzaSyCuiAOclq7xMdmPcDA3H8I778vzb8gDspc",
    authDomain: "animaloverz-ad0ff.firebaseapp.com",
    databaseURL: "https://animaloverz-ad0ff.firebaseio.com",
    projectId: "animaloverz-ad0ff",
    storageBucket: "",
    messagingSenderId: "590703787257",
    appId: "1:590703787257:web:b9dd7a78030b79b2",
}

// Initialize Firebase animalovers
firebase.initializeApp(config)

export default firebase
