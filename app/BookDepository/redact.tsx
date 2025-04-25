import React from "react";
import { View, Text } from "react-native";
import {
  getBookforId,
  updateDate,
} from "@/components/BookDepository/BookDepository.service";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { log } from "@/configs/logger";
import { books } from ".";
import { useCallback } from "react";
import BookDeposButton from "@/components/ui/BookDeposButton";
import {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import BackButton from "@/components/BookDepository/BookDeposBackButton";
import styles from "@/components/BookDepository/styles";

export default function redact() {
  /**
   * Передаваемый id
   */
  const { id } = useLocalSearchParams<{ id: string }>();

  /**
   * Объект, в который добавления книга,
   * вызванная по id
   */
  const [array, setArray] = React.useState<books>();

  /**
   * Переменная под дату
   */
  const [date, setDate] = React.useState(new Date());

  /**
   * Получение книги по id
   * @param id
   */
  const fetchData = async (id: number) => {
    const response = await getBookforId(id);
    log.debug(
      `(fetchData)(redact): Пользователь получил такую запись: ${JSON.stringify(
        response
      )}`
    );
    if (response !== undefined || response !== null) {
      setArray(response);
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
    await updateDate(parseInt(id), currentDate as Date);
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
      <Text style={styles.h1}>{array?.name}</Text>
      <Text style={styles.textCenter}>Дата добавления: {array?.date}</Text>
      <Text style={styles.textCenter}>
        Прочтена? {array?.status ? "Да" : "Нет"}
      </Text>
      <View style={styles.center}>
        <BackButton />
        <BookDeposButton text="Изменить дату" func={showMode} />
      </View>
    </View>
  );
}
