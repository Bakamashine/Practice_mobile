import React, { useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TextInput,
  Modal,
  StyleSheet,
} from "react-native";
import { date_to_day } from "@/components/BookDepository/BookDepository.service";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { log } from "@/configs/logger";
import { books } from "@/datebase/Books";
import { useCallback } from "react";
import BookDeposButton from "@/components/ui/BookDeposButton";
import {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import styles from "@/components/BookDepository/styles";
import Books from "@/datebase/Books";
import BookDeposSqliteBackButton from "@/components/BookDepository/BookDeposSqliteBackButton";

export default function redact() {
  /**
   * Передаваемый id
   */
  const { id } = useLocalSearchParams<{ id: string }>();

  const book = new Books();

  /**
   * Объект, в который добавления книга,
   * вызванная по id
   */
  const [array, setArray] = React.useState<books>();

  /**
   * Переменная под дату
   */
  const [date, setDate] = React.useState(new Date());
  const [loading, setLoading] = React.useState(true);
  const [name, setName] = React.useState("");
  const [modalView, setModalView] = React.useState(false);

  /**
   * Получение книги по id
   * @param id
   */
  const fetchData = async (id: number) => {
    try {
      const response = await book.getRecordForId(id, "books");
      log.debug(
        `(BookDeposSqlite/redact): Пользователь получил такую запись: ${JSON.stringify(
          response
        )}`
      );
      if (response !== undefined && response !== null) {
        const booksArray = response as books;
        setArray(booksArray);
        setName(booksArray.name);
      }
    } catch (err) {
      log.error(err);
    } finally {
      setLoading(false);
    }
  };
  useFocusEffect(
    useCallback(() => {
      fetchData(parseInt(id));
    }, [id, date])
  );

  useEffect(() => {
    setTimeout(() => {
      setModalView(false);
    }, 2000);
  }, [modalView]);

  /**
   * Меняет дату
   * @param event Не используется, DateTimePickerAndroid сам передаёт аргумент
   * @param selectedDate Необязательный параметр (хотя странно), служит для передачи выбранной даты
   */
  const onChange = async (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate;

    await book.updateForIdBooks(parseInt(id), {
      row: "date",
      value: date_to_day(currentDate),
    });
    currentDate !== undefined ? setDate(currentDate) : null;
  };

  const updateName = async () => {
    if (name !== undefined && name !== "") {
      await book.updateForIdBooks(parseInt(id), {
        row: "name",
        value: name as string,
      });
      setModalView(true);
    }
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

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={"large"} color={"#0000ff"} />
      </View>
    );
  }

  return (
    <View>
      <TextInput
        style={styles.TextInput}
        value={name}
        onChangeText={(value) => setName(value)}
        placeholder="Новое название"
      />
      <Text style={styles.textCenter}>Дата добавления: {array?.date}</Text>
      <Text style={styles.textCenter}>
        Прочтена? {array?.status ? "Да" : "Нет"}
      </Text>
      <View style={styles.center}>
        <BookDeposSqliteBackButton />
        <BookDeposButton text="Изменить дату" func={showMode} />
        <BookDeposButton text="Изменить название" func={updateName} />
      </View>
      {/* Модальное окно при попытке ответить на вопрос */}
      <View>
        <Modal visible={modalView} animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text>Название изменено</Text>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}
