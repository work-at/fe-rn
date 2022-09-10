import React, { useEffect } from 'react';
import {
  StatusBar,
  useColorScheme,
} from 'react-native';
import { PERMISSIONS, requestMultiple } from 'react-native-permissions';

import WebViewWrapper from './component/WebViewWrapper';

const BASE_URL = 'https://workat.o-r.kr/';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const requestMultiplePermissions = () => {
    requestMultiple([
      PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    ]).then(statuses => {
      console.log('MULTIPLE REQUEST RESPONSE: ', statuses);
    });
  };

  useEffect(() => {
    requestMultiplePermissions();
  }, [])

  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <WebViewWrapper uri={BASE_URL} />
    </>
  );
};

export default App;
