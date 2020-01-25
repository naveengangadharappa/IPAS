import React from 'react';
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableHighlight,
  ScrollView 
} from 'react-native';
import styles from './styles';
import BackButton from '../../components/BackButton/BackButton';
import MenuImage from '../../components/MenuImage/MenuImage';
import ViewIngredientsButton from '../../components/ViewIngredientsButton/ViewIngredientsButton';
import {
    TextField,
    FilledTextField,
    OutlinedTextField,
} from 'react-native-material-textfield';

export default class WorkUpload extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerTitle: ( 
        <Text style={styles.Heading}>IPAS</Text>
      ),
      headerRight: (
        <MenuImage
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      ) 
    };
  };

  fieldRef = React.createRef();
 
  onSubmit = () => {
    let { current: field } = this.fieldRef;
 
    console.log(field.value());
  };
 
  formatText = (text) => {
    return text.replace(/[^+\d]/g, '');
  };

  render() {
    const { navigation } = this.props;
    const item = navigation.getParam('item');
    return (
        <View style={styles.container}>
      <OutlinedTextField
      containerStyle={styles.textbox}
        label='Work Percentage in %'
        keyboardType='phone-pad'
        formatText={this.formatText}
        onSubmitEditing={this.onSubmit}
        ref={this.fieldRef}
      />
      <View style={styles.piccontainer}>
      <ViewIngredientsButton
            title={"Capture Image"}
            width={150}
              onPress={() => {
                let ingredients ='';// item.ingredients;
                //let title = 'Upload Progress';
                navigation.navigate('camera',{item});
              }}
         />
         </View>
      </View>
       
    );
  }

}