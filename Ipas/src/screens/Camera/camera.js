import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import { render } from 'react-dom';
import {photoArray} from '../../data/ApiCalls';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export default class CameraScreen extends React.Component {
  
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerTitle: ( 
        <Text >IPAS</Text>
      ),
    };
  };
  
constructor(props) {
    super(props);
    }
  CamPermission='granted';
  type=Camera.Constants.Type.back;
  camera=null;
  componentDidMount() {
    this.useEffect()
  }


  useEffect=async() => {
     /* const  status  = await Camera.requestPermissionsAsync();
      //this.setState({hasPermission :'granted'});
     this.CamPermission='granted'*/
     let { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access Camera was denied',
      });
    }
    else{
      this.CamPermission='granted';
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access Camera was denied',
      });
    }
    }
    
    
  };

  snap = async (item) => {
    console.log("Entered to camera capturing");
   try{
    let photo = await this.camera.takePictureAsync();
    workid=item.WorkId;
    /*if(!photoArray.has(workid))// check photos already existing for this work
    {
      //photoArray[workid]=[{"photo_url":photo.uri}];
      photoArray[workid]=[];//create empty array with key workid 

    }*/
   // 
    workid in photoArray ?console.log('photos for this array already existes') :photoArray[workid]=[];
    let picarr=photoArray[workid];
    console.log(picarr);
    picarr.push({photo_url:photo.uri});//push data to json array with work id 
    console.log(photoArray);//console.log(photo);
    let location = await Location.getCurrentPositionAsync({});
    //console.log(location);
    //console.log(item);
    this.props.navigation.navigate('Recipe',{item});
}
catch(Err)
{
console.log(Err)
}
   
  };

  render(){
    const { navigation } = this.props;
    const item = navigation.getParam('item');
    const permission=this.CamPermission;
 
  if (permission === null) {
      console.log("entered null");
    return <View />;
  }
  if (permission === false) {
    console.log("entered false");
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      <Camera 
      style={{ flex: 1 }} 
      type={this.type}
      ref={ref => {
        this.camera = ref;
      }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{
              flex: 0.3,
              alignSelf: 'flex-end',
              alignItems: 'center',
            }}
            onPress={()=>{this.snap(item)}}
            >
            <Text style={{ fontSize: 18, marginBottom: 10,marginLeft:10, color: 'white' }}>Capture</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}
}