import React from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import styles from "@/components/BookDepository/styles";
import BookDeposButton from "@/components/ui/BookDeposButton";
import {
  date_to_day,
  storeData,
} from "@/components/BookDepository/BookDepository.service";
import { router } from "expo-router";
import {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import BookDeposBackButton from "@/components/BookDepository/BookDeposBackButton";

function add() {
  const [date, setDate] = React.useState(new Date());
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

  /**
   * Меняет дату
   * @param event Не используется, DateTimePickerAndroid сам передаёт аргумент
   * @param selectedDate Необязательный параметр (хотя странно), служит для передачи выбранной даты
   */
  const onChange = async (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate;
    currentDate !== undefined ? setDate(currentDate) : null;
  };

  /**
   * Отображает меню с выбором даты
   * @param currentMode Необязательный параметр, он сам его передаёт
   */
  const showMode = (currentMode: any) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  return (
    <View>
      <TextInput
        style={styles.TextInput}
        placeholder="Введите название книги."
        onChangeText={(value) => setName(value)}
      ></TextInput>
      <Text style={styles.textCenter}>Выбранная дата: {date_to_day(date)} </Text>
      <View style={[styles.center]}>
        <BookDeposButton
          text={`Добавить новую книгу`}
          func={async () => {
            await storeData({
              name: name,
              id: 0,
              date: date_to_day(date),
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
        <BookDeposButton text="Выбрать дату" func={showMode} />
        <BookDeposBackButton />
      </View>
    </View>
  );
}

export default add;
