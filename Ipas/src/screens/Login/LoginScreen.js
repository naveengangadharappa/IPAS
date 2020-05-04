import React from 'react';
import {View,StyleSheet,
  Button,
  Text,
  Alert,
  Image,
  ImageBackground,
  KeyboardAvoidingView } from 'react-native';
import styles from './styles';
import { AppLoading } from 'expo'
import { Districts,district,GetDistrict,GetLoginStatus} from '../../data/ApiCalls';
import { Dropdown } from 'react-native-material-dropdown';
import {
  TextField,
} from 'react-native-material-textfield';
import PasswordInputText from 'react-native-hide-show-password-input';
import Spinner from 'react-native-loading-spinner-overlay';
import KeyboardResponsiveView from 'react-native-keyboard-responsive-view';


export default class LoginScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'IPAS',
    headerRight: (
      <Text style={styles.Heading}>Integrated Planning Automation System</Text>
    ),
  });


  constructor(props) {
    super(props);
    this.state={
      onloaddata:false,
      password: '',
      uname: '',
    }
   
  }

  did='';
  onlinestate='online';
  loginstate;

  componentDidMount() {
    this.loaddistrict();
  }

  loaddistrict=async()=>{
    try{
     let result= await GetDistrict()
     console.log(result);
     this.setState({
      onloaddata:true
     })
    }
    catch(err){
      console.log(err)
    }
  }

  finddid=(dist)=>{
    district.map(item=>{
      if(item.name==dist){
       this.did=item.id
      }
     });
  }

  login=()=>{
    if(this.did===''){
      Alert.alert('Please Select district');
    }
    else if(this.uname==='' || this.password===''){
      Alert.alert('Please Provide User-Id and Password !!');
    }
    else{
      console.log(this.did);
      GetLoginStatus(this.did,this.state.uname,this.state.password).then((loginstatus)=>{
        console.log(loginstatus);
        if(loginstatus){
          this.setState({uname:"",password:""});
          let heading='Alloted_work';
          this.props.navigation.navigate('Home',{heading});
      }
      else{
        Alert.alert('Invalid Login Credientials ? Please verifiy !!');
      }
      }).catch((error)=>{
        console.log(error);
      })
    }
    
  }
  
  render() {
    const loadData=this.state.onloaddata
    if(!loadData)
    {
      return (<View styles={styles.container1}><Spinner
        //visibility of Overlay Loading Spinner
        visible={!loadData}
        //Text with the Spinner 
        textContent={'Loading...'}
        //Text style of the Spinner Text
        textStyle={styles.spinnerTextStyle}
      /></View>)
    }
    if(this.onlinestate==='online'){
      return (
       // <ImageBackground source={require('../../../assets/icons/background6.jpg')} style={{width: '100%', height: '100%'}}>
  <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
      <View  style={styles.container2}>
        <Image style={styles.Image} source={require('../../../assets/icons/dpclogo.jpg') }/>
        <Dropdown
        label='Select District'
        textColor='rgba(0, 0, 0, .38)'
        itemColor='rgba(0, 0, 0, .54)'
        baseColor='rgba(0, 0, 0, .87)'
        data={Districts}
        onChangeText={( text)=>this.finddid(text)}
      />
        
        <TextField
        label='User-ID'
        value={this.state.uname}
        onChangeText={( uname)=>this.setState({ uname })}
      />
       
      <PasswordInputText
        value={this.state.password}
        onChangeText={ (password) => this.setState({ password }) }
      /> 
    
      <Button
        style={styles.button}
        title="Login"
        onPress={this.login}
      />
      </View>
      </KeyboardAvoidingView>
      //</ImageBackground>
    );
  }
  else{
    return (
      <View style={styles.container} >
        <Text>You Are Offline!!</Text>
        <Button
        title='Upload Work Offline'/>
      </View>
      );
  }  
  }
}
