import React from 'react';
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableHighlight,
  ScrollView, 
  Switch,
  ImageBackground
} from 'react-native';
import styles from './styles';
import BackButton from '../../components/BackButton/BackButton';
import Actionbutton from '../../components/ActionButton/ActionButton';
import MenuImage from '../../components/MenuImage/MenuImage';
import ViewIngredientsButton from '../../components/ViewIngredientsButton/ViewIngredientsButton';
import { Table, TableWrapper, Row } from 'react-native-table-component';
import {workdetails,workestimation,workinspection,isallotedtab,deletebtnstyle,Estimationsubmited} from '../../data/ApiCalls';

export default class WorkDetailsScreen extends React.Component {
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

loadtable(option){
  console.log("entered load table")
    switch(option)
    {
      case 'Alloted_work':
        if(!isallotedtab){
          var tableData =[
            ['Work Id ',(workdetails.WorkId==""||workdetails.WorkId==null)?"NA":workdetails.WorkId],
            ['Work Title ',(workdetails.Work_Title==""||workdetails.Work_Title==null)?"NA":workdetails.Work_Title],
            ['District ',(workdetails.District==""||workdetails.District==null)?"NA":workdetails.District],
            ['Taluka ',(workdetails.Taluka==""||workdetails.Taluka==null)?"NA":workdetails.Taluka],
            ['Village ',(workdetails.Village==""||workdetails.Village==null)?"NA":workdetails.Village],
            ['Plan ',(workdetails.Plan==""||workdetails.Plan==null)?"NA":workdetails.Plan],
            ['Scheme ',(workdetails.Scheme==""||workdetails.Scheme==null)?"NA":workdetails.Scheme],
            ['Status ',(workdetails.Status==""||workdetails.Status==null)?"NA":workdetails.Status],
            ['Latitude ',(workdetails.Latitude==""||workdetails.Latitude==null)?"NA":workdetails.Latitude],
            ['Longitude ',(workdetails.Longitude==""||workdetails.Longitude==null)?"NA":workdetails.Longitude],
            ['RemarkOnSite',(workdetails.RemarkOnSite==""||workdetails.RemarkOnSite==null)?"NA":workdetails.RemarkOnSite],
            ['DateOfSitePhoto',(workdetails.DateOfSitePhoto==""||workdetails.DateOfSitePhoto==null)?"NA":workdetails.DateOfSitePhoto],
            ['AA_Amount',(workdetails.AA_Amount==""||workdetails.AA_Amount==null)?"NA":workdetails.AA_Amount],
            ['AdminApprovalDate',(workdetails.AdminApprovalDate==""||workdetails.AdminApprovalDate==null)?"NA":workdetails.AdminApprovalDate],
            ['Contractor',(workdetails.Contractor==""||workdetails.Contractor==null)?"NA":workdetails.Contractor],
            ['Expected Complitiondate',(workdetails.ExpectedComplitiondate==""||workdetails.ExpectedComplitiondate==null)?"NA":workdetails.ExpectedComplitiondate],
            ['TenderCost',(workdetails.TenderCost==""||workdetails.TenderCost==null)?"NA":workdetails.TenderCost],
            ['HandoverAgency',(workdetails.HandoverAgency==""||workdetails.HandoverAgency==null)?"NA":workdetails.HandoverAgency],
            ['Total FundReceived',(workdetails.TotalFundReceived==""||workdetails.TotalFundReceived==null)?"NA":workdetails.TotalFundReceived],
            ['FundWithdrawl',(workdetails.FundWithdrawl==""||workdetails.FundWithdrawl==null)?"NA":workdetails.FundWithdrawl],
            ['WorkStartDate',(workdetails.WorkStartDate==""||workdetails.WorkStartDate==null)?"NA":workdetails.WorkStartDate],
            ['Work Progress',(workdetails.WorkProgress==""||workdetails.WorkProgress==null)?"NA":workdetails.WorkProgress],
            ['Remark In WorkProgress',(workdetails.RemarkInWorkProgress==""||workdetails.RemarkInWorkProgress==null)?"NA":workdetails.RemarkInWorkProgress],
            ['Work DoneAmount',(workdetails.WorkDoneAmount==""||workdetails.WorkDoneAmount==null)?"NA":workdetails.WorkDoneAmount],
            ['Previous Expenditure',(workdetails.PreviousExpenditure==""||workdetails.PreviousExpenditure==null)?"NA":workdetails.PreviousExpenditure],
            ['Cash In Hand',(workdetails.CashInHand==""||workdetails.CashInHand==null)?"NA":workdetails.CashInHand],
            ['Amount paid Now',(workdetails.AmountPaidNow==""||workdetails.AmountPaidNow==null)?"NA":workdetails.AmountPaidNow],
            ['PaymentDate',(workdetails.PaymentDate==""||workdetails.PaymentDate==null)?"NA":workdetails.PaymentDate],
            ['TotalPay To Agency',(workdetails.TotalPayToAgency==""||workdetails.TotalPayToAgency==null)?"NA":workdetails.TotalPayToAgency],
            ['Balance Payment Agency',(workdetails.BalancePaymentAgency==""||workdetails.BalancePaymentAgency==null)?"NA":workdetails.BalancePaymentAgency],
            ['Work ComplitionDate',(workdetails.WorkComplitionDate==""||workdetails.WorkComplitionDate==null)?"NA":workdetails.WorkComplitionDate],
            ['Maintaince Period',(workdetails.MaintaincePeriod==""||workdetails.MaintaincePeriod==null)?"NA":workdetails.MaintaincePeriod],
            ['Completion Description',(workdetails.CompletionDescription==""||workdetails.CompletionDescription==null)?"NA":workdetails.CompletionDescription],
            ['SavingAA',(workdetails.SavingAA==""||workdetails.SavingAA==null)?"NA":workdetails.SavingAA],
            ['SavingFR',(workdetails.SavingFR==""||workdetails.SavingFR==null)?"NA":workdetails.SavingFR],
            ['Saving FundWithdraw',(workdetails.SavingFundWithdraw==""||workdetails.SavingFundWithdraw==null)?"NA":workdetails.SavingFundWithdraw],
            ['Handover Date',(workdetails.HandoverDate==""||workdetails.HandoverDate==null)?"NA":workdetails.HandoverDate]
          ]
          return tableData;
        }
        else{var tableData =[
          ['Work Id ',(workdetails.WorkId==""||workdetails.WorkId==null)?"NA":workdetails.WorkId],
          ['Work Title ',(workdetails.Work_Title==""||workdetails.Work_Title==null)?"NA":workdetails.Work_Title],
          ['District ',(workdetails.District==""||workdetails.District==null)?"NA":workdetails.District],
          ['Taluka ',(workdetails.Taluka==""||workdetails.Taluka==null)?"NA":workdetails.Taluka],
          ['Village ',(workdetails.Village==""||workdetails.Village==null)?"NA":workdetails.Village],
          ['Plan ',(workdetails.Plan==""||workdetails.Plan==null)?"NA":workdetails.Plan],
          ['Scheme ',(workdetails.Scheme==""||workdetails.Scheme==null)?"NA":workdetails.Scheme],
          ['IAName ',(workdetails.IAName==""||workdetails.IAName==null)?"NA":workdetails.IAName],
          ['Ward ',(workdetails.Ward==""||workdetails.Ward==null)?"NA":workdetails.Ward/*item.Details.Data.IAName*/],
          ['Status ',(workdetails.Status==""||workdetails.Status==null)?"NA":workdetails.Status],
          ['Work Estimation ',(workdetails.IsEstimationDetailsSubmitedbyIA)?"Submited":"Not Submited"/*item.Details.Data.IAName*/]
        ]
        return tableData;
      }
        break;
      case 'Workorder_work':
        var tableData =[
            ['Work Id ',(workdetails.WorkId==""||workdetails.WorkId==null)?"NA":workdetails.WorkId],
            ['Work Title ',(workdetails.Work_Title==""||workdetails.Work_Title==null)?"NA":workdetails.Work_Title],
            ['District ',(workdetails.District==""||workdetails.District==null)?"NA":workdetails.District],
            ['Taluka ',(workdetails.Taluka==""||workdetails.Taluka==null)?"NA":workdetails.Taluka],
            ['Village ',(workdetails.Village==""||workdetails.Village==null)?"NA":workdetails.Village],
            ['Plan ',(workdetails.Plan==""||workdetails.Plan==null)?"NA":workdetails.Plan],
            ['Scheme ',(workdetails.Scheme==""||workdetails.Scheme==null)?"NA":workdetails.Scheme],
            ['Status ',(workdetails.Status==""||workdetails.Status==null)?"NA":workdetails.Status],
            ['Latitude ',(workdetails.Latitude==""||workdetails.Latitude==null)?"NA":workdetails.Latitude],
            ['Longitude ',(workdetails.Longitude==""||workdetails.Longitude==null)?"NA":workdetails.Longitude],
            ['RemarkOnSite',(workdetails.RemarkOnSite==""||workdetails.RemarkOnSite==null)?"NA":workdetails.RemarkOnSite],
            ['DateOfSitePhoto',(workdetails.DateOfSitePhoto==""||workdetails.DateOfSitePhoto==null)?"NA":workdetails.DateOfSitePhoto],
            ['AA_Amount',(workdetails.AA_Amount==""||workdetails.AA_Amount==null)?"NA":workdetails.AA_Amount],
            ['AdminApprovalDate',(workdetails.AdminApprovalDate==""||workdetails.AdminApprovalDate==null)?"NA":workdetails.AdminApprovalDate],
            ['Contractor',(workdetails.Contractor==""||workdetails.Contractor==null)?"NA":workdetails.Contractor],
            ['Expected Complitiondate',(workdetails.ExpectedComplitiondate==""||workdetails.ExpectedComplitiondate==null)?"NA":workdetails.ExpectedComplitiondate],
            ['TenderCost',(workdetails.TenderCost==""||workdetails.TenderCost==null)?"NA":workdetails.TenderCost]
          ]
        return tableData;
        break;
      case 'Notstarted_work':
        var tableData =[
          ['Work Id ',(workdetails.WorkId==""||workdetails.WorkId==null)?"NA":workdetails.WorkId],
            ['Work Title ',(workdetails.Work_Title==""||workdetails.Work_Title==null)?"NA":workdetails.Work_Title],
            ['District ',(workdetails.District==""||workdetails.District==null)?"NA":workdetails.District],
            ['Taluka ',(workdetails.Taluka==""||workdetails.Taluka==null)?"NA":workdetails.Taluka],
            ['Village ',(workdetails.Village==""||workdetails.Village==null)?"NA":workdetails.Village],
            ['Plan ',(workdetails.Plan==""||workdetails.Plan==null)?"NA":workdetails.Plan],
            ['Scheme ',(workdetails.Scheme==""||workdetails.Scheme==null)?"NA":workdetails.Scheme],
            ['Status ',(workdetails.Status==""||workdetails.Status==null)?"NA":workdetails.Status],
            ['Latitude ',(workdetails.Latitude==""||workdetails.Latitude==null)?"NA":workdetails.Latitude],
            ['Longitude ',(workdetails.Longitude==""||workdetails.Longitude==null)?"NA":workdetails.Longitude],
            ['RemarkOnSite',(workdetails.RemarkOnSite==""||workdetails.RemarkOnSite==null)?"NA":workdetails.RemarkOnSite],
            ['DateOfSitePhoto',(workdetails.DateOfSitePhoto==""||workdetails.DateOfSitePhoto==null)?"NA":workdetails.DateOfSitePhoto],
            ['AA_Amount',(workdetails.AA_Amount==""||workdetails.AA_Amount==null)?"NA":workdetails.AA_Amount],
            ['AdminApprovalDate',(workdetails.AdminApprovalDate==""||workdetails.AdminApprovalDate==null)?"NA":workdetails.AdminApprovalDate],
            ['Contractor',(workdetails.Contractor==""||workdetails.Contractor==null)?"NA":workdetails.Contractor],
            ['Expected Complitiondate',(workdetails.ExpectedComplitiondate==""||workdetails.ExpectedComplitiondate==null)?"NA":workdetails.ExpectedComplitiondate],
            ['TenderCost',(workdetails.TenderCost==""||workdetails.TenderCost==null)?"NA":workdetails.TenderCost],
            ['HandoverAgency',(workdetails.HandoverAgency==""||workdetails.HandoverAgency==null)?"NA":workdetails.HandoverAgency],
            ['Total FundReceived',(workdetails.TotalFundReceived==""||workdetails.TotalFundReceived==null)?"NA":workdetails.TotalFundReceived]
          ]
        return tableData;
        break;
      case 'Inprogress_work':
          var tableData =[
            ['Work Id ',(workdetails.WorkId==""||workdetails.WorkId==null)?"NA":workdetails.WorkId],
            ['Work Title ',(workdetails.Work_Title==""||workdetails.Work_Title==null)?"NA":workdetails.Work_Title],
            ['District ',(workdetails.District==""||workdetails.District==null)?"NA":workdetails.District],
            ['Taluka ',(workdetails.Taluka==""||workdetails.Taluka==null)?"NA":workdetails.Taluka],
            ['Village ',(workdetails.Village==""||workdetails.Village==null)?"NA":workdetails.Village],
            ['Plan ',(workdetails.Plan==""||workdetails.Plan==null)?"NA":workdetails.Plan],
            ['Scheme ',(workdetails.Scheme==""||workdetails.Scheme==null)?"NA":workdetails.Scheme],
            ['Status ',(workdetails.Status==""||workdetails.Status==null)?"NA":workdetails.Status],
            ['Latitude ',(workdetails.Latitude==""||workdetails.Latitude==null)?"NA":workdetails.Latitude],
            ['Longitude ',(workdetails.Longitude==""||workdetails.Longitude==null)?"NA":workdetails.Longitude],
            ['RemarkOnSite',(workdetails.RemarkOnSite==""||workdetails.RemarkOnSite==null)?"NA":workdetails.RemarkOnSite],
            ['DateOfSitePhoto',(workdetails.DateOfSitePhoto==""||workdetails.DateOfSitePhoto==null)?"NA":workdetails.DateOfSitePhoto],
            ['AA_Amount',(workdetails.AA_Amount==""||workdetails.AA_Amount==null)?"NA":workdetails.AA_Amount],
            ['AdminApprovalDate',(workdetails.AdminApprovalDate==""||workdetails.AdminApprovalDate==null)?"NA":workdetails.AdminApprovalDate],
            ['Contractor',(workdetails.Contractor==""||workdetails.Contractor==null)?"NA":workdetails.Contractor],
            ['Expected Complitiondate',(workdetails.ExpectedComplitiondate==""||workdetails.ExpectedComplitiondate==null)?"NA":workdetails.ExpectedComplitiondate],
            ['TenderCost',(workdetails.TenderCost==""||workdetails.TenderCost==null)?"NA":workdetails.TenderCost],
            ['HandoverAgency',(workdetails.HandoverAgency==""||workdetails.HandoverAgency==null)?"NA":workdetails.HandoverAgency],
            ['Total FundReceived',(workdetails.TotalFundReceived==""||workdetails.TotalFundReceived==null)?"NA":workdetails.TotalFundReceived],
            ['FundWithdrawl',(workdetails.FundWithdrawl==""||workdetails.FundWithdrawl==null)?"NA":workdetails.FundWithdrawl],
            ['WorkStartDate',(workdetails.WorkStartDate==""||workdetails.WorkStartDate==null)?"NA":workdetails.WorkStartDate],
            ['Work Progress',(workdetails.WorkProgress==""||workdetails.WorkProgress==null)?"NA":workdetails.WorkProgress]
            //['Remark In WorkProgress',(workdetails.RemarkInWorkProgress=="")?"NA":workdetails.RemarkInWorkProgress]
          ] 
        return tableData;
        break;
      case 'onHold_work':
        var tableData =[
          ['Work Id ',(workdetails.WorkId==""||workdetails.WorkId==null)?"NA":workdetails.WorkId],
            ['Work Title ',(workdetails.Work_Title==""||workdetails.Work_Title==null)?"NA":workdetails.Work_Title],
            ['District ',(workdetails.District==""||workdetails.District==null)?"NA":workdetails.District],
            ['Taluka ',(workdetails.Taluka==""||workdetails.Taluka==null)?"NA":workdetails.Taluka],
            ['Village ',(workdetails.Village==""||workdetails.Village==null)?"NA":workdetails.Village],
            ['Plan ',(workdetails.Plan==""||workdetails.Plan==null)?"NA":workdetails.Plan],
            ['Scheme ',(workdetails.Scheme==""||workdetails.Scheme==null)?"NA":workdetails.Scheme],
            ['Status ',(workdetails.Status==""||workdetails.Status==null)?"NA":workdetails.Status],
            ['Latitude ',(workdetails.Latitude==""||workdetails.Latitude==null)?"NA":workdetails.Latitude],
            ['Longitude ',(workdetails.Longitude==""||workdetails.Longitude==null)?"NA":workdetails.Longitude],
            ['RemarkOnSite',(workdetails.RemarkOnSite==""||workdetails.RemarkOnSite==null)?"NA":workdetails.RemarkOnSite],
            ['DateOfSitePhoto',(workdetails.DateOfSitePhoto==""||workdetails.DateOfSitePhoto==null)?"NA":workdetails.DateOfSitePhoto],
            ['AA_Amount',(workdetails.AA_Amount==""||workdetails.AA_Amount==null)?"NA":workdetails.AA_Amount],
            ['AdminApprovalDate',(workdetails.AdminApprovalDate==""||workdetails.AdminApprovalDate==null)?"NA":workdetails.AdminApprovalDate],
            ['Contractor',(workdetails.Contractor==""||workdetails.Contractor==null)?"NA":workdetails.Contractor],
            ['Expected Complitiondate',(workdetails.ExpectedComplitiondate==""||workdetails.ExpectedComplitiondate==null)?"NA":workdetails.ExpectedComplitiondate],
            ['TenderCost',(workdetails.TenderCost==""||workdetails.TenderCost==null)?"NA":workdetails.TenderCost],
            ['HandoverAgency',(workdetails.HandoverAgency==""||workdetails.HandoverAgency==null)?"NA":workdetails.HandoverAgency],
            ['Total FundReceived',(workdetails.TotalFundReceived==""||workdetails.TotalFundReceived==null)?"NA":workdetails.TotalFundReceived],
            ['FundWithdrawl',(workdetails.FundWithdrawl==""||workdetails.FundWithdrawl==null)?"NA":workdetails.FundWithdrawl],
            ['WorkStartDate',(workdetails.WorkStartDate==""||workdetails.WorkStartDate==null)?"NA":workdetails.WorkStartDate],
            ['Work Progress',(workdetails.WorkProgress==""||workdetails.WorkProgress==null)?"NA":workdetails.WorkProgress],  
          ['Remark In WorkProgress',(workdetails.RemarkInWorkProgress==""||workdetails.RemarkInWorkProgress==null)?"NA":workdetails.RemarkInWorkProgress]
        ]
        return tableData;
        break;
      case 'Cancelled_work':
        var tableData =[
          ['Work Id ',(workdetails.WorkId==""||workdetails.WorkId==null)?"NA":workdetails.WorkId],
          ['Work Title ',(workdetails.Work_Title==""||workdetails.Work_Title==null)?"NA":workdetails.Work_Title],
          ['District ',(workdetails.District==""||workdetails.District==null)?"NA":workdetails.District],
          ['Taluka ',(workdetails.Taluka==""||workdetails.Taluka==null)?"NA":workdetails.Taluka],
          ['Village ',(workdetails.Village==""||workdetails.Village==null)?"NA":workdetails.Village],
          ['Plan ',(workdetails.Plan==""||workdetails.Plan==null)?"NA":workdetails.Plan],
          ['Scheme ',(workdetails.Scheme==""||workdetails.Scheme==null)?"NA":workdetails.Scheme],
          ['Status ',(workdetails.Status==""||workdetails.Status==null)?"NA":workdetails.Status],
          ['Latitude ',(workdetails.Latitude==""||workdetails.Latitude==null)?"NA":workdetails.Latitude],
          ['Longitude ',(workdetails.Longitude==""||workdetails.Longitude==null)?"NA":workdetails.Longitude],
          ['RemarkOnSite',(workdetails.RemarkOnSite==""||workdetails.RemarkOnSite==null)?"NA":workdetails.RemarkOnSite],
          ['DateOfSitePhoto',(workdetails.DateOfSitePhoto==""||workdetails.DateOfSitePhoto==null)?"NA":workdetails.DateOfSitePhoto],
          ['AA_Amount',(workdetails.AA_Amount==""||workdetails.AA_Amount==null)?"NA":workdetails.AA_Amount],
          ['AdminApprovalDate',(workdetails.AdminApprovalDate==""||workdetails.AdminApprovalDate==null)?"NA":workdetails.AdminApprovalDate],
          ['Contractor',(workdetails.Contractor==""||workdetails.Contractor==null)?"NA":workdetails.Contractor],
          ['Expected Complitiondate',(workdetails.ExpectedComplitiondate==""||workdetails.ExpectedComplitiondate==null)?"NA":workdetails.ExpectedComplitiondate],
          ['TenderCost',(workdetails.TenderCost==""||workdetails.TenderCost==null)?"NA":workdetails.TenderCost],
          ['HandoverAgency',(workdetails.HandoverAgency==""||workdetails.HandoverAgency==null)?"NA":workdetails.HandoverAgency],
          ['Total FundReceived',(workdetails.TotalFundReceived==""||workdetails.TotalFundReceived==null)?"NA":workdetails.TotalFundReceived],
          ['FundWithdrawl',(workdetails.FundWithdrawl==""||workdetails.FundWithdrawl==null)?"NA":workdetails.FundWithdrawl],
          ['WorkStartDate',(workdetails.WorkStartDate==""||workdetails.WorkStartDate==null)?"NA":workdetails.WorkStartDate],
          ['Work Progress',(workdetails.WorkProgress==""||workdetails.WorkProgress==null)?"NA":workdetails.WorkProgress],  
        ['Remark In WorkProgress',(workdetails.RemarkInWorkProgress==""||workdetails.RemarkInWorkProgress==null)?"NA":workdetails.RemarkInWorkProgress]
      ]
        return tableData;
        break;
      case 'Physically_work':
        var tableData =[
          ['Work Id ',(workdetails.WorkId==""||workdetails.WorkId==null)?"NA":workdetails.WorkId],
            ['Work Title ',(workdetails.Work_Title==""||workdetails.Work_Title==null)?"NA":workdetails.Work_Title],
            ['District ',(workdetails.District==""||workdetails.District==null)?"NA":workdetails.District],
            ['Taluka ',(workdetails.Taluka==""||workdetails.Taluka==null)?"NA":workdetails.Taluka],
            ['Village ',(workdetails.Village==""||workdetails.Village==null)?"NA":workdetails.Village],
            ['Plan ',(workdetails.Plan==""||workdetails.Plan==null)?"NA":workdetails.Plan],
            ['Scheme ',(workdetails.Scheme==""||workdetails.Scheme==null)?"NA":workdetails.Scheme],
            ['Status ',(workdetails.Status==""||workdetails.Status==null)?"NA":workdetails.Status],
            ['Latitude ',(workdetails.Latitude==""||workdetails.Latitude==null)?"NA":workdetails.Latitude],
            ['Longitude ',(workdetails.Longitude==""||workdetails.Longitude==null)?"NA":workdetails.Longitude],
            ['RemarkOnSite',(workdetails.RemarkOnSite==""||workdetails.RemarkOnSite==null)?"NA":workdetails.RemarkOnSite],
            ['DateOfSitePhoto',(workdetails.DateOfSitePhoto==""||workdetails.DateOfSitePhoto==null)?"NA":workdetails.DateOfSitePhoto],
            ['AA_Amount',(workdetails.AA_Amount==""||workdetails.AA_Amount==null)?"NA":workdetails.AA_Amount],
            ['AdminApprovalDate',(workdetails.AdminApprovalDate==""||workdetails.AdminApprovalDate==null)?"NA":workdetails.AdminApprovalDate],
            ['Contractor',(workdetails.Contractor==""||workdetails.Contractor==null)?"NA":workdetails.Contractor],
            ['Expected Complitiondate',(workdetails.ExpectedComplitiondate==""||workdetails.ExpectedComplitiondate==null)?"NA":workdetails.ExpectedComplitiondate],
            ['TenderCost',(workdetails.TenderCost==""||workdetails.TenderCost==null)?"NA":workdetails.TenderCost],
            ['HandoverAgency',(workdetails.HandoverAgency==""||workdetails.HandoverAgency==null)?"NA":workdetails.HandoverAgency],
            ['Total FundReceived',(workdetails.TotalFundReceived==""||workdetails.TotalFundReceived==null)?"NA":workdetails.TotalFundReceived],
            ['FundWithdrawl',(workdetails.FundWithdrawl==""||workdetails.FundWithdrawl==null)?"NA":workdetails.FundWithdrawl],
            ['WorkStartDate',(workdetails.WorkStartDate==""||workdetails.WorkStartDate==null)?"NA":workdetails.WorkStartDate],
            ['Work Progress',(workdetails.WorkProgress==""||workdetails.WorkProgress==null)?"NA":workdetails.WorkProgress],
            ['Remark In WorkProgress',(workdetails.RemarkInWorkProgress==""||workdetails.RemarkInWorkProgress==null)?"NA":workdetails.RemarkInWorkProgress],
            ['Work DoneAmount',(workdetails.WorkDoneAmount==""||workdetails.WorkDoneAmount==null)?"NA":workdetails.WorkDoneAmount],
            ['Previous Expenditure',(workdetails.PreviousExpenditure==""||workdetails.PreviousExpenditure==null)?"NA":workdetails.PreviousExpenditure],
            ['Cash In Hand',(workdetails.CashInHand==""||workdetails.CashInHand==null)?"NA":workdetails.CashInHand],
            ['Amount paid Now',(workdetails.AmountPaidNow==""||workdetails.AmountPaidNow==null)?"NA":workdetails.AmountPaidNow],
            ['PaymentDate',(workdetails.PaymentDate==""||workdetails.PaymentDate==null)?"NA":workdetails.PaymentDate],
            ['TotalPay To Agency',(workdetails.TotalPayToAgency==""||workdetails.TotalPayToAgency==null)?"NA":workdetails.TotalPayToAgency],
            ['Balance Payment Agency',(workdetails.BalancePaymentAgency==""||workdetails.BalancePaymentAgency==null)?"NA":workdetails.BalancePaymentAgency]
        ]
        return tableData;
        break;
      case 'Financially_work':
        var tableData =[
          ['Work Id ',(workdetails.WorkId==""||workdetails.WorkId==null)?"NA":workdetails.WorkId],
          ['Work Title ',(workdetails.Work_Title==""||workdetails.Work_Title==null)?"NA":workdetails.Work_Title],
          ['District ',(workdetails.District==""||workdetails.District==null)?"NA":workdetails.District],
          ['Taluka ',(workdetails.Taluka==""||workdetails.Taluka==null)?"NA":workdetails.Taluka],
          ['Village ',(workdetails.Village==""||workdetails.Village==null)?"NA":workdetails.Village],
          ['Plan ',(workdetails.Plan==""||workdetails.Plan==null)?"NA":workdetails.Plan],
          ['Scheme ',(workdetails.Scheme==""||workdetails.Scheme==null)?"NA":workdetails.Scheme],
          ['Status ',(workdetails.Status==""||workdetails.Status==null)?"NA":workdetails.Status],
          ['Latitude ',(workdetails.Latitude==""||workdetails.Latitude==null)?"NA":workdetails.Latitude],
          ['Longitude ',(workdetails.Longitude==""||workdetails.Longitude==null)?"NA":workdetails.Longitude],
          ['RemarkOnSite',(workdetails.RemarkOnSite==""||workdetails.RemarkOnSite==null)?"NA":workdetails.RemarkOnSite],
          ['DateOfSitePhoto',(workdetails.DateOfSitePhoto==""||workdetails.DateOfSitePhoto==null)?"NA":workdetails.DateOfSitePhoto],
          ['AA_Amount',(workdetails.AA_Amount==""||workdetails.AA_Amount==null)?"NA":workdetails.AA_Amount],
          ['AdminApprovalDate',(workdetails.AdminApprovalDate==""||workdetails.AdminApprovalDate==null)?"NA":workdetails.AdminApprovalDate],
          ['Contractor',(workdetails.Contractor==""||workdetails.Contractor==null)?"NA":workdetails.Contractor],
          ['Expected Complitiondate',(workdetails.ExpectedComplitiondate==""||workdetails.ExpectedComplitiondate==null)?"NA":workdetails.ExpectedComplitiondate],
          ['TenderCost',(workdetails.TenderCost==""||workdetails.TenderCost==null)?"NA":workdetails.TenderCost],
          ['HandoverAgency',(workdetails.HandoverAgency==""||workdetails.HandoverAgency==null)?"NA":workdetails.HandoverAgency],
          ['Total FundReceived',(workdetails.TotalFundReceived==""||workdetails.TotalFundReceived==null)?"NA":workdetails.TotalFundReceived],
          ['FundWithdrawl',(workdetails.FundWithdrawl==""||workdetails.FundWithdrawl==null)?"NA":workdetails.FundWithdrawl],
          ['WorkStartDate',(workdetails.WorkStartDate==""||workdetails.WorkStartDate==null)?"NA":workdetails.WorkStartDate],
          ['Work Progress',(workdetails.WorkProgress==""||workdetails.WorkProgress==null)?"NA":workdetails.WorkProgress],
          ['Remark In WorkProgress',(workdetails.RemarkInWorkProgress==""||workdetails.RemarkInWorkProgress==null)?"NA":workdetails.RemarkInWorkProgress],
          ['Work DoneAmount',(workdetails.WorkDoneAmount==""||workdetails.WorkDoneAmount==null)?"NA":workdetails.WorkDoneAmount],
          ['Previous Expenditure',(workdetails.PreviousExpenditure==""||workdetails.PreviousExpenditure==null)?"NA":workdetails.PreviousExpenditure],
          ['Cash In Hand',(workdetails.CashInHand==""||workdetails.CashInHand==null)?"NA":workdetails.CashInHand],
          ['Amount paid Now',(workdetails.AmountPaidNow==""||workdetails.AmountPaidNow==null)?"NA":workdetails.AmountPaidNow],
          ['PaymentDate',(workdetails.PaymentDate==""||workdetails.PaymentDate==null)?"NA":workdetails.PaymentDate],
          ['TotalPay To Agency',(workdetails.TotalPayToAgency==""||workdetails.TotalPayToAgency==null)?"NA":workdetails.TotalPayToAgency],
          ['Balance Payment Agency',(workdetails.BalancePaymentAgency==""||workdetails.BalancePaymentAgency==null)?"NA":workdetails.BalancePaymentAgency],
          ['Work ComplitionDate',(workdetails.WorkComplitionDate==""||workdetails.WorkComplitionDate==null)?"NA":workdetails.WorkComplitionDate],
          ['Maintaince Period',(workdetails.MaintaincePeriod==""||workdetails.MaintaincePeriod==null)?"NA":workdetails.MaintaincePeriod],
          ['Completion Description',(workdetails.CompletionDescription==""||workdetails.CompletionDescription==null)?"NA":workdetails.CompletionDescription],
          ['SavingAA',(workdetails.SavingAA==""||workdetails.SavingAA==null)?"NA":workdetails.SavingAA],
          ['SavingFR',(workdetails.SavingFR==""||workdetails.SavingFR==null)?"NA":workdetails.SavingFR],
          ['Saving FundWithdraw',(workdetails.SavingFundWithdraw==""||workdetails.SavingFundWithdraw==null)?"NA":workdetails.SavingFundWithdraw],
          ['Handover Date',(workdetails.HandoverDate==""||workdetails.HandoverDate==null)?"NA":workdetails.HandoverDate],
        ]
        return tableData;
        break;    
    }
}

  render() {
    const { navigation } = this.props;
    let Estimation=true;
    let options=navigation.getParam('opt');
    let btntitle='';
    const tblheading=["Work Details"];
    const widthArr=[150, 240];
    let tableData =[];
    let uploadestimation=false;
    let opac=1;
    let mapopac=1;
   // this.props.navigation.setParams('opacity', 1);
    switch(options)
    {
      case 'Alloted_work':btntitle='Upload Site Photo';
      //Estimation=workdetails.workIsEstimationDetailsSubmitedbyIA;
      console.log("Estimation statun = "+Estimationsubmited.Status+"isallotedtab = "+isallotedtab)
      if(!Estimationsubmited.Status && isallotedtab){
        console.log("entered opac 1 = " +opac);
        opac=1;
      }else{
        console.log("entered opac 0 = " +opac);
        opac=0;
      }
      tableData=this.loadtable(options);
      uploadestimation=Estimation;
      console.log(tableData[0]);
        break;
      case 'Workorder_work':btntitle='Upload Work Order';
      tableData=this.loadtable(options)
        break;
      case 'Notstarted_work':btntitle='Start Work';
      //this.props.navigation.setParams('opacity', 0);
      //deletebtnstyle.opacity=0;
      tableData=this.loadtable(options)
        break;
      case 'Inprogress_work':btntitle='Upload Work Inspection';
      tableData=this.loadtable(options)
      if(workinspection.PreviousProgress>=100) {
        btntitle='Complete Work';
        options='complete_work';
      }/*else if(false){
        btntitle='Complete Work';
        options='complete_work';
      }*/else{
        btntitle='Upload Work Inspection';
        options='Inprogress_work';
      }

        break;
      case 'onHold_work':btntitle='Upload Work Order';
      tableData=this.loadtable(options)
      Estimation=false;
        break;
      case 'Cancelled_work':btntitle='Upload Work Order';
      tableData=this.loadtable(options)
      Estimation=false;
        break;
      case 'Physically_work':btntitle='Upload Final bill';
      tableData=this.loadtable(options)
      Estimation=false;
        break;
      case 'Financially_work':btntitle='Upload Work Order';
      tableData=this.loadtable(options)
      Estimation=false;
        break;    
    }
    //if(options=='Financially_work' ||  options=='Cancelled_work'||options=='onHold_work'||uploadestimation)
    if(options=='Financially_work' ||  options=='Cancelled_work'||options=='onHold_work')
    { console.log("enterd no button ");
      return (
        <View style={styles.container}>
          <ScrollView horizontal={true}>
            <View>
              <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                <Row data={tblheading}style={styles.header} textStyle={styles.text}/>
              </Table>
              <ScrollView style={styles.dataWrapper}>
                <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9',paddingBottom:4}}>
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
              </ScrollView>
             
            </View>
          </ScrollView>
          <View style={{height:70,marginBottom:3,alignContent:'center',justifyContent:'center',flexDirection:'row'}}>
                <ViewIngredientsButton
                title={'View Map'}
                width={100}
                opacity={mapopac}
                height={50}
                  onPress={() => {
                    navigation.navigate('Map',{options});
                  }}
                  />
          </View>
        </View>
      );
    }
    else{console.log("enterd  button ");
      return (
        //<ImageBackground source={require('../../../assets/icons/background6.jpg')} style={{width: '100%', height: '100%'}}>
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
                
              </ScrollView>
              
            </View>
          </ScrollView>
          <View style={{height:70,marginBottom:3,alignContent:'center',justifyContent:'center',flexDirection:'row'}}>
                 <Actionbutton
              title={btntitle}
              width={170}
              opacity={opac}
                height={50}
                onPress={() => {
                  navigation.navigate('workupload',{options});
                }}
                />
                <Actionbutton
                title={'View Map'}
                width={100}
                opacity={mapopac}
                height={50}
                  onPress={() => {
                    navigation.navigate('Map',{options});
                  }}
                  />
          </View>
        </View>
      );
  
    }
  }
}
