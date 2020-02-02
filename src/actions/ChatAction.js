import { FETCHING, MESSAGE_RECIVED } from './types';
import firebase from '../api/firebase';

export const sendMessage = (text, user, date) => {
    return dispatch => {
        /* 
        that will help you if you want to use Date Detail but don't do that we  use moment.js he neet date timesone type !

        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        var sec = new Date().getSeconds(); //Current Seconds
        var fullDate = date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec;

        */

        const chatMessage = {
            text,
            author: user,
            date: new Date().toUTCString()
        };

        firebase.database().ref('messages').push(chatMessage);



        // users
        /*
               const profils = [
                               {
                                   type: 'Chien',
                                   gender: 'male',
                                   searchGenre: 'femelle',
                                   articles:[
                                       {
                                           description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                            Duis in tellus ornare, convallis libero et,
                                            malesuada odio. Vivamus congue leo ut congue mattis.`,
                                           date: 'Tue, 27 Aug 2019 10:51:04 GMT',
                                           imageUrl: 'https://www.chien.fr/assets/img/000/083/large/choisir-chien-japonais.jpg',
                                           likes: 0,
                                           shares: 0,
                                       },
                                       {
                                           description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                            Duis in tellus ornare, convallis libero et,
                                            malesuada odio. Vivamus congue leo ut congue mattis.`,
                                           date: 'Wed, 28 Aug 2019 10:51:23 GMT',
                                           imageUrl: 'https://monshiba.fr/wp-content/uploads/2016/04/shiba-inu.jpg',
                                           likes: 0,
                                           shares: 0,
                                       }
                                   ],
                                   stories: [
                                       {
                                           date: 'Tue, 27 Aug 2019 10:55:04 GMT',
                                           imageUrl: 'https://fordogtrainers.fr/images/stories/virtuemart/product/collier-cuir-marron-ou-noir-pour-chien-doberman-humeur-de-fete-s44.jpg'
                                       },
                                       {
                                           date: 'Tue, 27 Aug 2019 10:55:04 GMT',
                                           imageUrl: 'https://fordogtrainers.fr/images/stories/virtuemart/product/collier-cuir-marron-ou-noir-pour-chien-doberman-humeur-de-fete-s44.jpg'
                                       }
                                   ]
                               },
                               {
                                   type: 'Cheval',
                                   gender: 'femelle',
                                   searchGenre: 'male',
                                   articles:[
                                       {
                                           description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                            Duis in tellus ornare, convallis libero et,
                                            malesuada odio. Vivamus congue leo ut congue mattis.`,
                                           date: 'Tue, 27 Aug 2019 10:51:04 GMT',
                                           imageUrl: 'https://www.chien.fr/assets/img/000/083/large/choisir-chien-japonais.jpg',
                                           likes: 0,
                                           shares: 0,
                                       },
                                       {
                                           description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                            Duis in tellus ornare, convallis libero et,
                                            malesuada odio. Vivamus congue leo ut congue mattis.`,
                                           date: 'Wed, 28 Aug 2019 10:51:23 GMT',
                                           imageUrl: 'https://monshiba.fr/wp-content/uploads/2016/04/shiba-inu.jpg',
                                           likes: 0,
                                           shares: 0,
                                       }
                                   ]
                               }
                           ]
               for(var i=0;i<=20;i++){
                   
                   const users = {
                       name:'haitam'+i,
                       lastname: 'ghalem',
                       registerDate: new Date().toUTCString(),
                       username: 'user'+ i +'@gmail.com',
                       password: '123',
                       avatar: 'https://playjoor.com/assets/avatar/matthew.png',
                       gender: 'homme',
                       phone: '0623568956',
                       city: 'Casablanca',
                       counrty: 'Maroc',
                       dateBirthday : '1997/04/05',
                       profils: profils
                   }
                   firebase.database().ref('users')
                                  .push(users);
                         
               }
               
               // conversations
           /*
               const conversations =
                   /*
                   {
                   // convestation 1
                   userIdfirst: '-LnReBRltgTNVDwZNgFS',
                   userFirstProfilId: '0',
                   userIdSecond: '-LnReBRswQidP7ArTlnP',
                   userSecondProfilId: '0',
                   messages: [ 
                       {
                           author: '-LnReBRltgTNVDwZNgFS',
                           text: 'Welcome',
                           date: 'Tue, 27 Aug 2019 10:51:04 GMT'
                       },
                       {
                           author: '-LnReBRswQidP7ArTlnP',
                           text: 'Welcome too',
                           date: 'Wed, 28 Aug 2019 10:51:23 GMT'
                       }
                   ],
                   };
                  
                   
                   {
                   // convestation 2
                   userIdfirst: '-LnReBRyRG37B8uBbwup', 
                   userFirstProfilId: '0',
                   userIdSecond: '-LnReBRltgTNVDwZNgFS',
                   userSecondProfilId: '0',
                   messages: [ 
                       {
                           author: '-LnReBRyRG37B8uBbwup',
                           text: 'Welcome Man',
                           date: 'Tue, 27 Aug 2019 10:56:04 GMT'
                       },
                       {
                           author: '-LnReBRltgTNVDwZNgFS',
                           text: 'Welcome Bro',
                           date: 'Wed, 28 Aug 2019 2:12:23 GMT'
                       }
                   ],
                   };
                   
           
           
               firebase.database().ref('conversations')
                           .push(conversations);
       
               
            */
    }


}

// get Messages
export const fetchMessages = () => {
    return (dispatch) => {
        dispatch({ type: FETCHING })

        firebase.database().ref('messages')
            .orderByKey()
            .limitToLast(30)
            .on('value', (snapshot) => {
                const data = snapshot.val() || []
                handleData(dispatch, data)
            })
    }
}

const handleData = (dispatch, data) => {
    const messages = []
    Object.values(data).forEach(msg => {
        messages.unshift(msg)
    })

    dispatch({ type: MESSAGE_RECIVED, payload: messages })
}