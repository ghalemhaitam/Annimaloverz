
import React from 'react';
import { Text, View } from 'react-native';
import CardComponent from '../../../Components/CardComponent';

class NotificationsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Notification !</Text>
        <CardComponent />
      </View>
    );
  }
}

export default NotificationsScreen