import { Text, TouchableOpacity, GestureResponderEvent } from "react-native";
import styles from "../BookDepository/styles";

import React from "react";

export default function BookDeposButton(props: {
  text: string;
  func?: ((event: GestureResponderEvent) => void) | undefined;
    
}) {
  return (
    <TouchableOpacity onPress={props.func} style={styles.button}>
      <Text>{props.text}</Text>
    </TouchableOpacity>
  );
}
