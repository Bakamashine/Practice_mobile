import React from "react";
import { Link, Href } from "expo-router";
import { GestureResponderEvent, StyleSheet, MouseEvent } from "react-native";

function MenuButton(props: {
  text: string;
  link: Href;
  func?: (e: GestureResponderEvent | MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <Link style={styles.btn} href={props.link} onPress={props.func}>
      {props.text}
    </Link>
  );
}

const styles = StyleSheet.create({
  btn: {
    color: "black",
  },
});
export default MenuButton;
