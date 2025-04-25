import React, { useCallback, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import styles from "@/components/BookDepository/styles";
import BookDeposButton from "@/components/ui/BookDeposButton";
import { date_to_day } from "@/components/BookDepository/BookDepository.service";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import BookDeposSqliteBackButton from "@/components/BookDepository/BookDeposSqliteBackButton";
import Books from "@/datebase/Books";
import { log } from "@/configs/logger";

function add() {
  const book = new Books();
  const {new_img }= useLocalSearchParams<{new_img?: string, new_book?: string}>()
  /**
   * Хранение выбранной даты
   * @default new Date()
   */
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


  /**
   * После фотографирования или добавления с галереи, сохраняется в image
   * @default undefined
   */
  const [image, setImage] = React.useState<string | undefined>(undefined);

  /**
   * Статус модального окна (открывается при клике на изображение)
   * @default false
   */
  const [statusModal, setStatusModal] = React.useState(false);

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
  
  
  function reset() {
    setImage(undefined);
    setName("");
    setDate(new Date());
    setCheck(false);
  }


  useEffect(() => {
    if (new_img !== undefined && new_img !== null) {
      setImage(new_img)
      log.debug("(BookDeposSqlite)(add)(useEffect) setImage: ", new_img)
    }
  }, [new_img])

  return (
    <View>
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
              func={() => router.push("/BookDeposSqlite/camera")} 
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
                image: image
              });
              router.replace("/BookDeposSqlite");
            }}
          />
          <BookDeposSqliteBackButton />
        </View>
        <Text style={[styles.textCenter, { marginTop: 20 }]}>
          Выбранная дата: {date_to_day(date)}
        </Text>

        <View style={{ marginTop: 20 }}>
          <Text style={styles.textCenter}>Фото книги: </Text>
          <TouchableOpacity onPress={() => setStatusModal(true)}>
            <Image
              source={
                image ? { uri: image } : require("@/datebase/default_image.jpg")
              }
              style={StyleSheet.flatten([
                add_style.ImageStyle,
                styles.marginCenter,
              ])}
            />
          </TouchableOpacity>
        </View>
        <View>
          <Modal visible={statusModal} animationType="slide">
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Image
                  source={
                    image
                      ? { uri: image }
                      : require("@/datebase/default_image.jpg")
                  }
                  style={StyleSheet.flatten([
                    add_style.ImageStyle2,
                    styles.marginCenter,
                  ])}
                  resizeMode="stretch"
                />

                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    setStatusModal(false);
                  }}
                >
                  <Text>Назад</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </View>
  );
}

const add_style = StyleSheet.create({
  ImageStyle: {
    borderWidth: 1,
    borderColor: "black",
    width: 100,
    height: 100,
    marginTop: 5,
  },
  ImageStyle2: {
    width: 200,
    height: 500,
    marginTop: 5,
  },
});

export default add;