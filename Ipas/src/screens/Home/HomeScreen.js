import React from 'react';
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableHighlight,
  Alert,
  ScrollView,
  ImageBackground,
  Platform,
  NetInfo
} from 'react-native';

import styles from './styles';
import { ListItem,SearchBar } from 'react-native-elements';
import MenuImage from '../../components/MenuImage/MenuImage';
import {
  getWorkCode,
  getWorkTitle,
  getPlanType
} from '../../data/MockDataAPI';
import Actionbutton from '../../components/ActionButton/ActionButton';
import {workList,GetworkList,loadPropsedWork, Getworkdetails,GetWorkEstimation,GetWorkInspection,shadowOpt,Estimationsubmited,searchtext,loadmore} from '../../data/ApiCalls';
import { AppLoading } from 'expo';
import {BoxShadow} from 'react-native-shadow';
//import SearchBar from 'react-native-search-bar';
import Spinner from 'react-native-loading-spinner-overlay';


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
        <View style={{flexDirection:'row'}}>
          <SearchBar
          containerStyle={{
            backgroundColor: 'transparent',
            borderBottomColor: 'transparent',
            borderTopColor: 'transparent',
            height:50,
            width:80,
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
          onChangeText={text =>params.handleSearch(text,"0")}
          onClear={() => params.handleSearch('')}
          showLoading={params.searchloading}
          placeholder="Search"
          value={params.data}
        />
        <TouchableHighlight  style={{paddingTop:15}}
        onPress={() => { params.handleSearch("nav","1")}}>
          <Image
            style={{width:30,height:30,paddingTop:20}} source={require('../../../assets/icons/search.png')} />
        </TouchableHighlight>
        </View>
      )
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      value: ' ',
      data: workList,
      isdataloaded:false,
      internet:true
    };
    //loadPropsedWork('','','');
  }
  searchloading=true;
  search=true;
  slno=1;
  options='';
  componentDidMount() {
    this.CheckConnectivity();
    this.loadworkdeatails(false);
    const { navigation } = this.props;
    navigation.setParams({
      handleSearch: this.handleSearch,
      data: this.getValue,
    });
    
  }

  CheckConnectivity = async() => {
    console.log("entered connectivity checkingconnected");
    // For Android devices
    if (Platform.OS === "android") {
      NetInfo.isConnected.fetch().then(isConnected => {
        if (isConnected) {
          console.log("online device");
          this.setState({internet:true});
        } else {
          console.log("device offline");
          this.setState({internet:false});
        }
      });
    } else {
      // For iOS devices
      NetInfo.isConnected.addEventListener(
        "connectionChange",
        this.handleFirstConnectivityChange
      );
    }
  }

  handleFirstConnectivityChange = isConnected => {
    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      this.handleFirstConnectivityChange
    );

    if (isConnected === false) {
      this.setState({internet:false});
    } else {
      this.setState({internet:true});
    }
  };


  loadworkdeatails =async(loadmoreflg)=>{
    if(loadmoreflg){
      loadmore.status=true;
      loadmore.pgcount=loadmore.pgcount+1;
    }else{
      this.search=false;
    }
    console.log("entered to loadworkdetails");
    try{
      this.slno=1;
      this.setState({isdataloaded:false});
      let result=await GetworkList('','','','Alloted_work');
      if(result){
        console.log("data retrived successfully");
        this.setState({
          isdataloaded:true,
          data:workList,
        });
      }
      else{
        Alert.alert("Invalid Respone from server");
      }
      
    }
    catch(err)
    {
      console.log(err)
    }
  }

  handleSearch = async(text,optcode) => {
    try{
      switch(optcode){
        case "0":
          searchtext.text=text;
          this.searchloading=true;
          var workcodeArray1 = getWorkCode(text);
          var worktitleArray2 = getWorkTitle(text);
          var plantypeArray3 = getPlanType(text);
          var WorklistArray=[...new Set([...workcodeArray1, ...worktitleArray2, ...plantypeArray3])]
            this.search=true;
            this.slno=1;
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
                break;
        case "1": console.log("Search text = "+searchtext.text);
          this.slno=1;
            if(searchtext.text===""){
              Alert.alert("Please Enter Work Title to Search ??");
            }else{
              this.setState({isdataloaded:false});
              let result= await GetworkList('',searchtext.text,'','Alloted_work');
              if(result){
                searchtext.text="";
                console.log("search data retrived successfully");
                this.setState({
                  isdataloaded:true,
                  data:workList,
                });
              }else{
                Alert.alert("Invalid Respone from server");
              }
            }   
          break;
      }
    }catch(err){
      console.log(err);
      Alert.alert("Some thing Went wrong please try again");
    }
  };

  getValue = () => {
    return this.state.value;
  };
  usestate=()=>{
    console.log("entered data state set");
    this.setState({
      isdataloaded:true,
      data:workList,
    });
  }

  onPressRecipe = async(item) => {
    try{
      this.setState({
        isdataloaded:false});
        /*this.CheckConnectivity();
        this.setState({
          isdataloaded:true});*/
      let result=await Getworkdetails(item.WorkId,this.options);
      if(result){
        let opt=this.options;
        console.log("calling work details"+opt);
        switch(opt)
        {
          case 'Alloted_work':console.log("Estimation submit = "+item.Estimation);
          Estimationsubmited.Status=item.Estimation;
            result=await GetWorkEstimation(item.WorkId);
            if(!result){
              Alert.alert("invalid response at workestimation");
            }
            break;
          case 'Inprogress_work':result=await GetWorkInspection(item.WorkId);
            if(!result){
              Alert.alert("invalid response at workestimation");
            }
            break;
          case 'complete_work':
            break;
          case 'submitexpinditure':  
            break;
         
        }
        //result=await Getworkdetails(item.WorkId,this.options);
        this.setState({
          isdataloaded:true});
        this.props.navigation.navigate('workdetails', {opt});
      }
      else{
        Alert.alert("Invalid response from server");
        this.props.navigation.navigate('Login');
      }
    }
    catch(err)
    {
      console.log(err);
    }
  };
//<Image style={styles.photo} source={{ uri: item.photo_url }} />
  renderWorklist = ({ item }) => (
    <BoxShadow setting={shadowOpt}>
    <TouchableHighlight onPress={() => this.onPressRecipe(item)}>
    <ScrollView > 
       <View style={[styles.container]}>
        <Text style={[styles.title,item.color]}>{this.slno++}.  Work-Id={item.WorkId}</Text>
        <Text style={styles.category}>Work :-  {item.WorkTitle}PlanType :-  {item.Plantype}</Text>
        <Text style={styles.category}>Status :-  {item.Status}</Text>
      </View>
    </ScrollView>
    </TouchableHighlight>
    </BoxShadow>
  );
  
  render() {
    this.slno=1; 
    const isDataLoaded  = this.state.isdataloaded;
    const bgcolor=(this.state.internet)?'darkgreen':'red';
    const { navigation } = this.props;
    const headdata= navigation.getParam('heading');
    this.options=headdata;
    let loadmore_opacity=loadmore.opacity;
    loadmore.opacity=0;
    if(!isDataLoaded){
      console.log("entered loading")
      return (//<AppLoading />
       <View styles={styles.container1}><Spinner
          //visibility of Overlay Loading Spinner
          visible={!isDataLoaded}
          //Text with the Spinner 
          textContent={'Loading...'}
          //Text style of the Spinner Text
          textStyle={styles.spinnerTextStyle}
        /></View>
        )
    }
    if(this.search){
      console.log('if block entered');
      this.search=false; 
      if(workList.length<=0)
      {
        return (
          <View style={{backgroundColor:"#E7E6E1",}}>
            <Text style={{borderColor:'green',backgroundColor:bgcolor,padding:5,color:'white',borderRadius:3}}>{headdata}</Text>
            <Text style={{borderColor:'green',padding:30,alignSelf:'center',borderRadius:3}}>No Works Found  ??</Text>
          </View>
        );
      } 
      return (
        <View style={{backgroundColor:"#E7E6E1",flex: 1}}>
        <View style={{backgroundColor:"#E7E6E1",flex: 1}}>
          <Text style={{borderColor:'green',backgroundColor:bgcolor,padding:5,color:'white',borderRadius:3}}>{headdata}</Text>
          <ScrollView horizontal={true}> 
                <FlatList
                  vertical
                  showsVerticalScrollIndicator={false}
                  numColumns={3}
                  data={this.state.data}
                  renderItem={this.renderWorklist}
                  keyExtractor={item => `${item.WorkId}`}
          />
          </ScrollView>
        </View>
         <View style={{position:"absolute",height:70,bottom:1,alignSelf:'center',justifyContent:'center',flexDirection:'row'}}>
         <Actionbutton
           title={"Load More"}
           width={300}
           opacity={loadmore_opacity}
             height={50}
             onPress={() => { 
              this.loadworkdeatails(true);
             }}
             />
       </View>
       </View>
      );
    }
    else{
      console.log('else block entered');
      console.log(workList.length);
      if(workList.length<=0)
      {
        return (
          <View style={{backgroundColor:"#E7E6E1",}}>
           <Text style={{borderColor:'green',backgroundColor:bgcolor,padding:5,color:'white',borderRadius:3}}>{headdata}</Text>
            <Text style={{borderColor:'green',padding:30,alignSelf:'center',borderRadius:3}}>No Works Found  ??</Text>
          </View>
        );
      }
      return (
        <View style={{backgroundColor:"#E7E6E1",flex: 1}}>
        <View style={{backgroundColor:"#E7E6E1",flex: 1,marginBottom:50}}>
          <Text style={{borderColor:'green',backgroundColor:bgcolor,padding:5,color:'white',borderRadius:3}}>{headdata}</Text>
          <ScrollView horizontal={true}>
            <FlatList
            vertical
            showsVerticalScrollIndicator={false}
            numColumns={3}
            data={workList}
            renderItem={this.renderWorklist}
            keyExtractor={item => `${item.WorkId}`}
          />
          </ScrollView>
          </View>
          <View style={{position:"absolute",height:70,bottom:1,alignSelf:'center',justifyContent:'center',flexDirection:'row'}}>
            <Actionbutton
              title={"Load More"}
              width={300}
              opacity={loadmore_opacity}
                height={50}
                onPress={() => { 
                 this.loadworkdeatails(true);
                }}
                />
          </View>
        </View>
       
      );
    }
    }
}
