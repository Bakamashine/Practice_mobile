import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import styles from "@/components/BookDepository/styles";
import BookDeposButton from "@/components/ui/BookDeposButton";
import { date_to_day } from "@/components/BookDepository/BookDepository.service";
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
   * Активная камера
   * Можно использовать заднюю и переднюю
   * @default "back"
   */
  const [facing, setFacing] = React.useState<Camera.CameraType>("back");

  /**
   * Полномочия
   */
  // const [permission, requestPermission] = Camera.useCameraPermissions();

  /**
   * Видимость камеры
   */
  // const [isCameraVisible, setIsCameraVisible] = React.useState(false);

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


  /**
   * Переключение камеры (можно использовать заднюю и переднюю)
   */
  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

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
              // func={() => setIsCameraVisible(true)}
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
              });
              router.replace("/BookDeposSqlite");
            }}
          />
          <BookDeposSqliteBackButton />
        </View>
        <Text style={[styles.textCenter, { marginTop: 20 }]}>
          Выбранная дата: {date_to_day(date)}{" "}
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
                  // resizeMode="contain"
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
      {/* {isCameraVisible && (
        <View style={styles.container}>
          <Camera.CameraView style={{ flex: 1 }} facing={facing}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={toggleCameraFacing}
              >
                <Text>Повернуть камеру</Text>
              </TouchableOpacity>
            </View>
          </Camera.CameraView>
        </View>
      )} */}
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