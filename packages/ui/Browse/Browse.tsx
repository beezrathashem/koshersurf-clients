/* eslint-disable eslint-comments/require-description */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useAtom, useAtomValue } from "jotai";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Alert, Keyboard, View } from "react-native";
import { WebView } from "react-native-webview";
import { atoms } from "../lib/atoms";
import inject from "../lib/inject";
import { formatTerm, formatUrl, rootUrl } from "../lib/string";
import tw from "../lib/tw";
import type { Page } from "../types";
import { Header } from "./header";

export function Browse() {
  const webview = useRef(null);
  const [url, setUrl] = useState(rootUrl);
  const [search, setSearch] = useState("");
  const active = useAtomValue(atoms.activeTab);
  const [tabs, setTabs] = useAtom(atoms.tabs);

  useEffect(() => {
    const handleKeyPress = (event) => {
      console.log(`Key pressed: ${event.key}`);
      Alert.alert("YAY");
      // Add your logic to handle specific key presses here
    };

    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      handleKeyPress
    );

    return () => {
      keyboardDidShowListener.remove();
    };
  }, []);

  const onEnter = useCallback(() => {
    const { url, term } = formatUrl(search);
    setUrl(url);
    setSearch(term);
  }, [webview, search]);

  const setPage = useCallback(
    (page: Page) => {
      setTabs((prev) =>
        prev.map((tab, i) => (i === active ? { ...tab, page } : tab))
      );
    },
    [active]
  );

  const current = useMemo(() => {
    return tabs.find((tab) => tab.id === active)?.page;
  }, [tabs, active]);

  useEffect(() => {
    webview.current?.injectJavaScript(inject.video);
  }, [current?.url]);

  const onBack = useCallback(() => webview.current?.goBack(), []);
  const onForward = useCallback(() => webview.current?.goForward(), []);
  const onRefresh = useCallback(() => webview.current?.reload(), []);

  return (
    <>
      <Header
        onBack={onBack}
        onEnter={onEnter}
        onForward={onForward}
        onRefresh={onRefresh}
        search={search}
        setSearch={setSearch}
      />
      <View
        // enableFocusRing
        focusable
        onKeyDown={(event) => {
          console.log({
            d: event.nativeEvent.key,
          });
          Alert.alert("Bro");
        }}
        style={tw`w-full h-full`}
        validKeysDown={[
          "Enter",
          // "Shift",
          "n",
          // "rightArrow",
          // "B",
          // "KeyA",
          // "Alt",
        ]}
      >
        <WebView
          forceDarkOn
          injectedJavaScript={`

          
          let initialUrl = window.location.href;
        
          let getPageDetails = () => {
            const title = document.title;
            const favicon = document.querySelector('link[rel="icon"]') ? document.querySelector('link[rel="icon"]').href : '';
            const description = document.querySelector('meta[name="description"]') ? document.querySelector('meta[name="description"]').content : '';
        
            return {
              url: window.location.href,
              title,
              favicon,
              description
            };
          }
        
          let initialDetails = getPageDetails();
        
          let checkPageChange = () => {
            const currentDetails = getPageDetails();
            if (currentDetails.url !== initialDetails.url) {
              window.ReactNativeWebView.postMessage(JSON.stringify(currentDetails));
              initialDetails = currentDetails;
            }
          }
        
          setInterval(checkPageChange, 2000)
        `}
          mediaPlaybackRequiresUserAction
          onLoadEnd={(e) => console.log("load end", e)}
          onLoadProgress={(e) => console.log("load progress", e)}
          onLoadStart={(e) => {
            console.log("load start", e);
          }}
          onNavigationStateChange={(e) => {
            console.log(e.url);
            webview.current?.injectJavaScript(inject.video);
          }}
          style={tw`flex h-full flex-1`}
          onMessage={(e) => {
            if (e.nativeEvent.data) {
              const parsed = JSON.parse(e.nativeEvent.data);
              console.log({ parsed });
              if (parsed.url) {
                setPage(parsed as Page);
                setSearch(formatTerm(parsed.url as string));
              }
            }
          }}
          // useWebView2
          ref={webview}
          // injectedJavaScriptBeforeContentLoaded={inject.initial}
          source={{ uri: url }}
          // injectedJavaScriptBeforeContentLoaded={injectStyles}
          // injectedJavaScriptBeforeContentLoadedForMainFrameOnly={false}
          // injectedJavaScriptBeforeContentLoaded={inject.video}
          // onLoadEnd={() => {
          //   webview.current?.injectJavaScript(inject.video);
          // }}
          // injectedJavaScriptBeforeContentLoaded={`
          // ${inject.video}

          // `}
        />
      </View>
    </>
  );
}
