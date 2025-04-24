import React from "react";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { router } from "expo-router";

export default function CustomDrawerComponents(props: any) {
  return (
    <DrawerContentScrollView {...props}>
      {/* <DrawerItemList {...props} /> */}
      <DrawerItem label={"Главная"} onPress={() => router.replace("/")} />
      <DrawerItem
        label={"DroidQuest"}
        onPress={() => router.replace("/DroidQuest")}
      />
      <DrawerItem
        label={"BookDepository"}
        onPress={() => router.replace("/BookDepository")}
      />

      <DrawerItem
        label={"BookDeposSqlite"}
        onPress={() => router.replace("/BookDeposSqlite")}
      />
      
      {/* Camera */}
      {/* <DrawerItem
      label={"Camera"}
      onPress={() => router.replace("/BookDeposSqlite/camera")}
      /> */}
    </DrawerContentScrollView>
  );
}
