import { StyleSheet, Dimensions } from 'react-native';
// screen sizing
const { width, height } = Dimensions.get('window');
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;

const numColumns = 3;
// item size
const RECIPE_ITEM_HEIGHT = 20;
const RECIPE_ITEM_OFFSET = 10;
const RECIPE_ITEM_MARGIN = RECIPE_ITEM_OFFSET ;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: RECIPE_ITEM_MARGIN,
    marginTop: 20,
    width: (SCREEN_WIDTH - 4),
    height: 50,
    borderColor: '#cccccc',
    borderWidth: 0.5,
    borderRadius: 15,
    padding:2,
  },
  piccontainer:{
    flex: 2,
    height:40,
    //flexDirection: 'row',
    alignSelf: 'center',
    //justifyContent: 'flex-start',
  },
  textbox:{
    width: (SCREEN_WIDTH - 50),
    marginLeft: 5,
    marginTop: 10,
    marginRight:40
  }
  
});

export default styles;
