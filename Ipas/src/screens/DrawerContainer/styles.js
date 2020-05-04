import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:"#E7E6E1",
    //opacity:0.8,
    
  },
  container: {
    flex: 1,
    alignItems: 'flex-start',
    marginTop:0,
    //paddingHorizontal: 10,
    //paddingleft:0,
    //paddingRight:0,
    backgroundColor:"#E7E6E1",
    //opacity:0.8,
  },
  photo:{
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft:10,
    borderRadius:50,
    height:50,
    width:50,
    marginBottom:20,
    
  },
  Profile:{
    //justifyContent:'center',
    
    //opacity:0.8,
    borderColor:"gray",
    borderBottomWidth:1,
    //borderTopWidth:0,
    backgroundColor:'#F7F6E7',
    marginTop:-10,
    borderRadius:5,
    marginBottom:40,
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
