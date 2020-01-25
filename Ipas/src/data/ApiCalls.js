import React from 'react';
import { AsyncStorage } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import {Work} from './dataArrays';
//export let photoArray=[];
export let photoArray={};
let Did=0;
export const Urls ={
  getDistrict:'http://ipas.esdsconnect.com/iPAS-WebAPI/APIs/GetAllDistricts',
  getLogin:'http://ipas.esdsconnect.com/iPAS-WebAPI/APIs/Login',
  getpropsedwork:'http://ipas.esdsconnect.com/iPAS-WebAPI/APIs/ListProposedWorks',
}
export const Districts = [];
export const workList=[];
let heading;
let loginstatus=false;
export function GetDistrict(){
  return new Promise((resolve,reject)=>{
    fetch(Urls.getDistrict)
    .then((response) => response.json())
    .then((responseJson) => {
      let i=0;
      responseJson.Data.map(item=>{
       // Districts[i]=item.name;
       let id=item.id;
       Districts.push({id:item.name});
        i++;
      });

      resolve("District retrivee succesfully");   
  }).catch((error) =>{
      console.error(error);
      reject(error);
    });
  });        
    }

    export function GetLoginStatus(DID,uname,password){
      Did=DID;
        return new Promise((resolve,reject)=>{
            fetch(Urls.getLogin,{
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                UserName:uname,
                Password:password,
                did:DID,
              }),
              })
              .then((response) => response.json())
              .then((responseJson) => {
                console.log("Login data Retrived");
                resolve(responseJson.Status);  
              }).catch((error) =>{
                console.error(error);
                reject(error);
              });
          });      
      }

     /*async function loadPropsedWork(DID,workTtitle,path){
        fetch(Urls.getpropsedwork,{
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            workTitle:workTtitle,
            did:DID,
          }),
          })
          .then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson);
            //rnfs.writeFileSync(jsonpath, responseJson,'utf8')
            /*rnfs.writeFile(jsonpath,'hii how r u', 'ascii').then(res => {
              console.log(res)
          })
          .catch((err) => {
              console.log(err);
          });
            rnfs.writeFile(jsonpath, JSON.stringify(responseJson), 'ascii')
            .then((success) => {
              console.log('FILE WRITTEN!');
              })
            .catch((err) => {
              console.log(err.message);
            });
          }).catch((error) =>{
            console.error(error);
          });
      }*/

     export async function loadPropsedWork(DID,workTtitle,path){
       //AsyncStorage.removeItem('workdetails'); //condition to clear must be implemented
       AsyncStorage.clear();
       console.log("offline loding started");
        fetch(Urls.getpropsedwork,{
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            workTitle:workTtitle,
            did:DID,
          }),
          })
          .then((response) => response.json())
          .then((responseJson) => {
            //console.log(responseJson);
            AsyncStorage.setItem('workdetails',JSON.stringify(responseJson.Data));
            
          }).catch((error) =>{
            console.error(error);
          });
      }

     export default async function getdata()
      {
        try{
          let data1=await AsyncStorage.getItem('workdetails');//retriving data locally
          console.log("parsing entered");
          let data=JSON.parse(data1);
          data.map((item)=>{
            console.log(item);
          })

        }catch(error)
        {
          console.log(error);
        }
      }

      export function GetPropsedWorkList(DID,worktitle,path,options){
        console.log("Entered Api call");
        let ApiUrl=''
        heading=options;
        loginstatus=true;
        switch(options)
        {
          case 'Alloted_work':ApiUrl=Urls.getpropsedwork;
          console.log("enterd alloted work");
            break;
          case 'Workorder_work':ApiUrl=Urls.getpropsedwork;
            break;
          case 'Notstarted_work':ApiUrl=Urls.getpropsedwork;
            break;
          case 'Inprogress_work':ApiUrl=Urls.getpropsedwork;
            break;
          case 'onHold_work':ApiUrl=Urls.getpropsedwork;
            break;
          case 'Cancelled_work':ApiUrl=Urls.getpropsedwork;
            break;
          case 'Physically_work':ApiUrl=Urls.getpropsedwork;
            break;
          case 'Financially_work':ApiUrl=Urls.getpropsedwork;
            break;
        }
        return new Promise((resolve,reject)=>{
          /*loadPropsedWork(DID,workTtitle,path);
          getdata()*/
          //resolve("data retrived successfully");
          console.log("url =="+ApiUrl);
            fetch(ApiUrl,{
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                did:Did,
                workTitle:worktitle  
              })
              })
              .then((response) => response.json())
              .then((responseJson) => {
                //responseJson=Work;
                for(let i=0; i<responseJson.Data.length;i++)
                 {
                  workList[i]=responseJson.Data[i];
                }
                resolve('Data retrived successfully');  
              }).catch((error) =>{
                console.error(error);
                reject(error);
              });
          });          
      }

      
      export {heading,loginstatus};