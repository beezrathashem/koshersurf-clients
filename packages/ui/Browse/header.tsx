import { TextInput, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import tw from "../lib/tw";
import { Tabs } from "./Tabs";

export function Header({
  onBack,
  onEnter,
  search,
  setSearch,
  onForward,
  onRefresh,
}: {
  onBack: () => void;
  onEnter: () => void;
  onForward: () => void;
  onRefresh: () => void;
  search: string;
  setSearch: (search: string) => void;
}) {
  return (
    <View style={tw`w-full h-26 border-b-2 border-white bg-background`}>
      <Tabs />
      <View style={tw`flex flex-3.2 items-center flex-row`}>
        <View style={tw`flex flex-row w-22 justify-evenly h-full items-center`}>
          <TouchableOpacity onPress={onBack}>
            <Icon color={tw.color("foreground")} name="arrow-back" size={18} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onForward}>
            <Icon
              color={tw.color("foreground")}
              name="arrow-forward"
              size={18}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onRefresh}>
            <Icon color={tw.color("foreground")} name="refresh" size={18} />
          </TouchableOpacity>
        </View>
        <View style={tw`h-[50%] flex-1`}>
          <Icon
            color={tw.color("muted")}
            name="search"
            size={15}
            style={tw`absolute left-3 top-2`}
          />
          <TextInput
            onChangeText={setSearch}
            onSubmitEditing={onEnter}
            placeholder="Search Google or type a URL"
            style={tw`flex-1 h-full pt-1.1 pl-7.5 rounded-full border-[1px] border-white`}
            value={search}
          />
        </View>
        <View
          style={tw`flex min-w-18 justify-evenly flex-row h-full items-center`}
        >
          <Icon
            color={tw.color("foreground")}
            name="person-circle-outline"
            size={27}
          />
          <Icon
            color={tw.color("foreground")}
            name="ellipsis-vertical"
            size={18}
          />
        </View>
      </View>
    </View>
  );
}
