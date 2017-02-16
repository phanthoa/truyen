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

class Home extends Component {
  static propTypes = {}
  static defaultProps = {}
  constructor(props) {
    super(props)
    this.state = {
         pages: [],
         res: '',
         imalink: '',
         linkbo : [],
         fla : false,    
        dataSource : ds.cloneWithRows(resData),
    }
  }
  componentDidMount() {
  //  {setTimeout(() => Actions.detail(), 1000)}
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
      .fetch('GET', 'http://truyentranhtuan.com', {
      })
      .then((res) => {
                  RNFetchBlob.fs.readFile(res.path(), 'utf8')
            .then((data) => {
              var str =  data.replace(/\s+/g, '');
          //    console.log(str)
            //  var str = data;
                var aa = data;
           //   var ras = str.match(/slides_page_url_path((.(?!slides_page_url_path))+?)];/g);
              var ras = str.match(/"story-list((.(?!"story-list))+?)class="clear/g);
              var imgras = str.match(/class="hidden((.(?!class="hidden))+?)class="clear/g);
              var nameras = str.match(/class="hidden((.(?!class="hidden))+?)class="clear/g);
           //   console.log(nameras)
         //     console.log(ras.length)
         //     JSON.stringfiy(ras)
                nameras = nameras[0].match(/class="manga-update-name((.(?!class="manga-update-name))+?)</g);
           //     console.log(nameras.length)
                imgras = imgras[0].match(/http:\/\/truyentranhtuan.com\/wp-content\/((.(?!http:\/\/truyentranhtuan.com\/wp-content\/))+?)"/g);
                ras =  ras[0].match(/class="manga((.(?!class="manga))+?)span/g);
           //    console.log(nameras)
           //     console.log(imgras.length)
         //        console.log(ras.length)
                for (let i = 0 ; i < ras.length ;i++) {
                    ras[i] =  ras[i].match(/href="http:\/\/truyentranhtuan.com\/((.(?!href="http:\/\/truyentranhtuan.com\/))+?)\//g);
           //         console.log(ras[i])
                }
                
                ras = ras.filter(function(val) {
                        return val !== null
                })
                for (let i = 0 ; i < nameras.length ; i++) {
                   nameras[i] = nameras[i].match(/>((.(?!>))+?)</g)
                }
                 for (let j = 0 ; j < ras.length ;j++) {
                   ras[j] =  ras[j][0].match(/http:\/\/truyentranhtuan.com\/((.(?!http:\/\/truyentranhtuan.com\/\/))+?)\//g);
                 //  console.log(ras[j])
                 // nameras[j] = nameras[j].match(/>((.(?!>))+?)</g)
              //   nameras[j] = nameras[j][0].substring(0, 0)
                  nameras[j] = nameras[j][0].substring(1, nameras[j][0].length - 1)
              //    nameras[j] = nameras[j][0].substring(nameras[j][0].length - 1, nameras[j][0].length - 1)
                  imgras[j] = imgras[j].substring(0, imgras[j].length - 1);
                   resData.push({'linkdetail' : ras[j], 'linkimg': imgras[j] , 'linkname': nameras[j]} );
                }
                console.log(nameras)
            //    console.log(resData)
                this.setState ({
                    dataSource : ds.cloneWithRows(resData)
                })
            })
         Toast.show('Tai truyen thanh cong!',Toast.LONG);
      })
  }
  _renderRow (data,sectionID,rowId) {
    return (
      <View style = {{ height: 150 , width : width/ 3,justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity style = {{height: 140 , width : width/3 - 15 ,justifyContent: 'center' ,alignItems: 'center'}} onPress = {() => {setTimeout(() => Actions.detail({data : JSON.stringify(data.linkdetail)}), 1000)}}>
            <Image style = {{height: 100, width: width/3-15}} source ={{uri : data.linkimg}}></Image>
            <Text style = {{ flex: 1,fontSize: 12, color: 'white'}}>{data.linkname}</Text>
        </TouchableOpacity>
      </View>
    );
  }
  render() {
      return(
            <View style = {{ flex:1, backgroundColor: '#000' }}>
                <ListView contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap'}} dataSource={this.state.dataSource} renderRow={this._renderRow}
                   enableEmptySections = {true} />
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

export default Home

