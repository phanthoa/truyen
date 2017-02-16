/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Index from './compoment/index.js';
import Zip from './compoment/zip.js';
import Download from './compoment/download.js';
import Loader from './compoment/loader.js';
import Innit from './compoment/innit.js';

AppRegistry.registerComponent('truyen', () => Innit);
