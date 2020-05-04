import { StyleSheet } from 'react-native';
import { RecipeCard } from '../../AppStyles';
import { getCategoryById } from '../../data/MockDataAPI';

const styles = StyleSheet.create({
  container: RecipeCard.container,
  photo: RecipeCard.photo,
  title: RecipeCard.title,
  category: RecipeCard.category,
  Heading:{
  paddingLeft:4,
  fontSize:14,
  },
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
},
);

export default styles;
