import React from 'react';
import { WebView, WebViewProps } from 'react-native-webview';

interface WebViewWrapperProps extends WebViewProps {
    uri: string;
}

const WebViewWrapper = ({ uri, ...restProps }: WebViewWrapperProps) => {
    return (
        <WebView
            pullToRefreshEnabled={true}
            startInLoadingState={true}
            allowsBackForwardNavigationGestures={true}
            source={{ uri }}
            mixedContentMode={'compatibility'}
            originWhitelist={['https://*', 'http://*']}
            overScrollMode={'never'}
            injectedJavaScript={` (function() { function wrap(fn) { return function wrapper() { var res = fn.apply(this, arguments); window.ReactNativeWebView.postMessage(window.location.href); return res; } } history.pushState = wrap(history.pushState); history.replaceState = wrap(history.replaceState); window.addEventListener('popstate', function() { window.ReactNativeWebView.postMessage(window.location.href); }); })(); true; `}
            onMessage={event => {
                console.log('onMessage', event.nativeEvent.data);
            }}
            {...restProps}
        />
    );
};

export default WebViewWrapper;
