import { Text, TouchableOpacity, GestureResponderEvent } from "react-native";
import styles from "../BookDepository/styles";

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
}: {
  text: string;
  func?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
}) {

  return (
    <TouchableOpacity onPress={func} style={[styles.button, disabled ? styles.hidden : null]} disabled={disabled}>
      <Text>{text}</Text>
    </TouchableOpacity>
  );
}

