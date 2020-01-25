import React from 'react';
import {View,TextInput,StyleSheet,
  Button,
  Text,
  Alert,
  Image } from 'react-native';
import styles from './styles';
import ModalDropdown from 'react-native-modal-dropdown';
import { AppLoading } from 'expo'
import { Districts,GetDistrict,GetLoginStatus,GetPropsedWorkList} from '../../data/ApiCalls';


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
      onloaddata:false
    }
    /*GetDistrict().then((data)=>{
      console.log(data);
    }).catch((err)=>{
      console.log(err)
    });*/
  }

  uname='';
  password='';
  did='';
  onlinestate='online';
  loginstate;

  componentDidMount() {
    this.loaddistrict();
  }

  loaddistrict=async()=>{
    try{
     let result= await GetDistrict()
     this.setState({
      onloaddata:true
     })
    }
    catch(err){
      console.log(err)
    }
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
      GetLoginStatus(this.did,this.uname,this.password).then((loginstatus)=>{
        console.log(loginstatus);
        if(loginstatus){
         /* GetPropsedWorkList('','','','Alloted_work').then((data)=>{
           this.props.navigation.navigate('Home');
          }).catch((error)=>{
            console.log(error);
          })*/
          // GetPropsedWorkList('','','','Alloted_work')
          let heading='Alloted work';
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
      return <AppLoading/>
    }
    if(this.onlinestate==='online'){
      return (
      <View style={styles.container}>
        <Image style={styles.Image} source={require('../../../assets/icons/dpclogo.jpg') }/>
        <Dropdown
        label='Select District'
        selectedItemColor='gray'
        data={Districts}
        onChangeText={( text)=>{this.did=text;}}
      />
        

        <TextInput 
        style={styles.InputBox} 
        placeholder='User-Id'
        onChangeText={( text)=>{this.uname=text;}}
        value={( text)=>{this.uname=text;}}
      />

      <TextInput secureTextEntry={true}  
        style={styles.InputBox} 
        placeholder='Password'
        onChangeText={( text)=>{this.password=text;}}
        value={( text)=>{this.password=text;}}
      />
    
      <Button
        style={styles.button}
        title="Login"
        onPress={this.login}
      />
      </View>
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
