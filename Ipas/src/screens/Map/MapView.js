import React from 'react';
import MenuImage from '../../components/MenuImage/MenuImage';
import { Platform, Text, View,Image,TouchableHighlight } from 'react-native';
import Constants from 'expo-constants';
import styles from './styles';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapView from 'react-native-maps';
import Marker from 'react-native-maps';
import { getDistance } from 'geolib';
import MapViewDirections from 'react-native-maps-directions';
//import {_getLocationAsync} from '../../data/ApiCalls';
import {workList,heading} from '../../data/ApiCalls';

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
        title: workList[0].WorkId,
        desc: workList[0].Details.Data.Work_Title,
        coordinates: {
          latitude: 19.9800603,
          longitude:73.7472607, 
        },
      },
      {
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
      }]
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
    this.props.navigation.navigate('Recipe', { item });
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
    item={
      WorkId:mark.title,
      Details:{
        Data:{
          Work_Title:mark.desc
        }
      },
    }
    console.log('This is coordinates informations');
    console.log(item);
    //this.props.navigation.navigate('Home'/*, { cords }*/);
    this.props.navigation.navigate('Recipe', { item });
  }
  render() {
    let GOOGLE_MAPS_APIKEY = 'AIzaSyCaUgJsLzvda41opRbMVIFIcNqnWQRAUQA';
    let text = 'Waiting..';
    let long;
    let lat;
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      let loc=this.state.location;
      
      long=parseFloat(JSON.stringify(loc.coords.longitude));//current loction longitude
      lat=parseFloat(JSON.stringify(loc.coords.latitude));//current location latitude
      console.log("orignal coords  "+loc.coords.latitude);
      console.log(lat);
     /* this.state.markers[0].coordinates.latitude=lat;
      this.state.markers[0].coordinates.longitude=long;*/
      console.log(this.state.markers[0].coordinates.latitude)
      let i=0;
      this.state.markers.map(mark => {
      let distance=getDistance(mark.coordinates, {
        latitude: lat,
        longitude: long,
    });
    console.log(distance);
     
    if(distance<2000)
    {
      this.state.sortedmarkers[i++]=mark;
    }
    });
    }
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.paragraph}>{text}</Text>
        </View>
        <MapView
        style={styles.map}
        minZoomLevel={1}
        initialRegion={{
            latitude: lat,
            longitude: long,
            latitudeDelta:1,
            longitudeDelta:1,
          }}
        showsUserLocation={true} >
        {this.state.sortedmarkers.map(mark => {
         let newtitle=mark.title.toString();
              return <MapView.Marker
              id={1}
              title={newtitle}//this should be work id
              description={mark.desc}//this should be work tyitle
              coordinate={{
                latitude: mark.coordinates.latitude,
                longitude: mark.coordinates.longitude,
              }}
              showsUserLocation={true}
              onPress={(/*markerId*/) => {/*this.setState({selectedMarker: markerId})  this markerId gives detail information about selected co-ordinates */this.handleMarkerPress(mark)}}//work id  should be passede to this handleMarker func
              />
              })} 
               
        </MapView>
      </View>  
    );
  }
}
