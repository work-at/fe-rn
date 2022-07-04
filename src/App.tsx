import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';

import WebViewWrapper from './component/WebViewWrapper';

const BASE_URL = 'https://gleeful-douhua-01be3a.netlify.app/';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <WebViewWrapper uri={BASE_URL} />
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({ root: { flex: 1 } });


export default App;
