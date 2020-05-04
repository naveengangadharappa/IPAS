import React from 'react';
import { View,Text,Image,Alert,TouchableHighlight,ImageBackground} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import Spinner from 'react-native-loading-spinner-overlay';
import MenuButton from '../../components/MenuButton/MenuButton';
import {GetworkList,loginstatus,heading,userdetails,setloginstatus,loadmore} from '../../data/ApiCalls';
//import {HomeScreen} from '../Home/HomeScreen';
export default class DrawerContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isdataloaded:false,
    };
  }
  //flag=false;
    callapi =async(options)=>{
      console.log("entering callapi")  
    try{
      this.setState({isdataloaded:true});
      loadmore.status=false;
      loadmore.pgcount=1;
      let result=await GetworkList('','','',options);
      this.setState({isdataloaded:false});
      this.props.navigation.navigate('Home',{heading });
      console.log("navigating to home");
       // navigation.navigate('Home',{heading });
     // navigation.closeDrawer();
    }
    catch(error){
      console.log(error);
    }
    }
    //loadPropsedWork('','','');
  render() {
    
    const { navigation } = this.props;
    if(loginstatus)
    {
      const isDataLoaded  = this.state.isdataloaded;
    if(isDataLoaded){
      console.log("entered loading")
      return (//<AppLoading />
       <View styles={styles.container1}><Spinner
          visible={isDataLoaded}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        /></View>
        )
    }
    return (
      //<ImageBackground source={require('../../../assets/icons/background6.jpg')} style={{width: '100%', height: '100%'}}>
          <View style={styles.content}>
        <View style={styles.container}>
        <View style={styles.Profile}>
          <View style={{flexDirection:"row"}}>
            <Image style={styles.photo} source={require('../../../assets/icons/profile.jpg')} />
            <TouchableHighlight onPress={() => {
              navigation.navigate('Login');
              setloginstatus(false);
              navigation.closeDrawer();
            }}><Image style={[styles.photo,{marginLeft:130}]} source={require('../../../assets/icons/logout.png')}/> 
          </TouchableHighlight>
          </View>
          <Text style={{ padding:4,marginLeft:5}} >User Name : {userdetails.User_Name}</Text>
          <Text style={{ marginBottom:30,marginLeft:5}}>User Designation : {userdetails.Name}</Text>
          
        </View>
          <MenuButton
            title="Alloted Work"
            source={require('../../../assets/icons/category.png')}
            onPress={() => {
              navigation.closeDrawer();
              this.callapi('Alloted_work');
              /*GetworkList('','','','Alloted_work').then((data)=>{
                if(data){
                  navigation.navigate('Home',{heading });
                navigation.closeDrawer();
                }
                else{Alert.alert('invalid response from server');
              }
              }).catch((error)=>{
                console.log(error);
              }) */
              /*this.flag=this.callapi('Alloted_work')
              if(data){navigation.navigate('Home',{heading });
            navigation.closeDrawer();*/}
            }
          />
          <MenuButton
            title="Work Order"
            source={require('../../../assets/icons/category.png')}
            onPress={() => {
              navigation.closeDrawer();
              this.callapi('Workorder_work');
              /*GetworkList('','','','Workorder_work').then((data)=>{
                if(data){
                  navigation.navigate('Home',{heading });
                navigation.closeDrawer();
                }
                else{Alert.alert('invalid response from server');
              }
              }).catch((error)=>{
                console.log(error);
              })*/
            }}
          />
          <MenuButton
            title="Not Started"
            source={require('../../../assets/icons/category.png')}
            onPress={() => {
              navigation.closeDrawer();
              this.callapi('Notstarted_work');
            }}
          />
          <MenuButton
            title="In Progress"
            source={require('../../../assets/icons/category.png')}
            onPress={() => {
              navigation.closeDrawer();
              this.callapi('Inprogress_work');
            }}
          />
          <MenuButton
            title="onHold"
            source={require('../../../assets/icons/category.png')}
            onPress={() => {
              navigation.closeDrawer();
              this.callapi('onHold_work');
              
            }}
          />
          <MenuButton
            title="Cancelled Work"
            source={require('../../../assets/icons/category.png')}
            onPress={() => {
              navigation.closeDrawer();
              this.callapi('Cancelled_work');
                        }}
          />
          <MenuButton
            title="Physically Completed"
            source={require('../../../assets/icons/category.png')}
            onPress={() => {
              navigation.closeDrawer();
              this.callapi('Physically_work');
            }}
          />
          <MenuButton
            title="Financially Completed"
            source={require('../../../assets/icons/category.png')}
            onPress={() => {
              navigation.closeDrawer();
              this.callapi('Financially_work');
            }}
          />
         
          <MenuButton
            title="Upload Offline Saved Work"
            source={require('../../../assets/icons/category.png')}
            onPress={() => {
              navigation.navigate('Home');
              navigation.closeDrawer();
            }}
          />
        </View>
      </View>//</ImageBackground>
    );
  }
  else{
    return(
    <View></View>);
  }
}
}

DrawerContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  })
};
