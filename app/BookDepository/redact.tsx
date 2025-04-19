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
} from "@react-native-community/datetimepicker";
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

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setDate(currentDate);
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
      <Text>{array?.name}</Text>
      <BookDeposButton
        text="Вернуться к книгам"
        func={() => router.replace("/BookDepository")}
      />
      <BookDeposButton text="Изменить дату" func={showMode} />
    </View>
  );
}
