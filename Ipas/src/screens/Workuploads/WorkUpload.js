import React from 'react';
import {
  KeyboardAvoidingView,
  FlatList,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  TouchableHighlight,
  ImageBackground,
  Alert
} from 'react-native';
import styles from './styles';
import {
  TextField,
  FilledTextField,
  OutlinedTextField,
} from 'react-native-material-textfield';
import Actionbutton from '../../components/ActionButton/ActionButton';
import { Table, TableWrapper, Row } from 'react-native-table-component';
import DatePicker from 'react-native-datepicker';
import Carousel, { Pagination } from 'react-native-snap-carousel';
//import { getIngredientName, getCategoryName, getCategoryById } from '../../data/MockDataAPI';
import BackButton from '../../components/BackButton/BackButton';
import DeleteButton from '../../components/DeleteButton/DeleteButton';
import ViewIngredientsButton from '../../components/ViewIngredientsButton/ViewIngredientsButton';
import {workdetails,photoArray,UploadFile,Uploaddata,workestimation,workinspection,piccaptured,trackphoto,expendituredoc,errmsg,Validate} from '../../data/ApiCalls';
import Spinner from 'react-native-loading-spinner-overlay';
//import { Switch } from 'react-native-gesture-handler';


const { width: viewportWidth } = Dimensions.get('window');

export default class WorkUploadScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerTransparent: 'true',
      headerLeft: (
        <BackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
      headerRight: (
        <TouchableHighlight onPress={()=>params.deleteImage('0')} style={[styles.btnContainer,{opacity:this.headeropac}]}>
        <Image source={require('../../../assets/icons/clear.png')} style={[styles.btnIcon,{opacity:this.headeropac}]} />
      </TouchableHighlight>
      )
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      headeropac:1,
      activeSlide: 0,
      imgload:false,
      isdatauploaded:false,
      date1:"",
      date2:"",
      text1:'',
      text2:'',
      text3:'',
      text4:'',
      textnumber1:'',
      textnumber2:'',
      textnumber3:'',
      textnumber4:'',
    };
  }

  //headeropac=1;
  fieldRef = React.createRef();
  imageitem="";
  captureimg={};
  styleopacity=1;
  styleheight=50;
  stylewidth=150;
  currentstyle={
    remarks:{},
    Date1:{},
    Date2:{},
    Text1:{},
    Text2:{},
    Text3:{},
    Text4:{},
    Textnumber1:{},
    Textnumber2:{},
    Textnumber3:{},
    Textnumber4:{},
    imgcontainer:{},
    tbl:{},
    info:{},
  };
  label={
    Date1:'',
    Date2:'',
    Text1:'',
    Text2:'',
    Text3:'',
    Text4:'',
    Textnumber1:'',
    Textnumber2:'',
    Textnumber3:'',
    Textnumber4:'',
  };
  input={ 
    WorkOrderFile:'',
    WorkEstimateImages:[],
    WorkImages:[],
    WorkEstimationId:'',
    ProposedWorkId:'',
    Submitted:'',
    WorkInspectionId:'',
    currentdate:'',
    longitude:'',
    latitude:'',
    remarks:'',
    dateonworkorder:'',
    expectedcompletiondate:'',
    contractorname:'',
    tendercost:'',
    handoveragency:'',
    workstartdate:'',
    progress:'',
    totalworkdone:'',
    amtpaidnow:'',
    dateofpayment:'',
    dateofworkcompletion:'',
    description:'',
    workdoneamt:'',
    dateofpayment:'',
    maintainenceperiod:'',
    dateofhandover:'',
  };

  componentDidMount() {
    this.props.navigation.setParams({ 'opacity': this.setState({headeropac:1})});
    const { navigation } = this.props;
    navigation.setParams({
      deleteImage: this.deleteImage,
    });
    this.setState({imgload:true})
  }
  
  onSubmit = () => {
    let { current: field } = this.fieldRef;
 
    console.log(field.value());
  };
 
  formatText = (text) => {
    return text.replace(/[^+\d]/g, '');
  };

  deleteImage = item =>{
    this.setState({imgload:false});
    let workid=0;
    let index=0;
      switch(item)
      {
        case '0':console.log("entered delete image");
        console.log(this.imageitem)
        workid=workdetails.WorkId; 
        let piccount=0;
        trackphoto.map(pic=>{
          console.log("Delete pic "+pic.workid+"  "+workid+"count ="+pic.count);
          if(pic.workid==workid){
            piccount=pic.count;
            pic.count=pic.count-1;
          }
        });
        if(piccount<=0){
          piccaptured.status=false;
          Alert.alert("Sorry No Image to delete");
        }else{
          index=photoArray[workid].findIndex(data => data.photo_url === this.imageitem);
          console.log(index);
          photoArray[workid].splice(index,1);
          Alert.alert("Image File Deleted Successfully");
          let photos=photoArray[workdetails.WorkId];
          if(photos.length>=4){
            piccaptured.status=false;
          }
        }
        //let temp=(photoArray[workid])?photoArray[workid]:[];
        this.setState({imgload:true});
          break;
        case '1':console.log("entered delete all image");
        workid=workdetails.WorkId; 
        console.log(photoArray[workid]);
        photoArray[workid].length=0; //deleting all photos with this work id
        this.setState({imgload:true});
          break;
      }     
}

uploaddata=async(Option)=>{
  let photos=photoArray[workdetails.WorkId];
  /*for (var i=0; i<photoArray.length; i++) { //iterate through each object in an array
    if (JSON.stringify(photoArray[i]) === JSON.stringify(photos)) {

     }
}*/ let validationflg=false;
  switch(Option)
  {
    case 'Alloted_work':btntitle='Upload Site Photo';
      console.log("Remarks = "+this.input.remarks);
      this.input.remarks=this.state.text1;
      this.input.ProposedWorkId=workestimation.ProposedWorkId;        
      this.input.Submitted=workestimation.Submitted;
      this.input.WorkEstimationId=workestimation.WorkEstimationId;
      this.setState({isdatauploaded:true});
      //let photos=photoArray[workdetails.WorkId];
      try{
      if(piccaptured.status){
        if(photos.length>=4){
          Alert.alert("Maximum 4 Images are allowed to submit please remove some images");
        }
        photos.map(item=>{
          let url=item.photo_url;
          let filenames=url.split('/'); 
          let temp={
            WorkInspectionId:workinspection.WorkInspectionId,
            Image:filenames[filenames.length-1],
            Longitude:item.Longitude,
            Latitude:item.Latitude,
          };
         this.input.WorkImages.push(temp);
        });
        let validation_data1=[this.input.remarks,this.input.WorkEstimateImages]
            validationflg=await Validate(validation_data1,workdetails.WorkId,Option)
            if(validationflg){
            let result=await UploadFile('',photos,'1');
              //this.input.WorkImages.le
              if(result){
                  result=await Uploaddata(this.input,Option,workdetails.WorkId);
                  if(result){
                    this.setState({isdatauploaded:false});
                    Alert.alert("Alloted work data Uploaded Successfully");
                    this.deleteImage('1');
                  this.props.navigation.navigate('Home',{Option});
                  } 
                  else{
                    this.setState({isdatauploaded:false});
                    Alert.alert("Problem in Alloted data uploading");
                  }    
                }
                else{
                  this.setState({isdatauploaded:false});
                  Alert.alert("Images cannot be uploaded");
                }
          console.log(result);
            }else{
              Alert.alert(errmsg);
            }
          }else{
            Alert.alert("Please Add Site Image");
          }
        }catch(error){
          console.log(error);
        } 
      break;
    case 'Workorder_work':btntitle='Upload Work Order';
      this.input.dateonworkorder=this.state.date1;
      this.input.expectedcompletiondate=this.state.date2;
      this.input.contractorname=this.state.text1;
      this.input.tendercost=this.state.textnumber1;
      this.input.handoveragency=this.state.text2;
      console.log("contractor name = "+this.input.contractorname);
      this.input.remarks=this.state.text1;
      this.setState({isdatauploaded:true});
     // let photos=photoArray[workdetails.WorkId];
      try{
        if(piccaptured.status){
        if(photos.length>=2){
          Alert.alert("please upload one image");
          this.setState({isdatauploaded:false});
        }
        else{
          let validation_data2=[this.input.dateonworkorder,this.input.contractorname,this.input.expectedcompletiondate,this.input.tendercost,this.input.handoveragency]
            validationflg=await Validate(validation_data2,workdetails.WorkId,Option)
            if(validationflg){
            let result=await  UploadFile(Option,photos,'1'); 
              if(result){
                  result=await Uploaddata(this.input,Option,workdetails.WorkId);
                  if(result){
                    this.setState({isdatauploaded:false});
                    Alert.alert("Work order data Uploaded Successfully");
                    this.deleteImage('1');
                    this.props.navigation.navigate('Home',{Option});
                  } 
                  else{
                    this.setState({isdatauploaded:false});
                    Alert.alert("Problem in work order data uploading");
                  }    
                }
                else{
                  Alert.alert("Images cannot be uploaded");
                }
                console.log(result);
              }else{
                Alert.alert(errmsg);
              }
            }
          }else{
          Alert.alert("Please Upload Work Order Image");
        }
        }catch(error){
          console.log(error);
        } 
      
      break;
    case 'Notstarted_work':btntitle='Start Work';
    this.input.workstartdate=this.state.date1;
    this.setState({isdatauploaded:true});
    //let photos=photoArray[workdetails.WorkId];
    try{
      let validation_data3=[this.input.workstartdate]
        validationflg=await Validate(validation_data3,workdetails.WorkId,Option)
        if(validationflg){
          let result=await Uploaddata(this.input,Option,workdetails.WorkId);
          this.setState({isdatauploaded:false});
          if(result){
            Alert.alert("work Started Successfully");
            this.deleteImage('1');
            this.props.navigation.navigate('Home',{Option});
          } 
          else{
            Alert.alert("Problem in start work data uploading");
          }    
        console.log(result);
        }else{
          Alert.alert(errmsg);
        }
      }catch(error){
        console.log(error);
      } 
      break;
    case 'Inprogress_work':btntitle='Upload Work Inspection';
    this.input.progress=this.state.textnumber1;
    this.input.remarks=this.state.text1;
    this.input.Submitted=workinspection.Submitted;
    this.input.WorkInspectionId=workinspection.WorkInspectionId;
    this.input.latitude=workdetails.latitude;
    this.input.longitude=workdetails.latitude;
    this.setState({isdatauploaded:true});
    try{
      if(piccaptured.status){
      if(photos.length>4){
        Alert.alert("Maximum 4 Images are allowed to submit please remove some images");
      }
      photos.map(item=>{
        let url=item.photo_url;
        let filenames=url.split('/'); 
        let temp={
          WorkEstimationId:workestimation.WorkEstimationId,
          Image:filenames[filenames.length-1],
          Longitude:item.Longitude,
          Latitude:item.Latitude,
        };
        this.input.latitude=item.Latitude;
        this.input.longitude=item.Longitude;
       this.input.WorkImages.push(temp);
      });
      let validation_data4=[this.input.progress,this.input.remarks]
      console.log(validation_data4[0]+"  "+validation_data4[1])
        validationflg=await Validate(validation_data4,workdetails.WorkId,Option)
        if(validationflg){
          let result=await  UploadFile(Option,photos,'1'); 
          if(result){
              result=await Uploaddata(this.input,Option,workdetails.WorkId);
              this.setState({isdatauploaded:false});
              if(result){
                Alert.alert("Work Inspection Uploaded Successfully");
                this.deleteImage('1');
                this.props.navigation.navigate('Home',{Option});
              } 
              else{
                Alert.alert("Problem in Inprogress data uploading");
              }    
            }
            else{
              Alert.alert("Images cannot be uploaded");
            }
            console.log(result);
          }else{
            Alert.alert(errmsg);
          }
          }else{
            Alert.alert("Please Add Work Progress Images");
          }
        }
      catch(error){
        console.log(error); 
      }
      break;
    case 'complete_work':btntitle='Upload Complete Work';
    this.input.dateofworkcompletion=this.state.date1;
    this.input.description=this.state.text1;
    this.input.workdoneamt=this.state.textnumber1
    this.setState({isdatauploaded:true});
   // photos=photoArray[workdetails.WorkId];
    try{
      if(piccaptured.status){
      if(photos.length>=2){
        Alert.alert("please upload one image");
        this.setState({isdatauploaded:false});
      }
      else{
        let validation_data5=[this.input.dateofworkcompletion,this.input.workdoneamt,this.input.description,expendituredoc]
        validationflg=await Validate(validation_data5,workdetails.WorkId,Option)
        if(validationflg){
          let result=await  UploadFile('',photos,'1'); 
          if(result){
              result=await Uploaddata(this.input,Option,workdetails.WorkId);
              this.setState({isdatauploaded:false});
              if(result){
                Alert.alert("Work Completed Successfully");
                this.deleteImage('1');
                this.props.navigation.navigate('Home',{Option});
              } 
              else{
                Alert.alert("Problem in Complete work data uploading");
              }    
            }
            else{
              Alert.alert("Images cannot be uploaded");
            }
          console.log(result);
        }else{
          Alert.alert(errmsg);
        }
      }
    }else{
      Alert.alert("Plese Upload last page of MB Reacord");
    }
      }catch(error){
        console.log(error);
      } 
    
      break;
    case 'submitexpinditure':btntitle='Submit Expinditure';
      this.input.dateofpayment=this.state.date1;
      this.input.workdoneamt=this.state.textnumber1;
      this.input.amtpaidnow=this.state.textnumber2;
      this.setState({isdatauploaded:true});
     
      try{
        if(piccaptured.status){
        if(photos.length>=2){
          Alert.alert("please upload one image");
          this.setState({isdatauploaded:false});
        }
        else{
          let validation_data6=[this.input.amtpaidnow,this.input.workdoneamt,this.input.dateofpayment,expendituredoc]
          validationflg=await Validate(validation_data6,workdetails.WorkId,Option)
          if(validationflg)
          {
            let result=await  UploadFile('',photos,'1'); 
            if(result){
                result=await Uploaddata(this.input,Option,workdetails.WorkId);
                this.setState({isdatauploaded:false});
                if(result){
                  Alert.alert("Expinditure submited Successfully");
                  this.deleteImage('1');
                  this.props.navigation.navigate('Home',{Option});
                } 
                else{
                  Alert.alert("Problem in Complete work data uploading");
                }    
              }
              else{
                Alert.alert("Images cannot be uploaded");
              }
            console.log(result);
          }else{
            Alert.alert(errmsg);
          }
        }
      }else{
          Alert.alert("Please Upload Expenditure Bills");
      }
    }catch(error){
      console.log(error);
      } 
        break;
    case 'Physically_work':btntitle='Upload Final bill';
    this.input.amtpaidnow=this.state.textnumber1;
    this.input.dateofpayment=this.state.date1;
    this.input.maintainenceperiod=this.state.textnumber2;
    this.input.dateofhandover=this.state.date2;
    this.setState({isdatauploaded:true});
    //let photos=photoArray[workdetails.WorkId];
    try{
      let validation_data7=[this.input.amtpaidnow,this.input.dateofhandover,this.input.maintainenceperiod,this.input.dateofpayment]
        validationflg=await Validate(validation_data7,workdetails.WorkId,Option)
        if(validationflg){
        let result=await Uploaddata(this.input,Option,workdetails.WorkId);
          this.setState({isdatauploaded:false});
          if(result){
            Alert.alert("Final Bill Submited Successfully");
            this.deleteImage('1');
            this.props.navigation.navigate('Home',{Option});
          } 
          else{
            Alert.alert("Problem in Complete work data uploading");
          }    
        console.log(result);
        }else{
          Alert.alert(errmsg);
        }
      }catch(error){
        console.log(error);
      } 
      break;
  }
  /*if(piccaptured.status||Option==="Physically_work"||Option==="Notstarted_work") {
    this.props.navigation.navigate('Home',{Option});
  }*/
  this.setState({isdatauploaded:false});
}

  viewImage=(item)=>{
    this.props.navigation.navigate('viewImage', {item});
  }

  renderImage = ({ item }) => (
    <TouchableHighlight onPress={() => this.viewImage(item)}>
      <View style={styles.imageContainer}> 
      <Text>{this.imageitem=item.photo_url}No Images Available</Text>
      <Image style={styles.image} source={{ uri:item.photo_url}} />
      </View>
    </TouchableHighlight>
  );

  render() {
    const widthArr=[250, 130];
    const isDatauploaded  = this.state.isdatauploaded;
    const { activeSlide } = this.state;
    const { navigation } = this.props;
    const options = navigation.getParam('options');
    const isimgdeleted  = this.state.imgload;
    let btntitle='';
    this.captureimg=styles.textboxhide;
    this.currentstyle.Date1=styles.textboxhide;
    this.currentstyle.Date2=styles.textboxhide;
    this.currentstyle.Text1=styles.textboxhide;
    this.currentstyle.Text2=styles.textboxhide;
    this.currentstyle.Text3=styles.textboxhide;
    this.currentstyle.Text4=styles.textboxhide;
    this.currentstyle.Textnumber1=styles.textboxhide;
    this.currentstyle.Textnumber2=styles.textboxhide;
    this.currentstyle.Textnumber3=styles.textboxhide;
    this.currentstyle.Textnumber4=styles.textboxhide;
    this.currentstyle.imgcontainer=styles.carouselContainer;
    this.currentstyle.tbl=styles.textboxhide;
    this.currentstyle.info=styles.infoContainer;
    var tableData =[];

    if(!isimgdeleted){
      return <View></View>
    }
    switch(options)
    {
      case 'Alloted_work':btntitle='Upload Site Photo';
        this.currentstyle.Text1=styles.textbox;
        this.captureimg=styles.textbox;
        this.label.Text1='Remarks';
        console.log(this.currentstyle.Text1);
        break;
      case 'Workorder_work':btntitle='Upload Work Order';
        this.captureimg=styles.textbox;
        this.currentstyle.Text1=styles.textbox;
        this.currentstyle.Text2=styles.textbox;
        this.currentstyle.Textnumber1=styles.textbox;
        this.currentstyle.Date1=styles.textbox;
        this.currentstyle.Date2=styles.textbox;
        this.label.Text1='Name of contractor/Agency';
        this.label.Text2='Handover Agency';
        this.label.Date1='Date on Work Order';
        this.label.Date2='Expected date of completion';
        this.label.Textnumber1='Tender cost';
        break;
      case 'Notstarted_work':btntitle='Start Work';
      this.setState({headeropac:0})
      this.styleheight=1;
      this.stylewidth=1;
      this.styleopacity=0;
        this.currentstyle.info= [styles.infoContainer,{marginTop:80}]
      this.currentstyle.imgcontainer=styles.textboxhide;
        this.currentstyle.Date1=styles.textbox;
        this.label.Date1='Work Start Date';
        break;
      case 'Inprogress_work':btntitle='Upload Work Inspection';
        this.captureimg=styles.textbox;
        this.currentstyle.Text1=styles.textbox;
        this.currentstyle.Textnumber1=styles.textbox;
        this.label.Text1='Remarks in Work Progress';
        this.label.Textnumber1='Work progress in %';
        break;
      case 'complete_work':btntitle='Upload Complete Work';
        this.captureimg=styles.textbox;
        this.currentstyle.Date1=styles.textbox;
        this.currentstyle.Textnumber1=styles.textbox;
        this.currentstyle.Text1=styles.textbox;
        this.label.Date1='Date of Work Completion';
        this.label.Textnumber1='Description';
        this.label.Text1='Work Done Amtas per(Mb Record)';
        break;
      case 'submitexpinditure':btntitle='Submit Expinditure';
      tableData.length=0;//clearing tableData
        this.captureimg=styles.textbox;
        this.currentstyle.Textnumber1=styles.textbox;
        this.currentstyle.Textnumber2=styles.textbox;
        this.currentstyle.Date1=styles.textbox;
        this.label.Date1='Date of payment';
        this.label.Textnumber1='Total work Done Amount';
        this.label.Textnumber2='Amount paid Now';
        tableData.push(['Previous Expinditure',workdetails.PreviousExpenditure]);
        tableData.push(['Balance Cash in Hand',workdetails.CashInHand]);
        tableData.push(['Balance Payment Agency',workdetails.BalancePaymentAgency]);
        tableData.push(['Total Payment Agency',workdetails.TotalPayToAgency]);
        tableData.push(['Work Done Amount',workdetails.WorkDoneAmount]);
          
        break;
      case 'Physically_work':btntitle='Upload Final bill';
      this.currentstyle.info= [styles.infoContainer,{marginTop:80}]
      this.currentstyle.imgcontainer=styles.textboxhide;
      tableData.length=0;
        this.currentstyle.tbl=styles.tbl;
        this.captureimg=styles.textbox;
        this.currentstyle.Textnumber1=styles.textbox;
        this.currentstyle.Textnumber2=styles.textbox;
        this.currentstyle.Date1=styles.textbox;
        this.currentstyle.Date2=styles.textbox;
        this.label.Date1='Date of payment';
        this.label.Date2='Date of Handover';
        this.label.Textnumber1='Amount paid Now';
        this.label.Textnumber2='Maintenance Period';
        tableData.push(['Previous Expinditure',workdetails.PreviousExpenditure]);
        tableData.push(['Balance Cash in Hand',workdetails.CashInHand]);
        tableData.push(['Balance Payment Agency',workdetails.BalancePaymentAgency]);
        tableData.push(['Total Payment Agency',workdetails.TotalPayToAgency]);
        tableData.push(['Total MB Amount',workdetails.WorkDoneAmount]);
        break;    
    }
      if(isDatauploaded){
        console.log("entered loading")
        return (//<AppLoading />
         <View styles={styles.container1}><Spinner
            //visibility of Overlay Loading Spinner
            visible={isDatauploaded}
            //Text with the Spinner 
            textContent={'Loading...'}
            //Text style of the Spinner Text
            textStyle={styles.spinnerTextStyle}
          /></View>
          )
      }
     else{
      return(
     <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      >
      <ScrollView >  
        <View style={this.currentstyle.imgcontainer}>
          <View style={styles.carousel}>
            <Carousel
              ref={c => {
                this.slider1Ref = c;
              }}
             // data={item.WorkId}
              data={photoArray[workdetails.WorkId]}
              renderItem={this.renderImage}
              sliderWidth={viewportWidth}
              itemWidth={viewportWidth}
              inactiveSlideScale={1}
              inactiveSlideOpacity={1}
              firstItem={0}
              loop={false}
              autoplay={false}
              autoplayDelay={500}
              autoplayInterval={3000}
              onSnapToItem={index => this.setState({ activeSlide: index })}
            />
            <Pagination
              activeDotIndex={activeSlide}
              containerStyle={styles.paginationContainer}
              dotColor="white"
              dotStyle={styles.paginationDot}
              inactiveDotColor="red"
              inactiveDotOpacity={0.3}
              inactiveDotScale={0.2}
              carouselRef={this.slider1Ref}
              tappableDots={!!this.slider1Ref}
            />
          </View>
        </View>
       
        <View style={this.currentstyle.info}>
          <Text style={styles.category}>Work Title : {workdetails.Work_Title}</Text>
          <Text style={styles.category}>Work Id : {workdetails.WorkId}</Text>
        </View>
       
        <View style={{alignSelf:'center'}}>
          <Table borderStyle={this.currentstyle.tbl}>
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
          <View style={{borderWidth:1,bordercolor:'black',borderRadius:5,paddingTop:10, marginHorizontal:20,marginVertical:10}}> 
          <DatePicker
            style={[this.currentstyle.Date1,{width:300}]}
            date={this.state.date1}
            mode="date"
            placeholder={this.label.Date1}
            format="DD-MM-YYYY"
            minDate="2019-01-01"
            //maxDate="2019-01-01"
            //confirmBtnText="Confirm"
            //cancelBtnText="Cancel"
            customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 4
            },
            dateInput: {
            marginLeft: 36
            }
        }}
        onDateChange={(date) => {this.setState({date1: date})}}
      />
      <DatePicker
            style={[this.currentstyle.Date2,{width:300}]}
            date={this.state.date2}
            mode="date"
            placeholder={this.label.Date2}
            format="DD-MM-YYYY"
            minDate="2019-01-01"
            //maxDate="2019-01-01"
            //confirmBtnText="Confirm"
            //cancelBtnText="Cancel"
            customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 4
          },
          dateInput: {
            marginLeft: 36
          }
        }}
        onDateChange={(date) => {this.setState({date2: date})}}
      />
          <OutlinedTextField
            containerStyle={this.currentstyle.Text1}
              label={this.label.Text1}
              onChangeText={( text)=>this.setState({ text1:text })}
             
            />
            <OutlinedTextField
            containerStyle={this.currentstyle.Text2}
              label={this.label.Text2}
              onChangeText={( text)=>this.setState({ text2:text })}
            />
            <OutlinedTextField
            containerStyle={this.currentstyle.Text3}
              label={this.label.Text3}
              onChangeText={( text)=>this.setState({ text3:text })}
            />
            <OutlinedTextField
            containerStyle={this.currentstyle.Text4}
              label={this.label.Text4}
              onChangeText={( text)=>this.setState({ text4:text })}
            />
           <OutlinedTextField
            containerStyle={this.currentstyle.Textnumber1}
              label={this.label.Textnumber1}
              keyboardType='phone-pad'
              onChangeText={( text)=>this.setState({ textnumber1:text })}
            />
            <OutlinedTextField
            containerStyle={this.currentstyle.Textnumber2}
              label={this.label.Textnumber2}
              keyboardType='phone-pad'
              onChangeText={( text)=>this.setState({ textnumber2:text })}
            />
            <OutlinedTextField
            containerStyle={this.currentstyle.Textnumber3}
              label={this.label.Textnumber3}
              keyboardType='phone-pad'
              onChangeText={( text)=>this.setState({ textnumber3:text })}
            />
            <OutlinedTextField
            containerStyle={this.currentstyle.Textnumber4}
              label={this.label.Textnumber4}
              keyboardType='phone-pad'
              onChangeText={( text)=>this.setState({ textnumber4:text })}
            />
           
            
          </View>
        </View>
      </ScrollView>
      <View style={{height:70,marginBottom:2,alignContent:'center',justifyContent:'center',flexDirection:'row'}}>
                 
                <Actionbutton
                title={'Capture image'}
                width={this.stylewidth}
                opacity={this.styleopacity}
                height={this.styleheight}
                  onPress={() => {
                    navigation.navigate('camera',{options});
                  }}
                  />
                  <Actionbutton
                    title={btntitle}
                    opacity={1}
                    height={50}
                    width={170}
                    onPress={() => {this.uploaddata(options)
                  //navigation.navigate('workupload',{options});
                }}
                />
      </View>
      </KeyboardAvoidingView> 
       );
     }    
  }
}

