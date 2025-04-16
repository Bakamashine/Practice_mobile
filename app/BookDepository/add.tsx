import React from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import styles from "@/components/BookDepository/styles";
import BookDeposButton from "@/components/ui/BookDeposButton";
import { storeData } from "@/components/BookDepository/BookDepository.service";

function add() {
  /**
   * Статус нажатия на checkbox
   * @default false
   */
  const [check, setCheck] = React.useState(false);

  /**
   * Имя вводимой книги
   * @default ''
   */
  const [name, setName] = React.useState("");

  React.useEffect(() => {
    console.log(`Debug: '${name}'`);
  }, [name]);

  return (
    <View>
      <TextInput
        style={styles.TextInput}
        placeholder="Введите название книги."
        onChangeText={(value) => setName(value)}
      ></TextInput>
      <View style={[styles.center, add_style.flex]}>
        <BookDeposButton
          text={Date()}
          func={() => {
            storeData({ name: name, date: new Date(), id: 0, status: check });
          }}
        />
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
  },
});
