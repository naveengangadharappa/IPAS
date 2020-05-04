import React from 'react';
import { AsyncStorage } from 'react-native';
import {Getdata,Postdata,Postfile} from './Service'
import { Alert } from 'react-native';
//import * as Location from 'expo-location';
//import * as Permissions from 'expo-permissions';
//import {Work} from './dataArrays';
//export let photoArray=[];
export const shadowOpt = {
  //width:170,
  //height:145,
  width:121,
  height:111,
  color:"#000",
  border:2,
  radius:3,
  opacity:0.2,
  x:0,
  y:1,
  padding:10,
  style:{marginVertical:5, marginLeft: 8,justifyContent: 'center',marginTop: 10,marginBottom:10},
 
}
export let photoArray={};
export let trackphoto=[];
export let loadmore={
  status:false,
  pgcount:1,
  opacity:0
};
let Did=0;
export let searchtext={text:""};
let baseurl='http://ipas.esdsconnect.com/iPAS-WebAPIVersion/v1/APIs/';
export const Urls ={
  nextpaglink:baseurl+"ListProposedWorks?pageNo=",
  getDistrict:baseurl+'GetAllDistricts',// to get all districts
  checklogin:baseurl+'CheckLogin',//checking user login
  getLogin:baseurl+'Login',//Login 
  getallotedwork:baseurl+'ListProposedWorks',//to get alloted work list
  getallotedworkdetails:baseurl+'ProposedWorkDetails',//to get alloted work details
  getworkorderlist:baseurl+'ListWorkorders',//to get work order list
  getworklist:baseurl+'ListWorks',//for all works 
  getworkdetails:baseurl+'WorkDetails',//get workdetails
  uploadImage:'http://ipas.esdsconnect.com/iPAS-WebAPI/Default/UploadFileFromAPI',// uploading image
  uploadworkorder:baseurl+'WorkOrderUpload',//uploading work order data
  uploadallotedwork:baseurl+'AddWorkEstimation',//uploading work estimation
  uploadstartwork:baseurl+'StartWork',//uploaing start work
  uploadinprogress:baseurl+'AddWorkInspection',//uploading work inspection
  uploadcompletework:baseurl+'CompleteWork',//uploading complete work
  uploadexpinditure:baseurl+'SubmitExpenditure',//uploading expinditure
  uploadfinalbill:baseurl+'SubmitFinalBill',//uploading final bill 
  getworkinspection:baseurl+'GetWorkInspection',//getting work inspection data
  getworkestimation:baseurl+'GetProposedWorkEstimation',//getting work estimation
};
let validationerrors={
Alloted_work:[
  "Remark on Inital Photo Required"
],   
Workorder_work:[
  "Work Order Date Required",
  "Contractor Name Required",
  "Completion Date Required",
  "Tender Cost Required",
  "Handover Agency Required",
  "Upload Image "
  ],  
Notstarted_work:[
  "Start Date Required"
  ],

Inprogress_work:[
  "Progress Required",
  "Remarks Required",
  "Please Add Image ",
],
complete_work:[
  "Tender Cost Required",
  "Handover Agency Required",
  "Upload Image ",
  "Please Add MB Record page ",
],
submitexpinditure:[
  "Work Order Date Required",
  "Contractor Name Required",
 "Completion Date Required",
 "Please Add MB Record page ",
],
Physically_work:[
  "Handover Agency Required",
  "Contractor Name Required",
  "Completion Date Required",
  "Completion Date Required",
  "Completion Date Required",
],
  Computationerror:{
    
  } 
};
export let piccaptured={status:false};
export let Districts = [];
export let district = [];
let notstarted=[];
let inprogress=[];
let inhold=[];
let cancalled=[];
let Physicallycompleted=[];
let financallycompleted=[];
let temp_workList=[];
export let expendituredoc;
export let WorkOrderFile;
export let workList=[];
export let workinspection={};
export let workestimation={};
export let workdetails={};
export let userdetails={};
export let isallotedtab=true;
export let errmsg="";
let heading;
let loginstatus=false;
let online=true;
export let Estimationsubmited={
  Status:false
}
export function setloginstatus(status)
{
  loginstatus=status;
}


export async function CheckConnectivity () {
  // For Android devices
  if (Platform.OS === "android") {
    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected) {
        online=true;
      } else {
        online=false;
      }
    });
  } else {
    // For iOS devices
    NetInfo.isConnected.addEventListener(
      "connectionChange",
      this.handleFirstConnectivityChange
    );
  }
  return online;
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



export async function  GetDistrict(){
  try{
    let result=await Getdata(Urls.getDistrict);
    let i=0;
    result.map(item=>{
       let id=item.id;
       Districts.push({value:item.name});
       district.push(item);
      });
      return "District retrivee succesfully";
    }catch(error){
    console.log(error);
    return error;
    }
  }

    export async function GetLoginStatus(DID,uname,password){
      //Did=DID;
      DID='0';
      try{
        let data=JSON.stringify({
          'UserName':uname,
          'Password':password,
          'did':DID,
        });
        let result=await Postdata(Urls.getLogin,data);
        userdetails=result.Data; 
        return result.Status;
      }catch(error){
        console.log(error);
        return error;
      }        
    }

    export async function GetWorkEstimation(workid)
    {
      console.log("enterd work estimation");

      try{
        let data=JSON.stringify({
          'WorkId':workid,
          'did':Did,
        });
        let result=await Postdata(Urls.getworkestimation,data);
        workestimation=result.Data; 
        console.log(workestimation);
        return result.Status;
      }catch(error){
        console.log(error);
        return error;
      }  
    }

    export async function GetWorkInspection(workid)
    {
     // DID='0';
      try{
        let data=JSON.stringify({
          'WorkId':workid,
          'did':Did,
        });
        let result=await Postdata(Urls.getworkinspection,data);
        workinspection=result.Data;
        console.log(workinspection); 
        return result.Status;
      }catch(error){
        console.log(error);
        return error;
      }  
    }

    
    export async function loadPropsedWork(DID,workTtitle,path){
       DID=Did;
       //AsyncStorage.removeItem('workdetails'); //condition to clear must be implemented
       AsyncStorage.clear();
       console.log("offline loding started");
        fetch(Urls.getallotedwork,{
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            workTitle:workTtitle,
            did:DID,
          }),
          })
          .then((response) => response.json())
          .then((responseJson) => {
            //console.log(responseJson);
            AsyncStorage.setItem('workdetails',JSON.stringify(responseJson.Data));
            
          }).catch((error) =>{
            console.error(error);
          });
      }


    export default async function getdata()
      {
        try{
          let data1=await AsyncStorage.getItem('workdetails');//retriving data locally
          console.log("parsing entered");
          let data=JSON.parse(data1);
          data.map((item)=>{
            console.log(item);
          })

        }catch(error)
        {
          console.log(error);
        }
      }

    export async function GetworkList(DID,worktitle,path,options){ 
      try{
          console.log("Entered Api call");
        let ApiUrl=''
        heading=options;
        loginstatus=true;
        workList.length=0;
        switch(options)
        {
          case 'Alloted_work'://ApiUrl=(CUrls.getallotedwork;
            loadmore.opacity=1;
            if(loadmore.status){
              ApiUrl=Urls.nextpaglink+loadmore.pgcount;
            }else{
              loadmore.pgcount=1;
              ApiUrl=Urls.getallotedwork;
              temp_workList.length=0;
            } 
            console.log("enterd alloted work");
            break;
          case 'Workorder_work':ApiUrl=Urls.getworkorderlist;
          loadmore.pgcount=1;
          temp_workList.length=0;
          console.log("enterd work order work");
            break;
          case 'Notstarted_work':ApiUrl=Urls.getworklist;
          loadmore.pgcount=1;
          temp_workList.length=0;
          console.log("enterd Not Started work");
            break;
          case 'Inprogress_work':ApiUrl=Urls.getworklist;
          loadmore.pgcount=1;
          temp_workList.length=0;
          console.log("enterd Inprogress work");
            break;
          case 'onHold_work':ApiUrl=Urls.getworklist;
          loadmore.pgcount=1;
          temp_workList.length=0;
          console.log("enterd onhold work");
            break;
          case 'Cancelled_work':ApiUrl=Urls.getworklist;
          loadmore.pgcount=1;
          temp_workList.length=0;
          //workList.length=0;
          console.log("enterd Cancelled work");
            break;
          case 'Physically_work':ApiUrl=Urls.getworklist;
          loadmore.pgcount=1;
          temp_workList.length=0;
          //workList.length=0;
          console.log("enterd Physically work");
            break;
          case 'Financially_work':ApiUrl=Urls.getworklist;
          loadmore.pgcount=1;
          temp_workList.length=0;
          //workList.length=0;
          console.log("enterd financially work");
            break;
        }
          let data=JSON.stringify({
            'did':Did,
            'workTitle':worktitle  
          });
          let result=await Postdata(ApiUrl,data);
          //console.log(result);
          if(result.Data==null)
            {
              resolve(false); 
            }
            else{
              switch(ApiUrl){
                case Urls.getallotedwork:
                  result.Data.map(item=>{
                  let tempobj={
                  WorkId:item.WorkId,
                  WorkTitle:item.WorkTitle,
                  Plantype:item.PlanType,
                  Estimation:item.IsEstimationDetailsSubmitedbyIA,
                  Status:item.DispalyStatus,
                  color:(item.IsEstimationDetailsSubmitedbyIA)?{backgroundColor:'white'}:{backgroundColor:'skyblue'}
                  }
                  temp_workList.push(tempobj);
                  })  
                  workList = [...temp_workList];//array copy
                  break;
                case Urls.nextpaglink+loadmore.pgcount:
                  result.Data.map(item=>{
                  let tempobj={
                  WorkId:item.WorkId,
                  WorkTitle:item.WorkTitle,
                  Plantype:item.PlanType,
                  Estimation:item.IsEstimationDetailsSubmitedbyIA,
                  Status:item.DispalyStatus
                  }
                  temp_workList.push(tempobj);
                  })  
                  workList = [...temp_workList];//array copy
                  break;
                case Urls.getworkorderlist:
                  result.Data.map(item=>{
                  let tempobj={
                  WorkId:item.WorkId,
                  WorkTitle:item.WorkTitle,
                  Plantype:item.PlanType,
                  Status:item.Status
                  }
                  temp_workList.push(tempobj);
                  })  
                  workList = [...temp_workList];//array copy
                  break;
                case Urls.getworklist:
                  let tempobj={};
                  console.log("enterd url switch");
                  result.Data.map(item=>{
                  switch(item.Status){
                    case "Physically Completed":
                      tempobj={
                      WorkId:item.WorkId,
                      WorkTitle:item.WorkTitle,
                      Plantype:item.PlanType,
                      Status:item.Status,
                      }
                      Physicallycompleted.push(tempobj);
                      //workList = [...Physicallycompleted];
                      console.log("enterd p complted");
                      break;
                    case "Financially Completed":
                      tempobj={
                      WorkId:item.WorkId,
                      WorkTitle:item.WorkTitle,
                      Plantype:item.PlanType,
                      Status:item.Status,
                      }
                      financallycompleted.push(tempobj);
                      //workList = [...financallycompleted];
                      console.log("enterd F complted");
                      break;
                    case "In Progress":
                      tempobj={
                        WorkId:item.WorkId,
                        WorkTitle:item.WorkTitle,
                        Plantype:item.PlanType,
                        Status:item.Status,
                        }
                        inprogress.push(tempobj);
                        //workList = [...inprogress];
                      console.log("enterd inprgs complted");
                       break;
                    case "Not Started":
                      tempobj={
                      WorkId:item.WorkId,
                      WorkTitle:item.WorkTitle,
                      Plantype:item.PlanType,
                      Status:item.Status,
                      }
                      notstarted.push(tempobj);
                      //workList = [...notstarted];
                      console.log("enterd not stred complted");
                      break;
                    case "on Hold":
                      tempobj={
                      WorkId:item.WorkId,
                      WorkTitle:item.WorkTitle,
                      Plantype:item.PlanType,
                      Status:item.Status,
                      }
                      inhold.push(tempobj);
                      //workList = [...inhold];
                      console.log("enterd on hld ");
                      break;
                    case "cancelled":
                      tempobj={
                      WorkId:item.WorkId,
                      WorkTitle:item.WorkTitle,
                      Plantype:item.PlanType,
                      Status:item.Status,
                      }
                      cancalled.push(tempobj);
                      //workList = [...cancalled];
                      console.log("enterd cancelled complted");
                      break; 
                    }
                  });
                  break;
                }
              switch(options)
              {
                case 'Notstarted_work':workList = [...notstarted];
                  break;
                case 'Inprogress_work':workList = [...inprogress];
                  break;
                case 'onHold_work':workList = [...inhold];
                  break;
                case 'Cancelled_work':workList = [...cancalled];
                  break;
                case 'Physically_work':workList = [...Physicallycompleted];
                  break;
                case 'Financially_work':workList = [...financallycompleted];
                  break;
              }
        
            Physicallycompleted.length=0; //clearing array
            financallycompleted.length=0
            inprogress.length=0;
            cancalled.length=0;
            inhold.length=0;
            notstarted.length=0;
            return workList ;
          }
        }catch(error){
        console.log(error);
        return error;
      }
    }

    export async function Getworkdetails(workid,options){
      console.log("Entered work details Api call" +workid);
      let ApiUrl='';
      heading=options;
      loginstatus=true;
      switch(options)
      {
        case 'Alloted_work':ApiUrl=Urls.getallotedworkdetails;
        console.log("enterd alloted work");
          break;
        case 'Workorder_work':ApiUrl=Urls.getworkdetails;
          break;
        case 'Notstarted_work':ApiUrl=Urls.getworkdetails;
          break;
        case 'Inprogress_work':ApiUrl=Urls.getworkdetails;
          break;
        case 'onHold_work':ApiUrl=Urls.getworkdetails;
          break;
        case 'Cancelled_work':ApiUrl=Urls.getworkdetails;
          break;
        case 'Physically_work':ApiUrl=Urls.getworkdetails;
          break;
        case 'Financially_work':ApiUrl=Urls.getworkdetails;
          break;
      }
      try{
        let data=JSON.stringify({
            'WorkId':workid,
            'did':Did, 
        });
        let result=await Postdata(ApiUrl,data);
        if(result.Data==null){
          return false; 
        }
        else{
          workdetails = result.Data;
          if(options=='Alloted_work')
          {
          console.log("sanction work id ="+workdetails.SanctionWorkId);
          if(workdetails.SanctionWorkId==0) {
            isallotedtab=true;
            return true
          }                        
          else{
              data=JSON.stringify({
              'WorkId':workdetails.SanctionWorkId,
              'did':Did, 
            });
            ApiUrl=Urls.getworkdetails;
            console.log("sanction id data : "+data);
            result=await Postdata(ApiUrl,data);
            console.log("sanction id result : "+result.Data);
            if(result.Data==null){
              return true; 
            }
            else{
              workdetails = result.Data;
              isallotedtab=false;
            return true 
            }
          }
        }
        return true  
        }
      }catch(error){
        console.log(error);
        return error;
      }         
    }

    export async function Uploaddata(input,options,workid){
      console.log("Entered upload data Api call");
      let ApiUrl='';
      heading=options;
      loginstatus=true;
      let data=JSON.stringify({
        'WorkId':workid,
        'did':Did, 
      });
      switch(options)
      {
        case 'Alloted_work':ApiUrl=Urls.uploadallotedwork;
            data=JSON.stringify({
              'did':Did,
              'WorkId':workid, 
              'Remarks':input.remarks,
              'ProposedWorkId':input.ProposedWorkId,
              'Submitted':input.Submitted,
              'WorkEstimationId':input.WorkEstimationId,
              'WorkEstimateImages':input.WorkImages,
              'IMEI':'1234567890'
            });
        console.log("enterd alloted work");
          break;
        case 'Workorder_work':ApiUrl=Urls.uploadworkorder;
            console.log("entered work order")
            data=JSON.stringify({
              'WorkOrderFile':WorkOrderFile,
              'DateOfWorkOrder':input.dateonworkorder,
              'ContractorDetails':input.contractorname,
              'ExpectedCompletionDate':input.expectedcompletiondate,
              'TenderCost':input.tendercost,
              'HandoverAgency':input.handoveragency,
              'did':Did,
              'WorkId':workid,  
            });
            console.log("data   : "+data);
          break;
        case 'Notstarted_work':ApiUrl=Urls.uploadstartwork;
            data=JSON.stringify({
              'AssignedUserId':userdetails.UserId, 
              'StartDate':input.workstartdate,
              'did':Did, 
              'WorkId':workid, 
            });
          break;
        case 'Inprogress_work':ApiUrl=Urls.uploadinprogress;
        console.log("entered inprogress in api call")
            data=JSON.stringify({
              'Progress':input.progress,
              'Remarks':input.remarks,
              'Submitted':input.Submitted,
              'IMEI':'00',
              'WorkInspectionId':input.WorkInspectionId,
              'Latitude':input.latitude,
              'Longitude':input.longitude,
              'did':Did, 
              'WorkId':workid,
              'WorkImages':input.WorkImages,
            });  
          break;
        case 'complete_work':ApiUrl=Urls.uploadcompletework;
            data=JSON.stringify({
              'ActualCompletionDate':input.dateofworkcompletion,
              'mbamount':input.workdoneamt,
              'workcompletiondescrtiption':input.description,
              'expendituredoc':expendituredoc,
              'did':Did,
              'WorkId':workid,   
            });
          break;
        case 'submitexpinditure':ApiUrl=Urls.uploadexpinditure;
        /*let validation_data6=[input.amtpaidnow,input.workdoneamt,input.dateofpayment,expendituredoc]
        validationflg=Validate(validation_data6,workid,options)*/
            data=JSON.stringify({
              'expenditureamount':input.amtpaidnow,
              'mbamount':input.workdoneamt,
              'Letterdt':input.dateofpayment,
              'expendituredoc':expendituredoc,
              'did':Did,
              'WorkId':workid, 
            });
          break;
        case 'Physically_work':ApiUrl=Urls.uploadfinalbill;
        /*let validation_data7=[input.amtpaidnow,input.dateofhandover,input.maintainenceperiod,input.dateofpayment]
        validationflg=Validate(validation_data7,workid,options)*/
            data=JSON.stringify({
              'expenditureamount':input.amtpaidnow,
              'handoverdate':input.dateofhandover,
              'maintenanceperiod':input.maintainenceperiod,
              'paymentdate':input.dateofpayment,
              'did':Did,
              'WorkId':workid,   
            });
          break;
      }
      try{
        console.log("data  ="+data);
        console.log("Api url   ="+ApiUrl);
        //if(validationflg){
        let result=await Postdata(ApiUrl,data);
        console.log(result);
        if(result.Status){
          return true; 
        }
        else{
         // workdetails = result.Data;  //array copy 
          return false 
        }
     // }
      }catch(error){
        console.log(error);
        return error;
      }         
    }



    export async function UploadFile(option,photoarry,id){
      try{
          let ApiUrl=Urls.uploadImage;
          console.log("entered upload file");
          let fnamearry=[];
          let picarray=[]
          photoarry.map(item=>{
            let url=item.photo_url;
            let filenames=url.split('/'); 
            fnamearry.push(filenames[filenames.length-1]);
            picarray.push(item.photo_url);
          })
          console.log(fnamearry);
          let result='';
          for(let i=0;i<picarray.length;i++)
          {
            console.log(i);
            switch(i)
            {
              case 0:console.log("0 entered");
                let formData = new FormData();
                formData.append('AllowedFileId','1') ;
                formData.append('did', '0');
                formData.append('File', {
                uri: picarray[0],
                name: fnamearry[0],
                type: 'image/jpg'
                });
                result=await Postfile(ApiUrl,formData);
                if(result==null){
                  return false; 
                }
                else{
                  if(option=='Workorder_work'){
                    console.log("workorder");
                    WorkOrderFile=result.Data;
                  }else{
                    console.log(" not workorder");
                    expendituredoc=result.Data;
                  }
                  
                }
                break;
              case 1:
                let formData1 = new FormData();
                formData1.append('AllowedFileId','1') ;
                formData1.append('did', '0');
                formData1.append('File', {
                uri: picarray[1],
                name: fnamearry[1],
                type: 'image/jpg'
                });
                result=await Postfile(ApiUrl,formData1);
                if(result==null){
                  return false; 
                }
                break;
              case 2:
                let formData2 = new FormData();
                formData2.append('AllowedFileId','1') ;
                formData2.append('did', '0');
                formData2.append('File', {
                uri: picarray[2],
                name: fnamearry[2],
                type: 'image/jpg'
                });
                result=await Postfile(ApiUrl,formData2);
                if(result==null){
                  return false; 
                }
                break;
              case 3:
                let formData3 = new FormData();
                formData3.append('AllowedFileId','1') ;
                formData3.append('did', '0');
                formData3.append('File', {
                uri: picarray[3],
                name: fnamearry[3],
                type: 'image/jpg'
                });
                result=await Postfile(ApiUrl,formData3);
                if(result==null){
                  return false; 
                }
                break; 
            }    
          }
          if(result.Status==true)
              {
                console.log(result)
                return true;
              }
        }
      catch(error){
        console.log(error);
        return error;
      } 
    }

    export async function Validate(data,workid,options){
      try{
        let result=true;
        let error=validationerrors.Alloted_work;
        let index=0;
        let errorindex=0;
        errmsg="";
        switch(options)
        {
          case 'Alloted_work':
            error=validationerrors.Alloted_work;
            index=0;
            data.map(value=>{
              if(value===""){
                result=false;
                errorindex=index;
              }
              index++;
            });
            if(!result){
              errmsg=error[errorindex]
            }
            console.log("validate alloted= "+result);
            return result;
            break;
          case 'Workorder_work':
            error=validationerrors.Workorder_work;
            index=0;
            data.map(value=>{
              if(value==""){
                result=false;
                errorindex=index;
              }
              index++;
            });
            if(!result){
              errmsg=error[errorindex]
            }
            //Alert.alert(error[errorindex])
            console.log("validate alloted= "+result);
            return result;
            break;
          case 'Notstarted_work':
            error=validationerrors.Notstarted_work;
            index=0;
            data.map(value=>{
              if(value==""){
                result=false;
                errorindex=index;
              }
              index++;
            });
            //Alert.alert(error[errorindex])
            if(!result){
              errmsg=error[errorindex]
            }
            console.log("validate alloted= "+result);
            return result;
            break;
          case 'Inprogress_work':
            error=validationerrors.Inprogress_work;
            index=0;
            data.map(value=>{
              if(value==""){
                result=false;
                errorindex=index;
              }
              index++;
            });
            if(!result){
              errmsg=error[errorindex]
            }
            //Alert.alert(error[errorindex])
            console.log("validate alloted= "+result);
            return result;
            break;
          case 'complete_work':
            error=validationerrors.complete_work;
            index=0;
            data.map(value=>{
              if(value==""){
                result=false;
                errorindex=index;
              }
              index++;
            });
            if(!result){
              errmsg=error[errorindex]
            }
            //Alert.alert(error[errorindex])
            console.log("validate alloted= "+result);
            return result;
            break;
          case 'submitexpinditure':
            error=validationerrors.submitexpinditure;
            index=0;
            data.map(value=>{
              if(value==""){
                result=false;
                errorindex=index;
              }
              index++;
            });
            if(!result){
              errmsg=error[errorindex]
            }
            //Alert.alert(error[errorindex])
            console.log("validate alloted= "+result);
            return result;
            break;
          case 'Physically_work':
            error=validationerrors.Physically_work;
            index=0;
            data.map(value=>{
              if(value==""){
                result=false;
                errorindex=index;
              }
              index++;
            });
            if(!result){
              errmsg=error[errorindex]
            }
            //Alert.alert(error[errorindex])
            console.log("validate alloted= "+result);
            return result;
            break; 
        }
      }catch(err){
        console.log(err);
        return false;
      }
    }

    export {heading,loginstatus};