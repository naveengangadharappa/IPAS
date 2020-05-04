import { createDrawerNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from '../screens/Home/HomeScreen';
//import CategoriesScreen from '../screens/Categories/CategoriesScreen';
import WorkUploadScreen from '../screens/Workuploads/WorkUpload';
import ViewImageScreen from '../screens/Workuploads/viewImage';
import WorkDetailsScreen from '../screens/WorkDetails/WorkDetailsScreen';
//import RecipesListScreen from '../screens/RecipesList/RecipesListScreen';
import DrawerContainer from '../screens/DrawerContainer/DrawerContainer';
//import IngredientScreen from '../screens/Ingredient/IngredientScreen';
//import SearchScreen from '../screens/Search/SearchScreen';
//import Map from '../screens/Map/MapView';
import LoginScreen from '../screens/Login/LoginScreen';
import MapViews from '../screens/Map/MapView';
import CameraScreen from '../screens/Camera/camera';
//import WorkUpload from '../screens/WorkUpload/WorkUpload';
let MainNavigator = createStackNavigator(
  {
    Login:LoginScreen,
    Home: HomeScreen,
    camera: CameraScreen,
    viewImage:ViewImageScreen,
   // workupload: WorkUpload,
    //Home: SearchScreen,
    //Categories: CategoriesScreen,
    workupload: WorkUploadScreen,
    //RecipesList: RecipesListScreen,
    //Ingredient: IngredientScreen,
    //Search: SearchScreen,
    workdetails: WorkDetailsScreen,
    Map:MapViews,
  },
  {
    // Home Component where app start..
    //initialRouteName: 'Login',
    initialRouteName: 'Login',
    // headerMode: 'float',
    defaulfNavigationOptions: ({ navigation }) => ({
      headerTitleStyle: {
        //Navigation font style
        fontWeight: 'bold',
        textAlign: 'center',
        alignSelf: 'center',
        flex: 1,
      }
    })
  }
);

let DrawerStack = createDrawerNavigator(
  {
    Main:  MainNavigator
  },
  {
    //Navigation Container style
    drawerPosition: 'left',
    initialRouteName: 'Main',
    drawerWidth: 250,
    contentComponent: DrawerContainer
  }
);

export default AppContainer = createAppContainer(DrawerStack);

console.disableYellowBox = true;