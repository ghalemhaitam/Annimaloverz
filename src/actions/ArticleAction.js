import { FETCHING, ARTICLES_FETCHED } from './types'

import firebase from 'react-native-firebase'

export const postArticle = (profileId, title, content, type) => {
    return dispatch => {
        const article = {
            author: profileId,
            type,
            title,
            content,
            createdAt: new Date().toUTCString()
        }

        if (type === 'image') {
            firebase.storage().ref('images/').putFile(decodeURI(content))
                .then(fileSnap => console.log('uploaded successfully'))
                .catch(error => console.log(error))
        }

        firebase.database().ref('articles').push(article)
    }
}

export const fetchArticles = limit => {
    return dispatch => {
        dispatch({ type: FETCHING })

        firebase.database().ref('articles').orderByValue().limitToLast(limit).on('value', articlesSnapshot => {

            const promises = []
            const articles = []

            articlesSnapshot.forEach(article => {
                const currentArticle = article.val()

                promises.push(firebase.database().ref('profiles/' + currentArticle.author).once('value', profileSnap => {
                    const profile = profileSnap.val()

                    currentArticle.author = profile
                    articles.unshift(currentArticle)
                }))
            })

            Promise.all(promises)
                .then(() => {
                    articles.sort((a, b) => a.uid - b.uid)
                    console.log("articles: ", articles)
                    dispatch({ type: ARTICLES_FETCHED, payload: articles })
                })
        })
    }
}
