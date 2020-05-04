import { StyleSheet } from 'react-native';
import { RecipeCard } from '../../AppStyles';

const styles = StyleSheet.create({
    container: {
      flex:1,
     // padding:30,
      justifyContent:'center',
      backgroundColor:"#E7E6E1",
      //marginBottom:170,
    },
    container2: {
      flex:1,
     // padding:30,
     marginLeft:30,
     marginRight:30,
      justifyContent:'center',
      backgroundColor:"#E7E6E1",
      //marginBottom:170,
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
      paddingTop:25,
      paddingBottom:5,
      marginBottom:10,
      marginLeft:30,
      marginRight:30,
    },
    separator: {
      marginVertical: 8,
      borderBottomColor: '#737373',
      marginLeft:30,
      marginRight:30,
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    selectBox:{
      padding: 10 ,
      height: 40,
      borderBottomWidth: 1,
      marginLeft:30,
      marginRight:30,
    },
    Options:{
      padding: 5 ,
      height: 55,
      width:250,
      fontSize:14,
      marginLeft:30,
      marginRight:30,
    },
    button:{
      padding: 10 ,
      height: 40,
      borderColor: 'gray',
      borderBottomWidth: 1, 
      marginLeft:30,
      marginRight:30,
    },
    Image:{
      width:150,
      height:150,
      borderRadius:100,
      alignSelf:'center',
      padding:5, 
      marginBottom:40,
      
    },
    Heading:{
      padding:5,
      fontSize:16, 
    },
    container1: {
      flex: 1,
      justifyContent: 'center',
      textAlign: 'center',
      paddingTop: 30,
      backgroundColor: '#ecf0f1',
      padding: 8,
    },
    spinnerTextStyle: {
      color: '#FFF',
    },
});

export default styles;
