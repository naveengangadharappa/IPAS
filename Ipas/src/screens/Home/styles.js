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
  fontSize:18,
  }
},
);

export default styles;
