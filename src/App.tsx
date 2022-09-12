import React, {useEffect, useState, useRef} from 'react';
import {StatusBar, useColorScheme, ImageBackground} from 'react-native';
import {PERMISSIONS, requestMultiple} from 'react-native-permissions';
import SplashScreen from 'react-native-splash-screen';
import Lottie from 'lottie-react-native';

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
    setTimeout(() => {
      requestMultiplePermissions();
    }, 6000)
  }, []);

  useEffect(() => {
    SplashScreen.hide();
    setTimeout(() => {
      animationRef.current?.play()
    }, 100)
  }, []);

  const animationRef = useRef<Lottie>(null)
  const [appLoaded, setAppLoaded] = useState(false);
  const [webviewTrigger, setWebviewTrigger] = useState(false);
  
  useEffect(() => {
    setTimeout(() => {
      setAppLoaded(true);
    }, 3000);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setWebviewTrigger(true);
    }, 2000);
  }, []);


  return (
    <>
      {!appLoaded && (
        <ImageBackground
          source={require('./assets/launch_screen.jpg')}
          resizeMode="cover" style={{width: '100%', height: '100%'}}>
          <Lottie ref={animationRef} source={require('./assets/splash.json')} autoPlay />
        </ImageBackground>
      )}
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {webviewTrigger && <WebViewWrapper uri={BASE_URL} startInLoadingState={webviewTrigger} />}
    </>
  );
};

export default App;
