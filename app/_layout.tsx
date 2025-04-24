import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Stack } from "expo-router";
import CustomDrawerComponents from "@/components/CustomDrawerComponents";

function Layout() {
  return (
    <GestureHandlerRootView>
      <Drawer drawerContent={CustomDrawerComponents}>
        <Drawer.Screen
          name="index"
          options={{
            headerTitle: "Главная",
          }}
        />
        <Drawer.Screen
          name="DroidQuest/index"
          options={{
            headerTitle: "DroidQuest",
          }}
        />

        <Drawer.Screen
          name="BookDepository/index"
          options={{
            drawerLabel: "BookDepository",
            headerTitle: "BookDepository",
          }}
        />

        <Drawer.Screen
          name="BookDepository/add"
          options={{
            headerTitle: "Добавление книги",
          }}
        />

        <Drawer.Screen
          name="BookDepository/[id]"
          options={{
            headerTitle: "Подробная информация книги",
          }}
        />

        <Drawer.Screen
          name="BookDeposSqlite/index"
          options={{
            headerTitle: "BookDeposSqlite",
          }}
        />

        <Drawer.Screen
          name="BookDeposSqlite/[id]"
          options={{
            headerTitle: "Подробная информация книги (sqlite)",
          }}
        />

        <Drawer.Screen
          name="BookDeposSqlite/redact"
          options={{
            headerTitle: "Изменение даты книги (sqlite)",
          }}
        />

        <Drawer.Screen
          name="BookDeposSqlite/add"
          options={{
            headerTitle: "Добавление книги (sqlite)",
          }}
        />
        
        <Drawer.Screen
        name="BookDeposSqlite/camera"
        options={{
            headerShown: false
        }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

export default Layout;
