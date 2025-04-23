import React from "react";
import { Button, View, Text, ActivityIndicator } from "react-native";
import {
  date_to_day,
  getBookforId,
  updateDate,
} from "@/components/BookDepository/BookDepository.service";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { log } from "@/configs/logger";
import { books } from "@/datebase/Books";
import { useCallback } from "react";
import BookDeposButton from "@/components/ui/BookDeposButton";
import { router } from "expo-router";
import {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import BackButton from "@/components/BookDepository/BookDeposBackButton";
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

  /**
   * Меняет дату
   * @param event Не используется, DateTimePickerAndroid сам передаёт аргумент
   * @param selectedDate Необязательный параметр (хотя странно), служит для передачи выбранной даты
   */
  const onChange = async (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate;
    // await updateDate(parseInt(id), currentDate as Date);
    await book.updateRecord(
      {
        id: "id",
        value: parseInt(id),
      },
      {
        one: "date",
        two: date_to_day(currentDate),      
      },
      "books",
    );
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

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={"large"} color={"#0000ff"} />
      </View>
    );
  }

  return (
    <View>
      <Text style={styles.h1}>{array?.name}</Text>
      <Text style={styles.textCenter}>Дата добавления: {array?.date}</Text>
      <Text style={styles.textCenter}>
        Прочтена? {array?.status ? "Да" : "Нет"}
      </Text>
      <View style={styles.center}>
        <BookDeposSqliteBackButton />
        <BookDeposButton text="Изменить дату" func={showMode} />
      </View>
    </View>
  );
}
