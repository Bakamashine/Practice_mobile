import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Stack } from "expo-router";

// const Stack = createNativeStackNavigator();
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
        
        {/* {false ||
        <Drawer.Screen  name="DroidQuest/modal" options={{
          headerTitle: "Deceit",
          drawerItemStyle: {display: 'none'},
        }}  />
      } */}
      </Drawer>
    </GestureHandlerRootView>
  );
}

export default Layout;
