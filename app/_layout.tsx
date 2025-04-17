import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Stack } from "expo-router";
import CustomDrawerComponents from "@/components/CustomDrawerComponents";

// const Stack = createNativeStackNavigator();
function Layout() {
  return (
    <GestureHandlerRootView>
      <Drawer drawerContent={CustomDrawerComponents}>
        <Drawer.Screen name="index" options={{
          // drawerLabel: 'Home',
          headerTitle: 'Главная',
        }} />
        <Drawer.Screen name="DroidQuest/index" options={{
          // drawerLabel: "DroidQuest",
          headerTitle: 'DroidQuest',
        }} />
        
        <Drawer.Screen name="BookDepository/index" options={{
          drawerLabel: "BookDepository",
          headerTitle: "BookDepository",
          // headerBackground:  () => null
        }} />
        
        <Drawer.Screen name="BookDepository/add" options={{
          headerTitle: "Добавление книги"
        }} />
        
        <Drawer.Screen name="BookDepository/[id]" options={{
          headerTitle: "Подробная информация книги" 
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
