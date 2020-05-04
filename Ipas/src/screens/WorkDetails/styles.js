import { StyleSheet, Dimensions } from 'react-native';
// screen sizing
const { width, height } = Dimensions.get('window');
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;

const numColumns = 3;
// item size
const RECIPE_ITEM_HEIGHT = 100;
const RECIPE_ITEM_OFFSET = 10;
const RECIPE_ITEM_MARGIN = RECIPE_ITEM_OFFSET * 2;

const styles = StyleSheet.create({
  container: {
    backgroundColor:"#E7E6E1",
    flex: 1,
    alignItems: 'center',
    margin: RECIPE_ITEM_OFFSET,
    marginTop: 15,
    //width: (SCREEN_WIDTH - RECIPE_ITEM_MARGIN) / numColumns - RECIPE_ITEM_OFFSET,
    height: RECIPE_ITEM_HEIGHT + 60
  },
  title: {
    margin: 10,
    marginBottom: 5,
    color: 'black',
    fontSize: 13,
    textAlign: 'center'
  },
  photo: {
    width: (SCREEN_WIDTH - RECIPE_ITEM_MARGIN) / numColumns - RECIPE_ITEM_OFFSET,
    height: RECIPE_ITEM_HEIGHT,
    borderRadius: 60
  },
  //container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  header: { height: 50, backgroundColor: '#537791' },
  text: { textAlign: 'center', fontWeight: '100', padding:8},
  dataWrapper: { marginTop: -1 },
  row: { height: 'auto', width: 'auto', backgroundColor: '#E7E6E1'},
  Heading:{
    paddingLeft:4,
    fontSize:18,
    }
});

export default styles;
