import React , { useState } from 'react';
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
import SwiperFlatList from 'react-native-swiper-flatlist';

function RenderDashboard()
{
    return(
    <Modal style={styles.dashboardcontainer}>
        <View style={styles.dashboardview}>
            <Text style={{padding:10}}>IPAS</Text>
            <Text style={{padding:10}}>Info</Text>
            <Text style={{padding:10}}>Logout</Text>   
        </View>
        <View style={styles.dashboardview}>
            <TextInput style={styles.SearchBox} placeholder='Enter work title'/>
            <Button  
            title='Search'
            />
            </View>
           <View style={styles.wrapper}>
             <SwiperFlatList
          autoplay={3}
          autoplayLoop
          index={1}
          showPagination>
        <View style={styles.slide1}>
          <Text >Hello Swiper</Text>
        </View>
        <View style={styles.slide2}>
          <Text >Propsed work</Text>
        </View>
        </SwiperFlatList></View>
    </Modal>
  );
    
}
const styles = StyleSheet.create({
    dashboardcontainer: {
      flex:1,
      backgroundColor:'gray',
    },
    title: {
      textAlign: 'center',
      marginVertical: 8,
    },
    SearchBox: {
      height:40,
      borderColor:'#737373',
      borderWidth:2,
      marginBottom:10,
      width:320,
      paddingRight:10,
    },
    SearchButton:{
      backgroundColor:'#737373',
      height:70,
      padding:10
    },
    separator: {
      marginVertical: 8,
      borderBottomColor: '#737373',
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    dashboardview:{
        flexDirection:"row",
        alignSelf:'center',
    },
    wrapper: {
      flex:5,
    },
    slide1: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#9DD6EB',
    },
    slide2: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#97CAE5',
    },
  });   

  export {RenderDashboard};