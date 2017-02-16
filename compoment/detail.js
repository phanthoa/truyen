import React, { Component, } from 'react'
import { View, 
        Text,
        Image,
        TouchableOpacity,
        TouchableWithoutFeedback,
       StyleSheet,
       Dimensions,
       ScrollView,
       ListView,
       BackAndroid,} from 'react-native'
import PhotoView from 'react-native-photo-view';
import ViewPager from 'react-native-viewpager';
import Swiper from 'react-native-swiper';
import RNFetchBlob from 'react-native-fetch-blob';
const RNFS = require('react-native-fs');
import { MainBundlePath, DocumentDirectoryPath } from 'react-native-fs';
import { zip, unzip, unzipAssets, subscribe } from 'react-native-zip-archive-next';
import Toast from 'react-native-simple-toast';
import {Actions} from 'react-native-router-flux';
import renderIf from './renderif';
let jobId = -1;
let dirs = RNFetchBlob.fs.dirs
var resData = [];
var data = [];
const {width, height} = Dimensions.get('window');
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class Detail extends Component {
  static propTypes = {}
  static defaultProps = {}
  constructor(props) {
    super(props)
    const data = JSON.parse(this.props.data);

    this.state = {
         data : data,
         pages: [],
         res: '',
         imalink: '',
         linkbo : [],
         fla : false,    
        dataSource : ds.cloneWithRows(resData),
    }
  }
  componentWillMount (){
    this.download2();
  }
  
  download2 () {
     //   Toast.show('Dang Download ......!',Toast.LONG);
      RNFetchBlob
      .config({
        fileCache : true,
      })
      .fetch('GET', this.state.data[0], {
      })
      .then((res) => {
                  RNFetchBlob.fs.readFile(res.path(), 'utf8')
            .then((data) => {
              var str =  data.replace(/\s+/g, '');
            //  var str = data;
           //   var ras = str.match(/slides_page_url_path((.(?!slides_page_url_path))+?)];/g);
              var ras = str.match(/class="chapter-name((.(?!class="chapter-name))+?)group-name/g);
       //       console.log(ras)
         //     JSON.stringfiy(ras)
              let gt = [] ;//=  ras[50].match(/http:((.(?!http:))+?)"/g);
              resData.splice(0, resData.length);
           for (let i = 0 ; i < ras.length ; i++) {
        //     console.log(ras[i])
              ras[i] = ras[i].match(/http:\/\/truyentranhtuan.com\/((.(?!http:\/\/truyentranhtuan.com\/))+?)\//g);
         //     console.log(ras[i])
              resData.push({'link' : ras[i]});
          //   console.log(resData[i].link)
            }
            for (let i = 0 ; i < resData.length ; i ++){
              console.log(resData[i].link)
            }
            console.log(resData.length)
            this.setState ({
             //   linkbo : ras,
                dataSource : ds.cloneWithRows(resData)
            })
     //       console.log(this.state.linkbo)
         //   console.log(gt[0])
         //      console.log(ras.length)
                for (let i = 0 ; i < ras.length ; i ++) {
              //      console.log(ras[i])
               //     ras[i] = JSON.stringfiy(ras[i]);
              //    ras[i] = ras[i].substring(0, ras[i].length - 1);
           //       console.log(ras[i])
                }
            })
      //   Toast.show('Tai truyen thanh cong!',Toast.LONG);
      })
  }
  _renderView (data,sectionID,rowId) {
    return (
      <View style = {{ alignItems : 'center',margin: 5}}>
        <TouchableOpacity style = {{height: 50, width: width , justifyContent : 'center', backgroundColor: 'red'} } 
        onPress = {() => Actions.loader({data : JSON.stringify(data.link), listdata : JSON.stringify(resData), id : JSON.stringify(rowId)})}>
            <Text>{data.link}</Text>
        </TouchableOpacity>
      </View>
    );
  }
  render() {
      return(
          <View style = {{position: 'relative', flex: 1}}>
            <View style = {{flex:8, backgroundColor: 'white' ,marginTop: 30}}>
                <ListView  dataSource={this.state.dataSource} renderRow={this._renderView}
                   enableEmptySections = {true} />
            </View>
            <View style= {{flex: 1, backgroundColor: '#000'}}>
                <TouchableOpacity style = {{flex: 1, backgroundColor: 'gray' , justifyContent: 'center', alignItems:'center'}} onPress={()=> Actions.pop()}>
                <Text>Back</Text>
            </TouchableOpacity>
            </View>
          </View>
          
      );
  }
}

const styles = StyleSheet.create({
slide: {
 //   flex: 1,
  //  backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center'
  },
wrapper: {
    backgroundColor: '#000',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  photo: {
    marginTop : 30,
    width : width,
    height : height - 100,
    //resizeMode: 'contain',
    flex: 1,
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
});

export default Detail

