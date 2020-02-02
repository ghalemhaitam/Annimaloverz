import { PROFILE_FETCHING, PROFILE_SWITCHED } from './types'

import firebase from 'react-native-firebase'

export const getActiveProfile = (userId) => {
    return dispatch => {
        dispatch({ type: PROFILE_FETCHING })

        firebase.database().ref('profiles').on('value', profilesSnap => {
            profilesSnap.forEach(profile => {
                if (profile.val().user === userId && profile.val().active) {
                    const currentProfile = profile.val()
                    currentProfile.uid = profile.key

                    dispatch({ type: PROFILE_SWITCHED, profile: currentProfile })
                }
            })
        })
    }
}

export const switchProfile = (currentProfileId, nextProfileId) => {
    return dispatch => {
        if(currentProfileId === nextProfileId) {
            return
        }
    
        dispatch({ type: PROFILE_FETCHING })

        firebase.database().ref('profiles/' + currentProfileId).update({ active: false })
            .then(() => {
                firebase.database().ref('profiles/' + nextProfileId).update({ active: true })
            })
    }
}
