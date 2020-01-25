import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
const styles = StyleSheet.create({
    container: {
      flex: 2,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: Constants.statusBarHeight,
      backgroundColor: '#ecf0f1',
    },
    paragraph: {
      margin: 24,
      fontSize: 18,
      textAlign: 'center',
    },
    map:{
    ...StyleSheet.absoluteFillObject,
      alignItems: 'center',
    },
    Heading:{
      paddingLeft:4,
      fontSize:18,
      }
  });

  export default styles;