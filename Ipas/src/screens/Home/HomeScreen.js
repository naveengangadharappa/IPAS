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
import {workList,GetPropsedWorkList,loadPropsedWork} from '../../data/ApiCalls';
import { AppLoading } from 'expo'

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
      value: ' ',
      data: workList,
      isdataloaded:false,
    };
    loadPropsedWork('','','');
  }


  componentDidMount() {
    this.loadworkdeatails();
    const { navigation } = this.props;
    navigation.setParams({
      handleSearch: this.handleSearch,
      data: this.getValue,
    });
  }

  loadworkdeatails =async()=>{
    console.log("entered to loadworkdetails");
    try{
      result=await GetPropsedWorkList('','','','Alloted_work');
      console.log(result);
      this.setState({
        isdataloaded:true,
        data:workList,
      });
    }
    catch(err)
    {
      console.log(err)
    }
  }

  handleSearch = text => {
    var workcodeArray1 = getWorkCode(text);
    var worktitleArray2 = getWorkTitle(text);
    var aux = workcodeArray1.concat(worktitleArray2);
    var WorklistArray = [...new Set(aux)];
    if (text == '') {
      this.setState({
        value: text,
        data: WorklistArray
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
        <Text style={styles.category}>{item.WorkTitle}</Text>
      </View>
    </TouchableHighlight>
  );

  render() {
   const isDataLoaded  = this.state.isdataloaded;
   const { navigation } = this.props;
    const headdata=navigation.getParam('heading');;
    if(!isDataLoaded){
      return <AppLoading />
    }
    return (
      <View>
        <Text style={{backgroundColor:'darkgray',padding:5,color:'white',borderRadius:3}}>{headdata}</Text>
        <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={this.state.data}
          renderItem={this.renderWorklist}
          keyExtractor={item => `${item.WorkId}`}
        />
      </View>
    );
    }
}
