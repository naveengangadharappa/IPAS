import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity,Alert } from 'react-native';
import { Camera } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import { render } from 'react-dom';
import {photoArray} from '../../data/ApiCalls';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import {workdetails,piccaptured,trackphoto} from '../../data/ApiCalls';

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

  snap = async (options) => {
    console.log("Entered to camera capturing");
   try{
    let workid=workdetails.WorkId;
    //let piccount=0;
    let addtrackphoto=true;
    trackphoto.map(pic=>{
      if(pic.workid==workid){
        pic.count=pic.count+1;
        addtrackphoto=false
      }
    })
    console.log("addtrackphoto ="+addtrackphoto);
    if(addtrackphoto){
      trackphoto.push({"workid":workid,"count":1}); 
    }
    //trackphoto.push({"workid":workid,"count":piccount+1});
    piccaptured.status=true;
    workid in photoArray ?console.log('photos for this array already existes') :photoArray[workid]=[];
    let picarr=photoArray[workid];
    if(options=='Alloted_work'||options=='Inprogress_work')
    {
      if(picarr.length>=4)
      {
        Alert.alert("Maximum only 4 images are allowed to submit ?");
      }else{
        let photo = await this.camera.takePictureAsync({quality: 0.4,base64:true});
        let location = await Location.getCurrentPositionAsync({});
        picarr.push({photo_url:photo.uri,Longitude:location.coords.longitude,Latitude:location.coords.latitude});//push data to json array with work id 
      }
    }else{
      console.log("entered 1 pic")
      if(picarr.length>=1)
      {
        Alert.alert("only one image can be submited");
      }else{
        let photo = await this.camera.takePictureAsync({quality: 0.4,base64:true});
        let location = await Location.getCurrentPositionAsync({});
        picarr.push({photo_url:photo.uri,Longitude:location.coords.longitude,Latitude:location.coords.latitude});//push data to json array with work id 
      }
    }
       
    //console.log(photo);
    
    //console.log(item);
    this.props.navigation.navigate('workupload',{options});
}
catch(Err)
{
console.log(Err)
}
   
  };

  render(){
    const { navigation } = this.props;
    const options = navigation.getParam('options');
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
            onPress={()=>{this.snap(options)}}
            >
            <Text style={{ fontSize: 18, marginBottom: 10,marginLeft:10, color: 'white' }}>Capture</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}
}