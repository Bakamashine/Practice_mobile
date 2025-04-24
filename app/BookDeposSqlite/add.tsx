import React from "react";
import { View, TextInput, StyleSheet, Text, Button } from "react-native";
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
import BookDeposSqliteBackButton from "@/components/BookDepository/BookDeposSqliteBackButton";
import Books from "@/datebase/Books";
import * as Camera from "expo-camera";
import * as Safe from "react-native-safe-area-context";

function add() {
  const book = new Books();
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

  const [facing, setFacing] = React.useState<Camera.CameraType>("back");
  const [permission, requestPermission] = Camera.useCameraPermissions();

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

  // if (!permission) {
  //   return <View />;
  // }

  // if (!permission.granted) {
  //   // Camera permissions are not granted yet.
  //   return (
  //     <View>
  //       <Text>Вы должны дать разрешение на камеру</Text>
  //       <Button onPress={requestPermission} title="Повышение полномочий" />
  //     </View>
  //   );
  // }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  return (
    <View>
      <View>
        <TextInput
          style={styles.TextInput}
          placeholder="Введите название книги."
          onChangeText={(value) => setName(value)}
        />
        <View style={styles.center}>
          <BookDeposButton
            text="Добавить фото"
            // props_styles={{ marginBottom: 20 }}
          />
          <BookDeposButton text="Выбрать дату" func={showMode} />
          
          {/* FIXME: BouncyBox не ставится по центру */}
          <View style={{ marginTop: 10, alignItems: "center" }}>
            <BouncyCheckbox
              textStyle={{ textDecorationLine: "none" }}
              onPress={(isChecked: boolean) => setCheck(isChecked)}
              size={25}
              text="Прочтена?"
            />
          </View>
        </View>
      </View>
      <View style={[styles.center]}>
        <BookDeposButton
          text="Добавить новую книгу"
          func={async () => {
            await book.addBook({
              name,
              date: date_to_day(date),
              status: check,
            });
            router.replace("/BookDeposSqlite");
          }}
        />
        <BookDeposSqliteBackButton />
      </View>
      <Text style={[styles.textCenter, { marginTop: 20 }]}>
        Выбранная дата: {date_to_day(date)}{" "}
      </Text>
    </View>
  );
}

export default add;
