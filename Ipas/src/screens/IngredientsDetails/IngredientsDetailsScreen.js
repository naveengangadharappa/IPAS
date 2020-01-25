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
import {
  getIngredientName,
  getAllIngredients,
} from '../../data/MockDataAPI';
import BackButton from '../../components/BackButton/BackButton';
import MenuImage from '../../components/MenuImage/MenuImage';
import ViewIngredientsButton from '../../components/ViewIngredientsButton/ViewIngredientsButton';
import { Table, TableWrapper, Row } from 'react-native-table-component';

export default class IngredientsDetailsScreen extends React.Component {
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

  constructor(props) {
    super(props);
  }

  /*onPressIngredient = item => {
    let name = getIngredientName(item.ingredientId);
    let ingredient = item.ingredientId;
    this.props.navigation.navigate('Ingredient', { ingredient, name });
  };*/

  /*renderIngredient = ({ item }) => (
    <TouchableHighlight onPress={() => this.onPressIngredient(item[0])}>
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: item[0].photo_url }} />
        <Text style={styles.title}>{item[0].name}</Text>
        <Text style={{ color: 'grey' }}>{item[1]}</Text>
      </View>
    </TouchableHighlight>
  );*/

  render() {
    const { navigation } = this.props;
    const item = navigation.getParam('item');
    const tblheading=["Complete Work Details"];
    const widthArr=[130, 250];
    //const ingredientsArray = getAllIngredients(item);
    const tableData =[
      ['Work Id ',item.WorkId],
      ['Work Title ',item.Details.Data.Work_Title],
      ['District ',item.Details.Data.District],
      ['Taluka ',item.Details.Data.Taluka],
      ['Village ',item.Details.Data.Village],
      ['Plan ',item.Details.Data.Plan],
      ['Scheme ',item.Details.Data.Scheme],
      ['IAName ',item.Details.Data.IAName],
    ];
    return (
      <View style={styles.container}>
        <ScrollView horizontal={true}>
          <View>
            <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
              <Row data={tblheading}style={styles.header} textStyle={styles.text}/>
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                {
                 tableData.map((rowData, index) => (
                    <Row
                      key={index}
                      data={rowData}
                      widthArr={widthArr}
                      style={[styles.row, index%2 && {backgroundColor: '#F7F6E7'}]}
                      textStyle={styles.text}
                    />
                  ))
                }
              </Table>
              <ViewIngredientsButton
            title={"Upload Progress"}
            width={150}
              onPress={() => {
                let ingredients ='';// item.ingredients;
                let title = 'Upload Progress';
                navigation.navigate('workupload',{item});
              }}
              />
            </ScrollView>
           
          </View>
        </ScrollView>
        
      </View>
    );
  }
}
