/* eslint-disable eslint-comments/require-description */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useAtom, useAtomValue } from "jotai";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { View } from "react-native";
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

  return (
    <>
      <Header
        onBack={() => webview.current?.goBack()}
        onEnter={onEnter}
        onForward={() => webview.current?.goForward()}
        onRefresh={() => webview.current?.reload()}
        search={search}
        setSearch={setSearch}
      />
      <View style={tw`w-full h-full`}>
        <WebView
          forceDarkOn
          injectedJavaScript={`
        ${inject.video}
          
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
          injectedJavaScriptBeforeContentLoaded={inject.video}
          mediaPlaybackRequiresUserAction
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
          onNavigationStateChange={(e) => {
            console.log(e.url);
          }}
          ref={webview}
          // injectedJavaScriptBeforeContentLoaded={inject.initial}
          source={{ uri: url }}
          // useWebView2
          style={tw`flex h-full flex-1`}
        />
      </View>
    </>
  );
}
