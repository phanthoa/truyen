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
var resData = [ require('../image/5.jpg'),              
               require('../image/6.jpg')];
const {width, height} = Dimensions.get('window');
var styles = {
  wrapper: {
    backgroundColor: '#000',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  slide: {
    flex: 1,
  //  backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center'
  },
  photo: {
    width : width - 30,
    height : height - 200,
    flex: 1,
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  thumbWrap: {
    marginTop: 100,
    borderWidth: 5,
    borderColor: '#000',
   // backgroundColor: 'red',
    flexDirection: 'row'
  },
  thumb: {
    width: 50,
    height: 50
  }
}

const renderPagination = (index, total, context) => {
  return (
    <View style={{
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      top: 25,
      left: 0,
      right: 0
    }}>
      <View style={{
        borderRadius: 7,
        backgroundColor: 'rgba(255,255,255,.15)',
        padding: 3,
        paddingHorizontal: 7
      }}>
        <Text style={{
          color: '#fff',
          fontSize: 14
        }}>{index + 1} / {total}</Text>
      </View>
    </View>
  )
}
const Viewer = props => <Swiper index={props.index} style={styles.wrapper} renderPagination={renderPagination}>
  {
    props.imgList.map((item, i) => <View key={i} style={styles.slide}>
      <TouchableWithoutFeedback onPress={e => props.pressHandle()}>
        <PhotoView
          source={ item}
       //   source = {item}
          resizeMode='contain'
          minimumZoomScale={0.5}
          maximumZoomScale={3}
          androidScaleType='center'
          style={styles.photo} />
      </TouchableWithoutFeedback>
    </View>)
  }
</Swiper>
class Index extends Component {
  static propTypes = {}
  static defaultProps = {}
  constructor(props) {
    super(props)
    //var ds = new ViewPager.DataSource({pageHasChanged: (p1, p2) => p1 !== p2,});
    this.state = {
     //   dataSource : ds.cloneWithPages(resData),
      //   imgList: [
      //        require('../image/1.png'),
      //        require('../image/5.jpg'),
      //       require('../image/6.jpg'),
      //     //  'https://avatars3.githubusercontent.com/u/533360?v=3&s=466',
      //  //     'https://assets-cdn.github.com/images/modules/site/business-hero.jpg',
      //   //    'https://placeholdit.imgix.net/~text?txtsize=29&txt=350%C3%971150&w=350&h=1150',
      //   ],
      imgList : resData,
        showViewer: true,
        showIndex: 0
    }
    this.viewerPressHandle = this.viewerPressHandle.bind(this)
    this.thumbPressHandle = this.thumbPressHandle.bind(this)
  }
  viewerPressHandle () {
    this.setState({
      showViewer: false
    })
  }
  thumbPressHandle (i) {
    this.setState({
      showIndex: i,
      showViewer: true
    })
  }
_renderPage(data, sectionID, PageID) {
    return(
      <View>
         <PhotoView
                source={data.img}
                minimumZoomScale={0.5}
                maximumZoomScale={3}
            //    androidScaleType="center"
                onLoad={() => console.log("Image loaded!")}
                style={{width: width, height: 300}} />
      </View>
    );
  }
  render() {
      return(
          <View style = {{position: 'relative'}}>
            {this.state.showViewer && <Viewer
                index={this.state.showIndex}
                pressHandle={this.viewerPressHandle}
                imgList={this.state.imgList} />}
          { /* <View style={styles.thumbWrap}>
                {
                this.state.imgList.map((item, i) => <TouchableOpacity key={i} onPress={e => this.thumbPressHandle(i)}>
                    <Image style={styles.thumb} source={item} />
                </TouchableOpacity>)
                }
            </View> */}
            <View style = {{backgroundColor: 'red',height: 100, width: 100}}></View>
          </View>
      );
  }
}

export default Index