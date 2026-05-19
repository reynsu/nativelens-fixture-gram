import { Tabs } from "expo-router";
import { Text } from "react-native";
import { colors } from "../../src/theme";

function tabIcon(symbol: string) {
  return ({ color }: { color: string }) => (
    <Text style={{ fontSize: 22, color }}>{symbol}</Text>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.tabActive,
        tabBarInactiveTintColor: colors.tabInactive,
        tabBarStyle: { borderTopColor: colors.border },
        headerStyle: { backgroundColor: colors.bg },
        headerShadowVisible: false,
        headerTitleStyle: { fontWeight: "700" },
      }}
    >
      <Tabs.Screen
        name="feed"
        options={{
          title: "Pixly",
          tabBarLabel: "Feed",
          tabBarIcon: tabIcon("⌂"),
          tabBarButtonTestID: "tab-feed",
        }}
      />
      <Tabs.Screen
        name="dms"
        options={{
          title: "Messages",
          tabBarLabel: "DMs",
          tabBarIcon: tabIcon("✉"),
          tabBarButtonTestID: "tab-dms",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarLabel: "Profile",
          tabBarIcon: tabIcon("◉"),
          tabBarButtonTestID: "tab-profile",
        }}
      />
    </Tabs>
  );
}
