import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useCallback } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { atoms } from "../lib/atoms";
import tw from "../lib/tw";
import type { Tab } from "../types";

export function Tabs() {
  const [tabs, setTabs] = useAtom(atoms.tabs);
  const setActive = useSetAtom(atoms.activeTab);

  const onSetTab = useCallback((tab: Tab) => {
    return () => {
      setActive(tab.id);
    };
  }, []);

  const onRemoveTab = useCallback((tab: Tab) => {
    return () => {
      setTabs((prev) => {
        const updated = prev.filter((t) => t.id !== tab.id);
        setActive(updated[0].id);
        return updated;
      });
    };
  }, []);

  const onAddTab = useCallback(() => {
    setTabs((prev) => {
      const id = prev.length;
      setActive(id);
      return [...prev, { id, page: {} }];
    });
  }, []);

  return (
    <View
      style={tw`flex-2.3 flex-row pl-22 pr-3 w-full justify-start items-end bg-secondary`}
    >
      {tabs.map((tab, index) => (
        <TabItem
          index={index}
          key={tab.id}
          onRemove={onRemoveTab(tab)}
          onSelect={onSetTab(tab)}
          tab={tab}
          totalTabs={tabs.length}
        />
      ))}

      <TouchableOpacity
        onPress={onAddTab}
        style={{
          ...tw`h-[70%] ml-3 items-center justify-center`,
          // @ts-expect-error
          cursor: "pointer",
        }}
      >
        <Icon
          color={tw.color("foreground")}
          name="add"
          size={18}
          style={tw``}
        />
      </TouchableOpacity>
    </View>
  );
}

function TabItem({
  tab,
  onRemove,
  onSelect,
  index,
  totalTabs,
}: {
  onRemove: () => void;
  onSelect: () => void;
  tab: Tab;
  index: number;
  totalTabs: number;
}) {
  const page = tab.page;
  const active = useAtomValue(atoms.activeTab);
  const isActiveTab = index === active;
  const isTabBeforeActive = index === active - 1;
  const isLastTab = index === totalTabs - 1;

  const shouldShowSeparator =
    (!isActiveTab && !isTabBeforeActive) || (isLastTab && !isActiveTab);

  return (
    <TouchableOpacity onPress={onSelect} style={tw`flex flex-1 max-w-47`}>
      <View
        style={{
          // @ts-expect-error
          cursor: "pointer",
          ...tw`max-w-47 w-full bg-card h-[80%] rounded-t-2`,
          backgroundColor: tab.id === active ? tw.color("card") : undefined,
        }}
      >
        <View
          style={tw`flex-row px-3 justify-between flex items-center h-full`}
        >
          <View style={tw`flex flex-row items-center`}>
            {page.favicon ? (
              <Image source={{ uri: page.favicon }} style={tw`h-4 w-4 mr-2`} />
            ) : null}
            <Text numberOfLines={1} style={tw`text-foreground text-xs flex-1`}>
              {page.title || "New Tab"}
            </Text>
            <TouchableOpacity
              onPress={onRemove}
              style={{
                // @ts-expect-error
                cursor: "pointer",
                backgroundColor:
                  tab.id === active ? tw.color("card") : undefined,
              }}
            >
              <Icon color={tw.color("foreground")} name="close" size={13} />
            </TouchableOpacity>
          </View>
        </View>
        {shouldShowSeparator ? (
          <View
            style={tw`bg-white opacity-50 h-[75%] w-[1px] absolute right-0 top-1`}
          />
        ) : null}
      </View>
    </TouchableOpacity>
  );
}
