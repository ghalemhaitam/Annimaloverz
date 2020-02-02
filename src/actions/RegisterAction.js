import { REGISTER_ATTEMPT, REGISTER_SUCCESS, REGISTER_FAILED } from './types'

import firebase from 'react-native-firebase'

export const register = (firstname, lastname, email, password, passwordConf) => {
    return dispatch => {
        dispatch({ type: REGISTER_ATTEMPT })

        // Check if passwords match
        if (password !== passwordConf) {
            return dispatch({ type: REGISTER_FAILED, error: 'passwords do not match' })
        }

        // Create new user
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(response => {
                response.user.updateEmail(email)

                createHumanProfile(response.user.uid, firstname, lastname)
                    .then(() => dispatch({ type: REGISTER_SUCCESS }))
            })
            .catch(error => dispatch({ type: REGISTER_FAILED, error: error.message }))
    }
}

const createHumanProfile = (userId, firstname, lastname) => {
    return new Promise((resolve, reject) => {
        const humanProfile = {
            user: userId,
            name: firstname + ' ' + lastname,
            gender: '',
            birthday: '',
            type: 'human',
            active: true,
            avatar: 'https://playjoor.com/assets/avatar/default-avatar.png'
        }

        firebase.database().ref('profiles').push(humanProfile)
            .then(() => resolve(humanProfile))
    })
}
