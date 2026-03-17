import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet, Text } from "react-native";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

function HomeTabIcon({ color }: Readonly<{ color: string }>) {
  return <IconSymbol size={28} name="multiply.circle.fill" color={color} />;
}

function ExploreTabIcon({ color }: Readonly<{ color: string }>) {
  return <Text style={[styles.divideIcon, { color }]}>÷</Text>;
}

function SquareRootsTabIcon({ color }: Readonly<{ color: string }>) {
  return <IconSymbol size={28} name="x.squareroot" color={color} />;
}

function renderHomeTabIcon({ color }: Readonly<{ color: string }>) {
  return <HomeTabIcon color={color} />;
}

function renderExploreTabIcon({ color }: Readonly<{ color: string }>) {
  return <ExploreTabIcon color={color} />;
}

function renderSquareRootsTabIcon({ color }: Readonly<{ color: string }>) {
  return <SquareRootsTabIcon color={color} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Multiply",
          tabBarIcon: renderHomeTabIcon,
        }}
      />
      <Tabs.Screen
        name="division"
        options={{
          title: "Divide",
          tabBarIcon: renderExploreTabIcon,
        }}
      />
      <Tabs.Screen
        name="square-roots"
        options={{
          title: "Squares",
          tabBarIcon: renderSquareRootsTabIcon,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  divideIcon: {
    fontSize: 28,
    lineHeight: 30,
    fontWeight: "800",
    textAlign: "center",
    minWidth: 28,
  },
});
