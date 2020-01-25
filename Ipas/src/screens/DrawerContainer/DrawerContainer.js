import React from 'react';
import { View,Image } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import MenuButton from '../../components/MenuButton/MenuButton';
import {GetPropsedWorkList,loginstatus,heading} from '../../data/ApiCalls';
export default class DrawerContainer extends React.Component {
  render() {
    const { navigation } = this.props;
    if(loginstatus)
    {
    return (
      <View style={styles.content}>
        <View style={styles.container}>
        <Image style={styles.photo} source={require('../../../assets/icons/cookie100.png')} />
          <MenuButton
            title="Alloted Work"
            source={require('../../../assets/icons/category.png')}
            onPress={() => {
              GetPropsedWorkList('','','','Alloted_work').then((data)=>{
                navigation.navigate('Home');
                navigation.closeDrawer();
              }).catch((error)=>{
                console.log(error);
              }) 
            }}
          />
          <MenuButton
            title="Work Order"
            source={require('../../../assets/icons/category.png')}
            onPress={() => {
              GetPropsedWorkList('','','','Workorder_work').then((data)=>{
                navigation.navigate('Home',{heading });
                navigation.closeDrawer();
              }).catch((error)=>{
                console.log(error);
              })
            }}
          />
          <MenuButton
            title="Not Started"
            source={require('../../../assets/icons/category.png')}
            onPress={() => {
              GetPropsedWorkList('','','','Notstarted_work').then((data)=>{
                navigation.navigate('Home',{heading });
                navigation.closeDrawer();
              }).catch((error)=>{
                console.log(error);
              })
            }}
          />
          <MenuButton
            title="In Progress"
            source={require('../../../assets/icons/category.png')}
            onPress={() => {
              GetPropsedWorkList('','','','Inprogress_work').then((data)=>{
                navigation.navigate('Home',{heading });
                navigation.closeDrawer();
              }).catch((error)=>{
                console.log(error);
              })
            }}
          />
          <MenuButton
            title="onHold"
            source={require('../../../assets/icons/category.png')}
            onPress={() => {
              GetPropsedWorkList('','','','onHold_work').then((data)=>{
                navigation.navigate('Home',{heading });
                navigation.closeDrawer();
              }).catch((error)=>{
                console.log(error);
              })
            }}
          />
          <MenuButton
            title="Cancelled Work"
            source={require('../../../assets/icons/category.png')}
            onPress={() => {
              GetPropsedWorkList('','','','Cancelled_work').then((data)=>{
                navigation.navigate('Home',{heading });
                navigation.closeDrawer();
              }).catch((error)=>{
                console.log(error);
              })
            }}
          />
          <MenuButton
            title="Physically Completed"
            source={require('../../../assets/icons/category.png')}
            onPress={() => {
              GetPropsedWorkList('','','','Physically_work').then((data)=>{
                navigation.navigate('Home',{heading });
                navigation.closeDrawer();
              }).catch((error)=>{
                console.log(error);
              })
            }}
          />
          <MenuButton
            title="Financially Completed"
            source={require('../../../assets/icons/category.png')}
            onPress={() => {
              GetPropsedWorkList('','','','Financially_work').then((data)=>{
                navigation.navigate('Home',{heading });
                navigation.closeDrawer();
              }).catch((error)=>{
                console.log(error);
              })
            }}
          />
          <MenuButton
            title="View Map"
            source={require('../../../assets/icons/category.png')}
            onPress={() => {
                navigation.navigate('Map');
                navigation.closeDrawer();
            }}
          />
          <MenuButton
            title="Camera"
            source={require('../../../assets/icons/home.png')}
            onPress={() => {
              navigation.navigate('camera');
              navigation.closeDrawer();
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
          <MenuButton
            title="Profile"
            source={require('../../../assets/icons/category.png')}
            onPress={() => {
              navigation.navigate('Home');
              navigation.closeDrawer();
            }}
          />
          <MenuButton
            title="LogOut"
            source={require('../../../assets/icons/home.png')}
            onPress={() => {
              navigation.navigate('Login');
              navigation.closeDrawer();
            }}
          />
        </View>
      </View>
    );
  }
  else{
    return(<View></View>);
  }
}
}

DrawerContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  })
};
