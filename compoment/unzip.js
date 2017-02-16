import React, { Component, } from 'react'
import { View, 
        Text,
        Image,
        TouchableOpacity,
        TouchableWithoutFeedback,
       StyleSheet,
       Dimensions,
       BackAndroid,} from 'react-native'
import PhotoView from 'react-native-photo-view';
import ViewPager from 'react-native-viewpager';
import Swiper from 'react-native-swiper';
import RNFetchBlob from 'react-native-fetch-blob';
const RNFS = require('react-native-fs');
const {width, height} = Dimensions.get('window');
class Zip extends Component {
  static propTypes = {}
  static defaultProps = {}
  constructor(props) {
    super(props)
    //var ds = new ViewPager.DataSource({pageHasChanged: (p1, p2) => p1 !== p2,});
    this.state = {
     //   dataSource : ds.cloneWithPages(resData),
        imgList: [
            require('../image/1.png'),
        ],
    }
  }
 

  
  render() {
      return(
          <View style = {{position: 'relative'}}>
            
          </View>
      );
  }
}

export default Zip