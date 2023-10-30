/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {
  SafeAreaView,
  StatusBar,
  TextInput,
  View,
  useColorScheme,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {WebView} from 'react-native-webview';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import tw from 'twrnc';

export default function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={tw`w-full h-20 border-b-2 border-white bg-black`}>
        <View style={tw`flex-2.3 w-full bg-gray-500`} />
        <View style={tw`flex flex-3.2 items-center flex-row`}>
          <View style={tw`flex flex-row h-full items-center`}>
            <Icon name="person" size={30} color="#4F8EF7" />
            {/* <View style={tw`bg-blue-500 ml-3 h-10 w-10`} /> */}
            {/* <Ionicons name="md-checkmark-circle" size={32} color="green" /> */}
            <View style={tw`bg-red-500 mx-3 h-10 w-10`} />
            <View style={tw`bg-red-500 mr-3 h-10 w-10`} />
          </View>
          <TextInput
            style={tw`flex-1 h-full h-[80%] rounded-full border-[1.5px] border-white`}
          />
          <View style={tw`flex flex-row h-full items-center`}>
            <View style={tw`bg-blue-500 ml-3 h-10 w-10`} />
            <View style={tw`bg-red-500 mx-3 h-10 w-10`} />
            <View style={tw`bg-red-500 mr-3 h-10 w-10`} />
          </View>
        </View>
      </View>
      <View style={tw`w-full h-full`}>
        <WebView
          style={tw`flex h-full flex-1`}
          source={{uri: 'https://google.com/'}}
        />
      </View>
    </SafeAreaView>
  );
}
