import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Stack = createNativeStackNavigator();
function Layout() {
  return (
    <GestureHandlerRootView>
      <Drawer>
        <Drawer.Screen name="index" options={{
          drawerLabel: 'Home',
          headerTitle: 'Home',
        }} />
        <Drawer.Screen name="DroidQuest/index" options={{
          drawerLabel: "DroidQuest",
          headerTitle: 'DroidQuest',
        }} />
      </Drawer>
    </GestureHandlerRootView>
  );
}

export default Layout;
