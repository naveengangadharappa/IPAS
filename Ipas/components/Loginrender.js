import React , { useState } from 'react';
import { Icon } from 'react-native-elements';
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert,
  TextInput,
  Modal,
} from 'react-native';
import Constants from 'expo-constants';
import ModalDropdown from 'react-native-modal-dropdown';
import {RenderDashboard} from './components/dashboard.js'; 



let online='true';
let LoginStatus='false';
let Message='';
let UserDistrictId='';

  function Separator() {
    return <View style={styles.separator} />;
  }
  

const dnames=[];
const dids=[];
function GetDistrict(){
  return new Promise((resolve,reject)=>{
    fetch('http://projects.teamgrowth.net/iPAS-District-Portal-Testing/APIs/GetAllDistricts')
      .then((response) => response.json())
      .then((responseJson) => {
        resolve(responseJson.Data);  
    }).catch((error) =>{
        console.error(error);
        reject(error);
      });
    });         
  }

  function SetDistrict()
  {
    const didHandler=( text)=>{
      UserDistrictId= text;
      console.log( UserDistrictId);
      }
     GetDistrict().then((district)=>{
       for (var i=0;i<district.length;i++)
       {
        dnames[i]=district[i].name;
        dids[i]=district[i].id;
       }
    }).catch((error)=>{
      console.log(error);
    });
    return(
    <ModalDropdown
      dropdownTextStyle={styles.Options} 
      style={styles.selectBox}
      defaultValue='Please Select District'
      animated ={ true}
      options={dnames} 
      onSelect={didHandler}/>)

  }
  
//login view   
  function Getloginview()
  {
    const [uname,setuname] = useState([]);
    const [password,setpassword] = useState();

    const unameHandler=( text)=>{
    setuname(text);
    }
  // Advanced function syntax simlar to function passwordhandler(){}
    const passwordHandler=( text)=>{
    setpassword(text);
    }

//check device is offline ar online

function login()
{
  LoginLogic(uname,password)
  setuname('');
  setpassword('');
}
  if(online==='true')
  { 
    return (
    <View  style={styles.container}>
      <SetDistrict/>
      <TextInput 
        style={styles.InputBox} 
        placeholder='User-Id'
        onChangeText={unameHandler}
        value={uname}
      />

      <TextInput secureTextEntry={true}  
        style={styles.InputBox} 
        placeholder='Password'
        onChangeText={passwordHandler}
        value={password}
      />
    
      <Button
        style={styles.button}
        title="Login"
        onPress={login}
      />
    </View>
    ); 
  }
  else{
    return (
      <View style={styles.container} >
        <Text>You Are Offline!!</Text>
        <Separator></Separator>
        <Button
        title='Upload Work Offline'/>
      </View>
      );
    }
  }

//Login Data retrival through api call

  function LoginCall(uname,password)
  {
    return new Promise((resolve,reject)=>{
      fetch('http://projects.teamgrowth.net/iPAS-District-Portal-Testing/APIs/Login',{
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          UserName:uname,
          Password:password,
          did:UserDistrictId,
        }),
        })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log("Login data Retrived");
          resolve(responseJson);  
        }).catch((error) =>{
          console.error(error);
          reject(error);
        });
    });
  }

  ///Login Action from from Front end

  function LoginLogic(uname,password)
  {
    LoginCall(uname,password).then((loginjson)=>{
      LoginStatus=loginjson.Status;
      Message=loginjson.Message; 
    }).catch((error)=>{
      console.log(error);
    });
    switch(LoginStatus)
    {
      case 'true': return (Alert.alert("Login Successfull."));
        break;
      case 'false':
        if(Message=='User is already login.')
        {
          return (ALert.alert(Message));  
        }
        else{
          return (Alert.alert('InValid Login Credintials'));
        }
        break;
      default : return (Alert.alert("Invalid Login"));
       break;
    }
    /*if(LoginStatus=='true' || Message=='User is already login.')
    {
      LoginStatus='';
      Message='';
      return (Alert.alert("Login Successfull"));
    }
    else{
     return (Alert.alert("Invalid Login")) ;
    }*/
  }


  // Styling part

  const styles = StyleSheet.create({
    container: {
      flex:4,
      padding:40,
      justifyContent:'center',
    },
    title: {
      textAlign: 'center',
      marginVertical: 8,
    },
    InputBox: {
      textAlign: 'left',
      //marginVertical: 8,
      borderBottomColor: '#737373',
      borderColor:'#737373',
      borderBottomWidth: 1,
      paddingTop:20,
      paddingBottom:5,
      marginBottom:10,
    },
    separator: {
      marginVertical: 8,
      borderBottomColor: '#737373',
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    selectBox:{
      padding: 10 ,
      height: 40,
      borderBottomWidth: 1,
    },
    Options:{
      padding: 5 ,
      height: 55,
      width:250,
      fontSize:14
    },
    button:{
      padding: 10 ,
      height: 40,
      borderColor: 'gray',
      borderBottomWidth: 1, 
    }
  });   


  export {Getloginview,SetDistrict};