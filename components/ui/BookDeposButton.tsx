import { Text, TouchableOpacity, GestureResponderEvent } from "react-native";
import styles from "../BookDepository/styles";
import {StyleProp, ViewStyle} from 'react-native'
import React from "react";
import { books } from "@/app/BookDepository";

// export default function BookDeposButton(props: {
//   text: string;
//   func?: ((event: GestureResponderEvent) => void) | undefined;
//   disabled?: = false
// }) {
//   return (
//     <TouchableOpacity onPress={props.func} style={styles.button} disabled={props.disabled}>
//       <Text>{props.text}</Text>
//     </TouchableOpacity>
//   );
// }

export default function BookDeposButton({
  text,
  func,
  disabled = false,
  props_styles = {},
}: {
  text: string;
  func?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  props_styles?: StyleProp<ViewStyle>;
}) {
  return (
    <TouchableOpacity
      onPress={func}
      style={[styles.button, disabled ? styles.hidden : null, props_styles]}
      disabled={disabled}
    >
      <Text>{text}</Text>
    </TouchableOpacity>
  );
}
