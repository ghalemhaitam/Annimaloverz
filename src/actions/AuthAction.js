import { LOGIN_ATTEMPT, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT_ATTEMPT, LOGOUT_SUCCESS, LOGOUT_FAILED } from './types'

import firebase from 'react-native-firebase'

export const authHandler = () => {
    return dispatch => {
        firebase.auth().onAuthStateChanged(user => {
            dispatch({ type: LOGIN_ATTEMPT })
            if (!user) {
                return dispatch({ type: LOGOUT_SUCCESS })
            }

            getUserProfiles(user.uid).then(profiles => {
                user.profiles = profiles

                dispatch({ type: LOGIN_SUCCESS, user })
            })
        })
    }
}

export const login = (email, password) => {
    return dispatch => {
        dispatch({ type: LOGIN_ATTEMPT })
        firebase.auth().signInWithEmailAndPassword(email, password)
            .catch(error => dispatch({ type: LOGIN_FAILED, error: error.message }))
    }
}

export const logout = () => {
    return dispatch => {
        dispatch({ type: LOGOUT_ATTEMPT })
        firebase.auth().signOut()
            .catch(error => dispatch({ type: LOGOUT_FAILED, error: error.message }))
    }
}

// Fetch profiles of a given user
const getUserProfiles = userId => {
    return new Promise((resolve, reject) => {
        firebase.database().ref('profiles').orderByChild('user').equalTo(userId).once('value', profilesSnap => {
            const profilesArray = []

            profilesSnap.forEach(profile => {
                const currentProfile = profile.val()
                currentProfile.uid = profile.key

                profilesArray.push(currentProfile)
            })

            resolve(profilesArray)
        })
    })
}
