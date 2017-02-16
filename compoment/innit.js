import React, { Component, } from 'react'
import { View, 
       StyleSheet,
       Dimensions,
       BackAndroid,} from 'react-native'
import loader from './loader.js';
import detail from './detail.js';
import home from './home.js';
//import codePush from "react-native-code-push";

var {width, height} = Dimensions.get('window');
import { Router, Scene } from 'react-native-router-flux';

class Innit extends Component {
  
  static propTypes = {}

  static defaultProps = {}
  constructor(props) {
    super(props)
    this.state = {
    }
  }
   componentWillMount()
  {
//    codePush.sync({ updateDialog: true,installMode : codePush.InstallMode.IMMEDIATE })
  }
  render() {
    return (
      <Router key = "root">
        <Scene key = "loader" component = {loader} hideNavBar = {true} />
        <Scene key ="detail" component = {detail}  hideNavBar = {true} />
        <Scene key ="home" component = {home} initial = {true} hideNavBar = {true} />
      </Router>
    )
  }
}

export default Innit