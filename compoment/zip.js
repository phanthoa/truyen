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
import { MainBundlePath, DocumentDirectoryPath } from 'react-native-fs'
import { zip, unzip, unzipAssets, subscribe } from 'react-native-zip-archive-next'
let jobId = -1;
let dirs = RNFetchBlob.fs.dirs

var imaList = [];
const {width, height} = Dimensions.get('window');
class Zip extends Component {
  static propTypes = {}
  static defaultProps = {}
  constructor(props) {
    super(props)
    //var ds = new ViewPager.DataSource({pageHasChanged: (p1, p2) => p1 !== p2,});
    this.state = {
        pages: [],
        res: '',
        imalink: '',
      //  output: 'Doc folder: ' + RNFS.DocumentDirectoryPath,
        // imagePath: {
        //     uri: ''
        // },
     //   dataSource : ds.cloneWithPages(resData),
        imaList: [
            require('../image/1.png'),
        ],
    }
  }

  download () {
      RNFetchBlob
        .config({
           // fileCache : true,
            // by adding this option, the temp files will have a file extension
       //     appendExt : 'png'
         path : dirs.DocumentDir + '/path-to-file.anything'

        })
        .fetch('GET', 'http://dl36.tv69.mobi/download/s/20150504/Fjj6Jkt1MEMGdsxDqom5BQ/1486624030/nhocmikoT7.zip', {
       //   .fetch('GET', 'http://lorempixel.com/400/200/', {

           // some headers ..
        })
        .then((res) => {
            // the temp file path with file extension `png`
            console.log('The file saved to ', res.path())
            console.log('1111')
           const sourcePath = res.path();
           let targetPath = DocumentDirectoryPath;
            unzip(sourcePath, targetPath)
                .then((path) => {
                  console.log('unzip completed! ', path)
                  this.setState({
                      res : path
                  })
                })
                .catch((error) => {
                console.log(error)
                })
            // Beware that when using a file path as Image source on Android,
            // you must prepend "file://"" before the file path
        //    imageView = <Image style = {{height : 300, width : 300, backgroundColor: 'red'}} source={{ uri : Platform.OS === 'android' ? 'file://' + res.path()  : '' + res.path() }}/>
        })
        .catch((error) => {
            console.log(error)
        })
  }
  readfile() {
    let dir = RNFS.DocumentDirectoryPath + '/nhocmikoT7/cdsfsd'
    console.log('deee : ' + dir)
    RNFS.readDir(dir) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
      .then((result) => {
        this.setState ({
          pages : result,
        })
        console.log('GOT RESULT', result);

        // stat the first file
        return Promise.all([RNFS.stat(result[0].path), result[0].path]);
      })
      .then((statResult) => {
        if (statResult[0].isFile()) {
          // if we have a file, read it
          return RNFS.readFile(statResult[1], 'utf8');
        }

        return 'no file';
      })
      .then((contents) => {
        // log the file contents
        console.log(contents);
      })
      .catch((err) => {
        console.log(err.message, err.code);
      });
  }
  readimage() {
   // imaList.splice(0, imaList.length);
    for (let i = 0 ; i < this.state.pages.length ; i++) {
        let file = this.state.pages[0].path;
        console.log('path : ' + file)
        RNFS.readFile( file, 'base64').then((res) => {
          console.log('res : ' + res)
          let imalink = "data:image/jpg;base64,"+res;
          this.setState({
            imalink : imalink,
          })
  //        imaList.push({'ima': imalink});
        })
    }
    
  }
  render() {
      return(
          <View style = {{position: 'relative'}}>
            {this.imageView}
            
            <TouchableOpacity style = {{height: 100, width: width, backgroundColor: 'red' , justifyContent: 'center', alignItems:'center'}} onPress={()=> this.readfile()}>
                <Text>Download</Text>
            </TouchableOpacity>
             <TouchableOpacity style = {{height: 100, width: width, backgroundColor: 'red' , justifyContent: 'center', alignItems:'center'}} onPress={()=> this.readimage()}>
                <Text>readfile</Text>
            </TouchableOpacity>
            <Image style ={{width: 300, height : 300}} resizeMode = 'contain' source ={{uri : this.state.imalink}}></Image>
          </View>
      );
  }
}

export default Zip