import React from 'react';

    export function Getdata(url){
    return new Promise((resolve,reject)=>{
        fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
        resolve(responseJson.Data);   
    }).catch((error) =>{
        console.error(error);
        reject(error);
        });
    });        
    }

    export function Postdata(url,data){
        return new Promise((resolve,reject)=>{
            fetch(url,{
              method: 'POST',
              headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: data,
              }).then((response) => response.json())
              .then((responseJson) => {
                resolve(responseJson);
              }).catch((error) =>{
                console.error(error);
                reject(error);
            })
        });        
      }  
      
      export function Postfile(url,data){
        return new Promise((resolve,reject)=>{
            fetch(url,{
              method: 'POST',
              headers:{
                  Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                },
              body: data,
              }).then((response) => response.json())
              .then((responseJson) => {
                resolve(responseJson);
              }).catch((error) =>{
                console.error(error);
                reject(error);
            })
        });        
      }    