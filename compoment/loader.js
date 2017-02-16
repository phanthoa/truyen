import React, { Component, } from 'react'
import { View, 
        Text,
        Image,
        TouchableOpacity,
        TouchableWithoutFeedback,
       StyleSheet,
       Dimensions,
       ScrollView,
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
const loading = require('../image/Loading_icon.gif');
let jobId = -1;
let dirs = RNFetchBlob.fs.dirs
var resData = [];
var data = [];
var curindex = 0;
var j = 0;
const {width, height} = Dimensions.get('window');
const renderPagination = (index, total, context) => {
   return (
     
    <View style={{
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      top: 20,
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
const Slide = props => {
  return (<View style={{flex: 1,justifyContent: 'center',backgroundColor: 'transparent'}}>
  <TouchableWithoutFeedback onPress={e => this.viewerPressHandle()} >
                            <PhotoView
                              onLoad={props.loadHandle.bind(null, props.i)}
                       //       source={{uri : item}}
                              source={{uri: props.uri}}
                              resizeMode='contain'
                              minimumZoomScale={1}
                              maximumZoomScale={3}
                          //    androidScaleType='center'
                              style={styles.photo} />
                 </TouchableWithoutFeedback>
    {
      !props.loaded && <View style={styles.loadingView}>
        <Image style={styles.loadingImage} source={loading} />
      </View>
    }
  </View>)
}
class Loader extends Component {
  static propTypes = {}
  static defaultProps = {}
  constructor(props) {
    super(props)
    const data = JSON.parse(this.props.data);
    const listdata = JSON.parse(this.props.listdata);
    var curid = JSON.parse(this.props.id);
    console.log('id truyen: ' ,curid)
    //var ds = new ViewPager.DataSource({pageHasChanged: (p1, p2) => p1 !== p2,});
    this.state = {
        curindex : 0,
         curid : curid,
         listdata : listdata,
         data : data,
        kieuxembool : true,
         kieuxem : 'Xem dọc',
         pages: [],
         res: '',
         imalink: '',
         fla : true,    
        imgList : [],
        showViewer: true,
        showIndex: 0,
        loadQueue: []
    }
    this.viewerPressHandle = this.viewerPressHandle.bind(this)
    this.thumbPressHandle = this.thumbPressHandle.bind(this)
    this.loadHandle = this.loadHandle.bind(this)
  }
 
 renderPagination = (index, total, context) => {
  //  console.log('showIndex' , this.state.showIndex)
 //  console.log('idex',this.state.showIndex)
 //  console.log(this.state.imgList.length)
  
 // console.log(this.state.curindex)
  // console.log(index+1)
  // console.log(this.state.imgList.length)
  //  if (index+1 === this.state.imgList.length) {
  //     console.log('dowload')
  //     curindex = index +1;
  //     // this.setState ({
  //     //   curindex : this.state.imgList.length,
  //     // })
  // //    this.download2();
  //   }
 //  console.log('index' , index+1);
 //  console.log('total', total);
   if (index+1 == total && index > 0) {
    // this.setState ({
    //   index = 0,
  //   })
  //  index = curindex;
  //   this.nextchap();
   }
 //  console.log('context' , context);
   return (
      <View style={{
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        top: 20,
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
  componentWillMount (){
  //    this.readfile();
 // console.log(this.state.curid)
 // console.log(this.state.listdata[this.state.curid])
 //      this.download3();
   this.nextchap();
  }
  download3 () {
     RNFetchBlob
        .config({
           // fileCache : true,
            // by adding this option, the temp files will have a file extension
       //     appendExt : 'png'
         path : dirs.DocumentDir + '/path-to-file.anything'
         
        })
    //    .fetch('GET', 'http://dl36.tv69.mobi/download/s/20150504/Fjj6Jkt1MEMGdsxDqom5BQ/1486624030/nhocmikoT7.zip', {
     //     .fetch('GET', 'http://43.239.221.139:8000/images.php', {
          .fetch('GET', 'http://graphicnovel.umwblogs.org/2015/09/02/educational-comics/', {
       //     .fetch('GET', 'http://truyentranh.net/go/chap-067', {

           // some headers .
        })
        .then((res) => {
          RNFetchBlob.fs.readFile(res.path(), 'utf8')
            .then((data) => {
           //   console.log(data)
              var str =  data.replace(/\s+/g, '');
          //    console.log(str)
      //        var ras = str.match(/slides_page_url_path((.(?!slides_page_url_path))+?)];/g);
                var ras = str.match(/<p><ahref="((.(?!<p><ahref="))+?)div/g);
         //     var ras = str.match(/class="each-page"((.(?!class="each-page"))+?)div/g);
        //     console.log(ras)
               ras = ras[0].match(/http:((.(?!http:))+?)jpg/g);
               console.log('length',ras.length)
                for (let i = 0 ; i < ras.length - 1 ; i=i+2) {
        //          ras[i] = ras[i].substring(0, ras[i].length - 1);
                console.log(i)
        //        console.log(ras[i])
                  resData.push(ras[i]);
               }
        //     // console.log(ras[0]);
        //    //   ras.shift();
              console.log(resData)
              this.setState ({
                imgList : resData,
         //       curindex : 0,
               })
            })
       //     console.log(this.state.imgList.length)
  //          Toast.show('Download thanh cong!',Toast.LONG);
        })
        .catch((error) => {
            console.log(error)
        })
        this.setState ({
          fla : !this.state.fla,
        })
  }
  download2 () {
   // console.log(this.state.data)
  //      Toast.show('Dang Download ......!',Toast.LONG);
      // RNFetchBlob
      // .config({
      //   fileCache : true,
      // })
      // .fetch('GET', 'http://truyentranhtuan.com/nhat-nhan-chi-ha/', {
      // })
      // .then((res) => {
      //             RNFetchBlob.fs.readFile(res.path(), 'utf8')
      //       .then((data) => {
      //         var str =  data.replace(/\s+/g, '');
      //       //  var str = data;
      //      //   var ras = str.match(/slides_page_url_path((.(?!slides_page_url_path))+?)];/g);
      //         var ras = str.match(/class="chapter-name((.(?!class="chapter-name))+?)group-name/g);
      //  //       console.log(ras)
      //    //     JSON.stringfiy(ras)
      //         let gt = [] ;//=  ras[50].match(/http:((.(?!http:))+?)"/g);
      //      for (let i = 0 ; i < ras.length ; i++) {
      //   //     console.log(ras[i])
      //         ras[i] = ras[i].match(/http:\/\/truyentranhtuan.com\/((.(?!http:\/\/truyentranhtuan.com\/))+?)\//g);
      //         console.log(ras[i])
      //       }
      //    //   console.log(gt[0])
      //    //      console.log(ras.length)
      //           for (let i = 0 ; i < ras.length ; i ++) {
      //         //      console.log(ras[i])
      //          //     ras[i] = JSON.stringfiy(ras[i]);
      //         //    ras[i] = ras[i].substring(0, ras[i].length - 1);
      //      //       console.log(ras[i])
      //           }
      //       })
      //    Toast.show('Download thanh cong!',Toast.LONG);
      // })
    //  console.log(this.state.curid)
    //  console.log(this.state.listdata[this.state.curid])
      RNFetchBlob
        .config({
           // fileCache : true,
            // by adding this option, the temp files will have a file extension
       //     appendExt : 'png'
         path : dirs.DocumentDir + '/path-to-file.anything'
         
        })
    //    .fetch('GET', 'http://dl36.tv69.mobi/download/s/20150504/Fjj6Jkt1MEMGdsxDqom5BQ/1486624030/nhocmikoT7.zip', {
     //     .fetch('GET', 'http://43.239.221.139:8000/images.php', {
          .fetch('GET', this.state.listdata[this.state.curid].link[0], {
         //   .fetch('GET', 'http://truyentranh.net/go/chap-067', {

           // some headers .
        })
        .then((res) => {
          RNFetchBlob.fs.readFile(res.path(), 'utf8')
            .then((data) => {
              var str =  data.replace(/\s+/g, '');

              var ras = str.match(/slides_page_url_path((.(?!slides_page_url_path))+?)];/g);
         //     var ras = str.match(/class="each-page"((.(?!class="each-page"))+?)div/g);
        //      console.log(ras)
              ras = ras[0].match(/http:((.(?!http:))+?)"/g);
              //      console.log(ras)
               for (let i = 0 ; i < ras.length ; i ++) {
                 ras[i] = ras[i].substring(0, ras[i].length - 1);
         //        console.log(ras[0])
               }
            // console.log(ras[0]);
           //   ras.shift();
            //  console.log(ras)
              this.setState ({
                imgList : ras,
                curindex : 0,
              })
            })
       //     console.log(this.state.imgList.length)
  //          Toast.show('Download thanh cong!',Toast.LONG);
        })
        .catch((error) => {
            console.log(error)
        })
        this.setState ({
          fla : !this.state.fla,
        })
  }
  download () {
        Toast.show('Dang Download ......!',Toast.LONG);
      RNFetchBlob
        .config({
           // fileCache : true,
            // by adding this option, the temp files will have a file extension
       //     appendExt : 'png'
         path : dirs.DocumentDir + '/path-to-file.anything'
         
        })
        .fetch('GET', 'http://dl36.tv69.mobi/download/s/20150504/Fjj6Jkt1MEMGdsxDqom5BQ/1486624030/nhocmikoT7.zip', {
      //    .fetch('GET', 'http://43.239.221.139:8000/images.php', {

           // some headers .
        })
        .then((res) => {
            // the temp file path with file extension `png`
            console.log('The file saved to ', res.path())
            console.log('1111')
            Toast.show('Download thanh cong!',Toast.LONG);
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

  readfile = ()=> {
    let dir = RNFS.DocumentDirectoryPath + '/nhocmikoT7/cdsfsd'
//      let dir = RNFS.DocumentDirectoryPath
//    console.log('deee : ' + dir)
    RNFS.readDir(dir) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
      .then((result) => {
          console.log(result)
        this.setState ({
          pages : result,
        })
         this.readimage();
  //      console.log('GOT RESULT', result);

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
      .catch((err) => {
        console.log(err.message, err.code);
      });
  }
  readimage2() {
    let file = this.state.res[0].images;
    this.setState ({
      imgList : file,
    })
  }
  readimage() {
 //   resData.splice(0, resData.length);
      for (let i = 0 ; i < this.state.pages.length ; i++) {
      //  console.log(pages)
        let file = this.state.pages[i].path;
    //    console.log('path : ' + file)
        RNFS.readFile( file, 'base64').then((res) => {
          console.log('i : ' + i)
     //  console.log('11111111111111100000000000000000000000000111111111111111' + res )
          let imalink = "data:image/jpg;base64,"+res;
          resData.push(imalink);
      //   console.log('11111111111111100000000000000000000000000111111111111111' + imgList )
      //    resData.push({imalink});
        })
      }
      this.setState({
          imgList : resData,
          fla : !this.state.fla,
      })
    
  //  Toast.show('Read thanh cong.....!',Toast.LONG);
   //   
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
  loadHandle (i) {
    let loadQueue = this.state.loadQueue
    if (i > j && i > 2) {
        for (let h = 0 ; h < i-2 ; h++) {
          loadQueue[h] = 0
          console.log('h:',h)
        }
    }else if (i < j && i > 2) {
        for (let h = loadQueue.length ; h > i + 2 ; h--) {
          loadQueue[h] = 0
          console.log('h:',h)
       }
    }
      loadQueue[i] = 1
    console.log('i hien tai :',i)
    // if ( i > 2) {
    //   loadQueue[i-1] = 0
    // }
  //  console.log('length',loadQueue.length)
  //   if (loadQueue.length > 3) {
        for (let j = 0 ; j < loadQueue.length ; j++){
          console.log(j,':',loadQueue[j])
     //     loadQueue[j] = 0
        }
  //   }
    this.setState({
      loadQueue
    })
     j = i;
  }
  nextchap() {
    if (this.state.curid > -1) {
      this.setState ({
      curid : this.state.curid - 1,
   //   showIndex : 0,
    //  index : 0,
    })
    this.download2();
  //  this.renderPagination();
    } else {
      Toast.show('Chap cuối cùng rồi!',Toast.LONG);
    }
    console.log('showIndex' , this.state.showIndex)
  }

  backchap() {
    console.log('lengt: ',this.state.listdata[53].link[0])
    console.log('dai: ' , this.state.listdata.length)
    if (this.state.curid < this.state.listdata.length +1) {
      console.log('1:',this.state.curid)
      this.setState ({
      curid : this.state.curid + 1,
    })
    console.log('2',this.state.curid)
    this.download2();
    }else {
      Toast.show('Chap đầu tiên rồi!',Toast.LONG);
    }
  }

  kieuXem() {
    if (this.state.kieuxem == 'Xem dọc') {
        this.setState ({
          kieuxem : 'Xem ngang',
          kieuxembool: !this.state.kieuxembool
        })
    } else {
         this.setState ({
          kieuxem : 'Xem dọc',
          kieuxembool: !this.state.kieuxembool
        })
    }
  }
  
  render() {
      return(
          <View style = {{position: 'relative', flex: 1}}>
            <View style = {{flex:8, backgroundColor: '#000' ,}}>
                <Swiper loop = {false} showsButtons = {true} 
                      // onMomentumScrollEnd={(e, state, context) =>
                        
                      //   console.log('index:', state.index)}
                      //   onTouchStart = {(e, state, context) => 
                      //     console.log('index1',state.index)  
                      //   }
               //       pagingEnabled = {false}
              //      showsVerticalScrollIndicator = {true}
              //        bounces = {true}
                      buttonWrapperStyle = {styles.buttonWrapper}
                      horizontal = {this.state.kieuxembool}
                      loadMinimalSize = {1}
                      loadMinimal = {true}
                  //    autoplayDirection = {false}
                      pressHandle={this.viewerPressHandle}
                      index = {0} 
                      style={styles.wrapper} 
                      renderPagination={this.renderPagination}>
                  {
                    this.state.imgList.map((item,i) => <View key={i} style = {styles.slide} >
                       <Slide
                            loadHandle={this.loadHandle}
                            loaded={!!this.state.loadQueue[i]}
                            uri={item}
                            i={i}
                            key={i} 
                            />
                       
                  { /*     <TouchableWithoutFeedback onPress={e => this.viewerPressHandle()} >
                            <PhotoView
                              source={{uri : item}}
                              resizeMode='contain'
                              minimumZoomScale={1}
                              maximumZoomScale={3}
                          //    androidScaleType='center'
                              style={styles.photo} />
                           
                 </TouchableWithoutFeedback> */}
                    </View>)
                  }
                </Swiper>
         { /*  {this.state.showViewer && <Swiper
                    index={this.state.showIndex}
                    pressHandle={this.viewerPressHandle}
                    imgList={this.state.imgList} 
         />} */}
        { /*   <View style={styles.thumbWrap}>
                    {
                    this.state.imgList.map((item, i) => <TouchableOpacity key={i} onPress={e => this.thumbPressHandle(i)}>
                        <Image style={styles.thumb} source={{uri : item}} />
                    </TouchableOpacity>)
                    }
          </View>  */}
            </View>
            <View style= {{flex: 1, backgroundColor: '#000'}}>
              {/*  {renderIf(this.state.fla) (
                    <TouchableOpacity style = {{flex: 1, backgroundColor: 'gray' , justifyContent: 'center', alignItems:'center'}} onPress={()=> this.download2()}>
                       <Text>Download</Text>
                    </TouchableOpacity>
                )} */}
                
                    <TouchableOpacity style = {{flex: 1, backgroundColor: 'gray' , justifyContent: 'center', alignItems:'center'}} onPress={()=> Actions.pop()}>
                       <Text>Back</Text>
                    </TouchableOpacity>
                <View style = {{flex : 1 ,flexDirection: 'row'}}>
                   <TouchableOpacity style = {{flex: 1, backgroundColor: 'blue' , justifyContent: 'center', alignItems:'center'}} onPress={()=> this.kieuXem()}>
                       <Text>{this.state.kieuxem}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = {{flex: 1, backgroundColor: 'red' , justifyContent: 'center', alignItems:'center'}} onPress={()=> this.nextchap()}>
                       <Text>Chap tiếp >> </Text>
                    </TouchableOpacity>
                </View>
                
                { /* {renderIf(this.state.fla) (
                  <TouchableOpacity style = {{height: 50, width: width, backgroundColor: 'red' , justifyContent: 'center', alignItems:'center'}} onPress={()=> this.readimage()}>
                      <Text>Read</Text>
                  </TouchableOpacity>
                )} */}
             
            </View>
          </View>
          
      );
  }
}

const styles = StyleSheet.create({
slide: {
    flex: 1,
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
    height : height,
    //resizeMode: 'contain',
  //  flex: 1,
  },
  thumbWrap: {
    marginTop: 100,
    borderWidth: 5,
    borderColor: '#000',
   // backgroundColor: 'red',
    flexDirection: 'row'
  },
  buttonWrapper: {
    backgroundColor: 'transparent', 
    flexDirection: 'row', 
    position: 'absolute', 
    top: 0, 
    left: 0, 
    flex: 1,
    paddingHorizontal: 10, 
    paddingVertical: 10, 
    justifyContent: 'space-between', 
    alignItems: 'center',
  //  height: 100,
//    width : 100,
  },
  thumb: {
    width: 50,
    height: 50
  },
  wrapper: {
  },

  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  image: {
    width,
    flex: 1,
    backgroundColor: 'transparent'
  },
  loadingView: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,.5)'
  },
  loadingImage: {
    width: 60,
    height: 60
  }
});
export default Loader

