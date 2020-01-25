import React from 'react';
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableHighlight
} from 'react-native';
import styles from './styles';
import { ListItem, SearchBar } from 'react-native-elements';
import MenuImage from '../../components/MenuImage/MenuImage';
import {
  getWorkCode,
  getWorkTitle,
} from '../../data/MockDataAPI';
import {Propsedwork} from '../../data/ApiCalls';

export default class SearchScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerLeft: ( 
        <Text style={styles.Heading}>IPAS</Text>
      ),
      headerRight: (
        <MenuImage
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      ),
      headerTitle: (
        <SearchBar
          containerStyle={{
            backgroundColor: 'transparent',
            borderBottomColor: 'transparent',
            borderTopColor: 'transparent',
            flex: 1
          }}
          inputContainerStyle={{
            backgroundColor: '#EDEDED'
          }}
          inputStyle={{
            backgroundColor: '#EDEDED',
            borderRadius: 10,
            color: 'black'
          }}
          searchIcond
          clearIcon
          //lightTheme
          round
          onChangeText={text => params.handleSearch(text)}
          onClear={() => params.handleSearch('')}
          placeholder="Search"
          value={params.data}
        />
      )
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      data: Propsedwork
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    navigation.setParams({
      handleSearch: this.handleSearch,
      data: this.getValue
    });
  }

  handleSearch = text => {
    var recipeArray1 = getWorkCode(text);
    var recipeArray2 = getWorkTitle(text);
    var aux = recipeArray1.concat(recipeArray2);
    var WorklistArray = [...new Set(aux)];
    if (text == '') {
      this.setState({
        value: text,
        data: []
      });
    } else {
      this.setState({
        value: text,
        data: WorklistArray
      });
    }
  };

  getValue = () => {
    return this.state.value;
  };

  onPressRecipe = item => {
    this.props.navigation.navigate('Recipe', { item });
  };
//<Image style={styles.photo} source={{ uri: item.photo_url }} />
  renderWorklist = ({ item }) => (
    <TouchableHighlight onPress={() => this.onPressRecipe(item)}>
      <View style={styles.container}>
        
        <Text style={styles.title}>Work-Id={item.WorkId}</Text>
        <Text style={styles.category}>{item.Details.Data.Work_Title}</Text>
      </View>
    </TouchableHighlight>
  );

  render() {
    return (
      <View>
        <Text style={{backgroundColor:'darkgray',padding:5,color:'white',borderRadius:3}}>Not Started Works</Text>
        <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          numColumns={3}
          data={this.state.data}
          renderItem={this.renderWorklist}
          keyExtractor={item => `${item.WorkId}`}
        />
      </View>
    );
  }
}
