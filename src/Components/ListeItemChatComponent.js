import React from 'react';
import { 
     Appbar, Avatar, List, Text
  } from 'react-native-paper';
  import {
    StackNavigator,
  } from 'react-navigation';
import {TouchableScale, TouchableOpacity, View, Dimensions} from 'react-native'
import { Image, ListItem } from 'react-native-elements';
import Icon from 'react-native-ionicons';
import { getNewsFromApiPage } from '../api/newsapi';
import ChatConversationScreen from '../screens/App/Chat/ChatListScreen'

const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);


var styles = require('../assets/css/button');
var stylesChat = require('../assets/css/chat/ChatList');

class ListeItemChatComponent extends React.Component {

  /* Start Code For i18n */ 
  static navigationOptions = {
    title: 'Conversations'
  };
  
  constructor(props) {
    super(props);
    this.state = { 
      conversations: [],
      loadingList: false,
      page: 1,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
    };
    isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
      const paddingToBottom = 20;
      this.setState({ loadingList: false })
    
      return layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom;
    };
    //Scroll Bottom View
    enableSomeButton = async ()=>{
      try {
        
      this.setState(state => ({ 
        page: state.page + 1,
      }));
      getNewsFromApiPage(this.state.page).then(data => this.setState(state=>({ news:[ ...state.conversations, ...data.articles ] })));
      

    } catch(err) {
      console.log("Error fetching data-----------", err);
    }
  }

  };
  
  handleLocalizationChange
  componentDidMount() {
   
    //Have a try and catch block for catching errors.
    try {
      //Assign the promise unresolved first then get the data using the json method. 
      getNewsFromApiPage(this.state.page).then(data => this.setState({ conversations: data.articles }));
      

    } catch(err) {
      console.log("Error fetching data-----------", err);
    }
  };
 
  componentWillUnmount() {
    this.setState({ loadingList: false })
  };
  
  /* End Code For i18n */ 


  render() {
    //const  navigate  = this.props.navigation;
    return (  
      
      <TouchableOpacity onPress={this.props.onPress} latitude={this.props}>
        <ListItem
            containerStyle={stylesChat.itemChat}
            Component={TouchableScale}
            title={this.props.name}
            style={stylesChat.itemChat}
            //right={ props => <Text style={{ paddingTop:"4%", marginRight:10 }}>{this.props.time}</Text> }
            //left={ props => <Avatar.Image size={40} style={[stylesChat.avatarItem ,{marginLeft:10}]} source={require('../assets/images/avatar.png')} /> }

            leftAvatar={{
              source:require('../assets/images/avatar.png') ,
              title: "ok",  
            }}
            
            subtitle={this.props.message}
            rightElement={
                <View style={stylesChat.rightItem}>
                 <Text>{this.props.time}</Text>
                  <Icon  name="arrow-dropright" color={'black'} size={14} />
                </View>
            }
        />
        </TouchableOpacity> 
   );
  }
}


export default ListeItemChatComponent
