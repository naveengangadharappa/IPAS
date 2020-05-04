import { StyleSheet, Dimensions } from 'react-native';

// screen sizing
const { width, height } = Dimensions.get('window');
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;

const recipeNumColums = 3;
// item size
const RECIPE_ITEM_HEIGHT = 50;
const RECIPE_ITEM_MARGIN = 10;

// 2 photos per width
export const RecipeCard = StyleSheet.create({
  container: {
    backgroundColor:'#E7E6E1',
    /*flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: RECIPE_ITEM_MARGIN,
    marginTop: 20,
    width: (SCREEN_WIDTH - (recipeNumColums + 1) * RECIPE_ITEM_MARGIN) / recipeNumColums,
    height: RECIPE_ITEM_HEIGHT + 60,
    borderColor: '#cccccc',
    borderWidth: 0.5,
    borderRadius: 15,
    padding:2,
    overflow: "hidden",
    position: "relative",
    backgroundColor: "#fff",*/
    
    position: "relative",
            width: 120,
            height: 110,
            backgroundColor: "#fff",
            borderRadius: 3,
            marginLeft: 1,
            borderTopColor:'green',
            //marginTop:1,
            // marginVertical: 5,
            //alignItems: 'center',
            overflow: "scroll",
            //borderColor:'black',
            borderRightColor:'black',
            borderTopColor:'black',
  },
  photo: {
    width: (SCREEN_WIDTH - (recipeNumColums + 1) * RECIPE_ITEM_MARGIN) / recipeNumColums,
    height: RECIPE_ITEM_HEIGHT,
    borderRadius: 15,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  title: {
    flex: 1,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#444444',
    marginTop: 3,
    marginRight: 5,
    marginLeft: 5,
   // backgroundColor:'gray'
  },
  category: {
    //marginTop: 0,
    //marginBottom: 0,
    fontSize: 11,
    //padding:1,
    marginLeft:3,
  }
});
