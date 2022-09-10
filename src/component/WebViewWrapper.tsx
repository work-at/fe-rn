import React, {useRef, useState, useEffect} from 'react';
import {BackHandler} from 'react-native';
import {WebView, WebViewProps} from 'react-native-webview';

interface WebViewWrapperProps extends WebViewProps {
  uri: string;
}

const WebViewWrapper = ({uri, ...restProps}: WebViewWrapperProps) => {
  const webview = useRef();
  const [isCanGoBack, setIsCanGoBack] = useState(false);
  const onPressHardwareBackButton = () => {
    if (webview.current && isCanGoBack) {
      webview.current.goBack();
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    BackHandler.addEventListener(
      'hardwareBackPress',
      onPressHardwareBackButton,
    );
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        onPressHardwareBackButton,
      );
    };
  }, [isCanGoBack]);

  return (
    <WebView
      ref={webview}
      pullToRefreshEnabled={true}
      startInLoadingState={true}
      allowsBackForwardNavigationGestures={true}
      source={{uri}}
      mixedContentMode={'compatibility'}
      originWhitelist={['https://*', 'http://*']}
      overScrollMode={'never'}
      injectedJavaScript={`
        (function() {
          function wrap(fn) {
            return function wrapper() {
              var res = fn.apply(this, arguments);
              window.ReactNativeWebView.postMessage('navigationStateChange');
              return res;
            }
          }
    
          history.pushState = wrap(history.pushState);
          history.replaceState = wrap(history.replaceState);
          window.addEventListener('popstate', function() {
            window.ReactNativeWebView.postMessage('navigationStateChange');
          });
        })();
    
        true;
      `}
      onMessage={({nativeEvent: state}) => {
        if (state.data === 'navigationStateChange') {
          // Navigation state updated, can check state.canGoBack, etc.
          setIsCanGoBack(state.canGoBack);
        }
      }}
      {...restProps}
    />
  );
};

export default WebViewWrapper;
