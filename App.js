/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,AsyncStorage,
  StyleSheet,
  Text,
  View
} from 'react-native';
import OneSignal from 'react-native-onesignal';
import Index from "./src/InitialIndex";
global.name="";
global.grupo="";
global.grado="";
global.foto="";
global.token="";
global.idgrupo ="";

export default class App extends Component {
  componentWillMount() {
    //OneSignal.init("YOUR_ONESIGNAL_APPID");
    
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
}

componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
}

onReceived(notification) {
    console.log("Notification received: ", notification);
}

onOpened(openResult) {
  console.log('Message: ', openResult.notification.payload.body);
  console.log('Data: ', openResult.notification.payload.additionalData);
  console.log('isActive: ', openResult.notification.isAppInFocus);
  console.log('openResult: ', openResult);
}

onIds(device) {
console.log('Device info: ', device);
global.token = device.userId;
}
getData = async ()=>{
  global.name = await AsyncStorage.getItem("name");
  global.grado = await AsyncStorage.getItem("grado");
  global.grupo = await AsyncStorage.getItem("grupo");
  global.idgrupo = await AsyncStorage.getItem("grupoToken");
}
componentDidMount(){
  this.getData();
}
render() {
  return (
      <Index />
  );
}
}

