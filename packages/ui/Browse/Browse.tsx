import { useCallback, useRef, useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { WebView } from "react-native-webview";
import { formatTerm, formatUrl, rootUrl } from "../lib/string";
import tw from "../lib/tw";

export const Browse = () => {
  const webview = useRef(null);
  const [url, setUrl] = useState(rootUrl);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState({
    description: "",
    favicon: "",
    title: "",
    url: "",
  });

  const onEnter = useCallback(() => {
    const { url, term } = formatUrl(search);
    setUrl(url);
    setSearch(term);
  }, [webview, search]);

  return (
    <>
      <Header
        onBack={() => webview?.current?.goBack()}
        onForward={() => webview?.current?.goForward()}
        onRefresh={() => webview?.current?.reload()}
        onEnter={onEnter}
        page={page}
        search={search}
        setSearch={setSearch}
      />
      <View style={tw`w-full h-full`}>
        <WebView
          ref={webview}
          onNavigationStateChange={(e) => console.log(e.url)}
          style={tw`flex h-full flex-1`}
          // injectedJavaScriptBeforeContentLoaded={inject.initial}
          forceDarkOn
          useWebView2
          source={{ uri: url }}
          onMessage={(e) => {
            if (e.nativeEvent.data) {
              const parsed = JSON.parse(e.nativeEvent.data);
              console.log({
                parsed,
              });
              if (parsed.url) {
                setPage(parsed);
                setSearch(formatTerm(parsed.url));
              }
            }
          }}
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
        />
      </View>
    </>
  );
};

const Header = ({
  onBack,
  page,
  onEnter,
  search,
  setSearch,
  onForward,
  onRefresh,
}) => {
  const [tab, setTab] = useState(0);
  return (
    <View style={tw`w-full h-26 border-b-2 border-white bg-background`}>
      <View
        style={tw`flex-2.3 flex-row px-22 w-full justify-start items-end bg-secondary`}
      >
        <TouchableOpacity onPress={() => setTab(0)}>
          <View
            style={{
              cursor: "pointer",
              ...tw`max-w-47 w-full bg-card h-[80%] rounded-t-2`,
              backgroundColor: tab === 0 ? tw.color("card") : undefined,
            }}
          >
            <View
              style={tw`flex-row px-3 justify-between flex items-center h-full`}
            >
              <View style={tw`flex flex-row items-center`}>
                {page?.favicon && (
                  <Image
                    source={{ uri: page?.favicon }}
                    style={tw`h-4 w-4 pr-2`}
                  />
                )}
                <Text
                  numberOfLines={1}
                  style={tw`text-foreground text-xs pr-3.5`}
                >
                  {page?.title || "New Tab"}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {}}
                style={{
                  cursor: "pointer",
                  // ...tw`max-w-47 w-full bg-card h-[80%] rounded-t-2`,
                  backgroundColor: tab === 0 ? tw.color("card") : undefined,
                }}
              >
                <Icon name="close" size={13} color={tw.color("foreground")} />
              </TouchableOpacity>
            </View>
            {tab !== 0 && tab !== 1 && (
              <View
                style={tw`bg-white opacity-50 h-[75%] w-[1px] absolute right-0 top-1`}
              />
            )}
          </View>
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => setTab(1)}
          style={{
            ...tw`max-w-47 w-full bg-card h-[80%] rounded-t-2`,
            backgroundColor: tab === 1 ? tw.color("card") : undefined,
          }}
        >
          {tab !== 1 && tab !== 2 && (
            <View
              style={tw`bg-white opacity-50 h-[75%] w-[1px] absolute right-0 top-1`}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setTab(2)}
          style={{
            ...tw`max-w-47 border-white w-full bg-card h-[80%] rounded-t-2`,
            backgroundColor: tab === 2 ? tw.color("card") : undefined,
          }}
        >
          {tab !== 1 && tab !== 0 && (
            <View
              style={tw`bg-white opacity-50 h-[75%] w-[1px] absolute right-0 top-1`}
            />
          )}
        </TouchableOpacity> */}
      </View>
      <View style={tw`flex flex-3.2 items-center flex-row`}>
        <View style={tw`flex flex-row w-22 justify-evenly h-full items-center`}>
          <TouchableOpacity onPress={onBack}>
            <Icon name="arrow-back" size={18} color={tw.color("foreground")} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onForward}>
            <Icon
              name="arrow-forward"
              size={18}
              color={tw.color("foreground")}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onRefresh}>
            <Icon name="refresh" size={18} color={tw.color("foreground")} />
          </TouchableOpacity>
        </View>
        <View style={tw`h-[50%] flex-1`}>
          <Icon
            name="search"
            size={15}
            style={tw`absolute left-3 top-2`}
            color={tw.color("muted")}
          />
          <TextInput
            value={search}
            onSubmitEditing={onEnter}
            onChangeText={setSearch}
            placeholder="Search Google or type a URL"
            style={tw`flex-1 h-full pt-1.1 pl-7.5 rounded-full border-[1px] border-white`}
          />
        </View>
        <View
          style={tw`flex min-w-18 justify-evenly flex-row h-full items-center`}
        >
          <Icon
            name="person-circle-outline"
            size={27}
            color={tw.color("foreground")}
          />
          <Icon
            name="ellipsis-vertical"
            size={18}
            color={tw.color("foreground")}
          />
        </View>
      </View>
    </View>
  );
};
