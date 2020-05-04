import React from 'react';
import MenuImage from '../../components/MenuImage/MenuImage';
import { Platform, Text, View,Image,TouchableHighlight,Alert } from 'react-native';
import Constants from 'expo-constants';
import styles from './styles';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapView from 'react-native-maps';
import Marker from 'react-native-maps';
import { getDistance } from 'geolib';
import MapViewDirections from 'react-native-maps-directions';
//import {_getLocationAsync} from '../../data/ApiCalls';
import {workdetails,heading} from '../../data/ApiCalls';
import { Work } from '../../data/dataArrays';

export default class MapViews extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerTitle: ( 
        <Text style={styles.Heading}>IPAS</Text>
      ),
      headerRight: (
        <MenuImage
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      ) 
    };
  };
  state = {
    location: null,
    errorMessage: null,
    latitude: null,
    longitude: null,
    sortedmarkers: [{
      title: '',
      desc: '',
      coordinates: {
        latitude: 0,
        longitude:0, 
      }, 
    }],
    markers: [/*{
      title: 'my current loaction',
      desc: 'tracking my live location',
      coordinates: {
        latitude: 0,
        longitude:0, 
      },
    },*/
      {
        title: workdetails.WorkId,
        desc: workdetails.Work_Title,
        coordinates: {
          latitude: (workdetails.Latitude=='')?19.9322:workdetails.Latitude,
          longitude:(workdetails.Longitude==''),73.5307:workdetails.Longitude,
        },
      },
     /* {
        title: workList[1].WorkId,
        desc: workList[1].Details.Data.Work_Title,
        coordinates: {
          latitude: 19.9322,
          longitude:73.5307, 
        },
      },
      {
        title: workList[2].WorkId,
        desc: workList[2].Details.Data.Work_Title,
        coordinates: {
          latitude: 19.9962012,
          longitude:73.7470148, 
        },
      }*/]
  };

  constructor(props) {
    super(props);
  }

   

  componentDidMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
        this.setState({
          errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
        });
      } else {
        this._getLocationAsync();
      }
    }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }
    let location = await Location.getCurrentPositionAsync({});//get current loction coordinates
    this.setState({ location });
  };
  
  onPressRecipe = item => {
    this.props.navigation.navigate('workdetails', { item });
  };

  getInitialState() {
      console.log(this.state.location);
      loc=this.state.location;
    return {
      region: {
        latitude: loc.latitude,
        longitude: loc.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    };
  }

  onRegionChange(region) {
    this.setState({ region });
  }

  handleMarkerPress=(mark)=>{
    /*item={
      WorkId:mark.title,
      Details:{
        Data:{
          Work_Title:mark.desc
        }
      },
    }*/
    console.log('This is coordinates informations');
    console.log(item);
    //this.props.navigation.navigate('Home'/*, { cords }*/);
   // this.props.navigation.navigate('Recipe', { item });
  }
  render() {
    let text = 'Waiting..';
    let long=73.5307;
    let lat=19.9322;
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      let loc=this.state.location;
    }
    const { navigation } = this.props;
    const options=navigation.getParam('options');
    if(workdetails.Latitude==null||workdetails.Longitude==null)
    {
      Alert.alert("Work Location not found ?? Please check Longitude or latitude available for this work");
      return (
        <View style={styles.container}>
          <View>
            <Text style={styles.paragraph}>{text}</Text>
          </View>
          <MapView
          ref={MapView => (this.MapView = MapView)}
          style={styles.map}
          minZoomLevel={1}
          initialRegion={{
              latitude: lat,
              longitude: long,
              latitudeDelta:1,
              longitudeDelta:1,
            }}
            loadingEnabled = {true}
           loadingIndicatorColor="#666666"
           loadingBackgroundColor="#eeeeee"
           moveOnMarkerPress = {false}
           showsUserLocation={true}
           showsCompass={true}
           showsPointsOfInterest = {false}
           provider="google">
            
           </MapView>
         </View>  
      );
    }else{
       return (
        <View style={styles.container}>
          <View>
            <Text style={styles.paragraph}>{text}</Text>
          </View>
          <MapView
          ref={MapView => (this.MapView = MapView)}
          style={styles.map}
          minZoomLevel={1}
          initialRegion={{
              latitude: lat,
              longitude: long,
              latitudeDelta:1,
              longitudeDelta:1,
            }}
            loadingEnabled = {true}
           loadingIndicatorColor="#666666"
           loadingBackgroundColor="#eeeeee"
           moveOnMarkerPress = {false}
           showsUserLocation={true}
           showsCompass={true}
           showsPointsOfInterest = {false}
           provider="google">
             <MapView.Marker
                title={workdetails.WorkId.toString()}//this should be work id
                description={workdetails.Work_Title}//this should be work tyitle
                coordinate={{
                  latitude: workdetails.Latitude,//item.Latitude,
                  longitude:workdetails.Longitude //item.Longitude,
                }}
                /> 
           </MapView>
         </View>  
      );
    } 
  }
}

