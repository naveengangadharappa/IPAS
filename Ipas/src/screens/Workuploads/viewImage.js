import React from 'react';
import {
  View,
  Image,
  Dimensions,
  TouchableHighlight,  
} from 'react-native';
import styles from './styles';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import BackButton from '../../components/BackButton/BackButton';
import {workdetails,photoArray} from '../../data/ApiCalls';


const { width: viewportWidth } = Dimensions.get('window');

export default class ViewImageScreen extends React.Component {
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
        activeSlide: 0,
        imgload:false
        };
      }

    renderImage = ({ item }) => (
      <TouchableHighlight>
       <Image style={{width:'100%',height: 800,backgroundColor:"white"}} source={{ uri: item.photo_url }} />
      </TouchableHighlight>
    );
  
    render() {
    const { activeSlide } = this.state;
    const { navigation } = this.props;
    const item = navigation.getParam('item');
    console.log(item);
        return (
          <View style={{minHeight: 900}}>
          <View style={styles.carousel}>
            <Carousel
              ref={c => {
                this.slider1Ref = c;
              }}
             // data={item.WorkId}
              data={photoArray[workdetails.WorkId]}
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
        );
      }
    }