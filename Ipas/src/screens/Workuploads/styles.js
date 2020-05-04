import { StyleSheet, Dimensions } from 'react-native';

const { width: viewportWidth } = Dimensions.get('window');
// orientation must fixed


const styles = StyleSheet.create({
  container: {
    backgroundColor:"#E7E6E1",
    flex: 1
  },
  row: { height: 'auto', width: 'auto', backgroundColor: '#E7E6E1',textAlign:'center',},
  tbl:{borderWidth: 1, borderColor: '#C1C0B9',marginHorizontal:11,marginVertical:11},
  text: { textAlign: 'center', fontWeight: '100', padding:8},
  container1: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    paddingTop: 30,
    backgroundColor: '#ecf0f1',
    padding: 8,
    opacity:0.5,
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
  carouselContainer: {
    minHeight: 300
  },
  carousel: {

  },
  textbox:{
    //width: 200,
    marginLeft: 25,
    marginTop: 10,
    marginRight:20
  },
  textboxhide:{
    opacity:0,
    width:1,
    height:1,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: 300,
    backgroundColor:"white"
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    width: viewportWidth,
    height: 300,
    backgroundColor:"white"
  },
  paginationContainer: {
    flex: 1,
    position: 'absolute',
    alignSelf: 'center',
    paddingVertical: 8,
    marginTop: 250
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 0
  },
  infoRecipeContainer: {
    flex: 1,
    //marginTop: 0,
    //marginBottom:0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  infoContainer: {
    flex: 1,
    //flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    //marginLeft:10,
    backgroundColor:"darkgray",
  },
  buttonContainer: {
    flex: 1,
    marginTop:0,
    marginLeft:25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom:10
  },
  infoPhoto: {
    height: 20,
    width: 20,
    marginRight: 0
  },
  infoRecipe: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  category: {
    fontSize: 14,
    fontWeight: 'bold',
    margin: 2,
    //color: '#2cd18a',
    color: 'white',
    
  },
  infoDescriptionRecipe: {
    textAlign: 'left',
    fontSize: 16,
    marginTop: 30,
    margin: 15
  },
  infoRecipeName: {
    fontSize: 20,
    margin: 10,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center'
  },
  btnContainer: {
    //position: 'absolute',
    flex: 1,
    alignItems: 'center',
    borderRadius: 180,
    padding: 8,
    margin: 10,
    //top: 30, 
    //right: 10,
    //height:35,
    //width:30,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3
  },
  btnIcon: {
   height: 17,
   width: 17
  }

});

export default styles;
