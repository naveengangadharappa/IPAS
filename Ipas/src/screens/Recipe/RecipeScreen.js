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
  
} from 'react-native';
import styles from './styles';
import {
  TextField,
  FilledTextField,
  OutlinedTextField,
} from 'react-native-material-textfield';
import Carousel, { Pagination } from 'react-native-snap-carousel';
//import { getIngredientName, getCategoryName, getCategoryById } from '../../data/MockDataAPI';
import BackButton from '../../components/BackButton/BackButton';
import ViewIngredientsButton from '../../components/ViewIngredientsButton/ViewIngredientsButton';
import {workList,photoArray} from '../../data/ApiCalls';
import KeyboardResponsiveView from 'react-native-keyboard-responsive-view';


const { width: viewportWidth } = Dimensions.get('window');
/*let photoArray=[
  {
  photo_url:'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FsampleApp-e1ab9b62-8fed-4f23-a3e6-b10007cff762/Camera/37a2fbed-c7b8-401c-9c29-8299341958e6.jpg',
  },
  {
    photo_url:'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FsampleApp-e1ab9b62-8fed-4f23-a3e6-b10007cff762/Camera/37a2fbed-c7b8-401c-9c29-8299341958e6.jpg',
  },
  {
    photo_url:'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FsampleApp-e1ab9b62-8fed-4f23-a3e6-b10007cff762/Camera/37a2fbed-c7b8-401c-9c29-8299341958e6.jpg',
  }
];*/

export default class WorkDetailsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTransparent: 'true',
      headerLeft: (
        <BackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
      )
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0
    };
  }

  fieldRef = React.createRef();
 
  onSubmit = () => {
    let { current: field } = this.fieldRef;
 
    console.log(field.value());
  };
 
  formatText = (text) => {
    return text.replace(/[^+\d]/g, '');
  };

  renderImage = ({ item }) => (
    <TouchableHighlight>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: item.photo_url }} />
      </View>
    </TouchableHighlight>
  );

  onPressIngredient = item => {
    var name = getIngredientName(item);
    let ingredient = item;
    this.props.navigation.navigate('Ingredient', { ingredient, name });
  };

  render() {
    const { activeSlide } = this.state;
    const { navigation } = this.props;
    const item = navigation.getParam('item');
    const WorkId = item.WorkId
    const WorkTitle = item.Details.Data.Work_Title;

    return (
      <ScrollView style={styles.container}>
        <View style={styles.carouselContainer}>
          <View style={styles.carousel}>
            <Carousel
              ref={c => {
                this.slider1Ref = c;
              }}
             // data={item.WorkId}
              data={photoArray[WorkId]}
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
        <View style={styles.infoRecipeContainer}>
          <Text style={styles.infoRecipeName}>{item.Details.Data.Work_Title}</Text>
          <View style={styles.infoContainer}>
              <Text style={styles.category}>{item.Details.Data.WorkId}</Text>
          </View>
          </View>
         
          <View style={styles.infoContainer}>
            <ViewIngredientsButton
            title={"Work details"}
            width={300}
              onPress={() => {
                navigation.navigate('IngredientsDetails', {item });
              }} 
            />
            
          </View>
         
          <View >
          <KeyboardResponsiveView>
          <Text style={styles.infoRecipeName}>Upload Work Progress</Text>
           <OutlinedTextField
            containerStyle={styles.textbox}
              label='Work Progress in %'
              keyboardType='phone-pad'
              formatText={this.formatText}
              onSubmitEditing={this.onSubmit}
              ref={this.fieldRef}
            />
           
            <OutlinedTextField
            containerStyle={styles.textbox}
              label='Remarks'
              onSubmitEditing={this.onSubmit}
              ref={this.fieldRef}
            />
            </KeyboardResponsiveView>
            <View style={styles.buttonContainer}>
            <ViewIngredientsButton
            title={"Capture Image"}
            width={150}
              onPress={() => {
                navigation.navigate('camera',{item});
              }}
         />
         <ViewIngredientsButton
         title={"Upload Progress"}
         width={150}
           onPress={() => {
             navigation.navigate('workupload',{item});
           }}
           />
         </View>
          </View>
          
      </ScrollView>
    );
  }
}

/*cooking steps
<View style={styles.infoContainer}>
  <Image style={styles.infoPhoto} source={require('../../../assets/icons/info.png')} />
  <Text style={styles.infoRecipe}>Cooking Steps</Text>
</View>
<Text style={styles.infoDescriptionRecipe}>{item.description}</Text>
*/
