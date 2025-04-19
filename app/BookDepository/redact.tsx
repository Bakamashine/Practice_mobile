import React from "react";
import { Button, View, Text } from "react-native";
import { getBookforId } from "@/components/BookDepository/BookDepository.service";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { log } from "@/configs/logger";
import { books } from ".";
import { useCallback } from "react";
import BookDeposButton from "@/components/ui/BookDeposButton";
import { router } from "expo-router";
import DatePicker, {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import BackButton from "@/components/BookDepository/BookDeposBackButton";
import styles from "@/components/BookDepository/styles";

export default function redact() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [array, setArray] = React.useState<books>();
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState(new Date());
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
    }, [id])
  );

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate;
    currentDate !== undefined ? setDate(currentDate) : null
  };

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
