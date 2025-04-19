import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import styles from "@/components/BookDepository/styles";
import BookDeposButton from "@/components/ui/BookDeposButton";
import {
  date_to_day,
  storeData,
} from "@/components/BookDepository/BookDepository.service";
import { router } from "expo-router";

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

  function back() {
    router.replace("/BookDepository");
  }

  return (
    <View>
      <TextInput
        style={styles.TextInput}
        placeholder="Введите название книги."
        onChangeText={(value) => setName(value)}
      ></TextInput>
      <View style={[styles.center]}>
        <BookDeposButton
          text={`Добавить новую книгу`}
          func={async () => {
            await storeData({
              name: name,
              id: 0,
              date: date_to_day(new Date()),
              status: check,
            });
            back();
          }}
        />
        <BouncyCheckbox
          textStyle={{ textDecorationLine: "none" }}
          onPress={(isChecked: boolean) => setCheck(isChecked)}
          size={25}
          text="Прочтена?"
        />
        <BookDeposButton text="Назад" func={back} />
      </View>
    </View>
  );
}

export default add;
