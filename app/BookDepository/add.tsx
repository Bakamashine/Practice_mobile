import React from "react";
import { View, TextInput, Text, TouchableOpacity, StyleSheet} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import styles from "@/components/BookDepository/styles";
function add() {
  /**
   * Статус нажатия на checkbox
   * @default false
   */
  const [check, setCheck] = React.useState(false);

  return (
    <View>
      <TextInput
        style={styles.TextInput}
        placeholder="Введите название книги."
      ></TextInput>
      <View style={[styles.center, add_style.flex]}>
        <TouchableOpacity style={styles.button}>
          <Text>{Date()}</Text>
        </TouchableOpacity>
        <BouncyCheckbox
          textStyle={{ textDecorationLine: "none" }}
          onPress={(isChecked: boolean) => setCheck(isChecked)}
          size={25}
          text="Прочтена?"
        />
      </View>
    </View>
  );
}

export default add;

const add_style = StyleSheet.create({
  flex: {
    flex: 1,

  }
})