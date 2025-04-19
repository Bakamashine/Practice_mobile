/**
 * Только для мобильных устройств
 * К сожалению, в браузере больше не открыть, выдаёт исключение
 */
import React, { useCallback, useRef } from "react";
import { useLocalSearchParams } from "expo-router";
import { View, Text, Platform, StyleSheet } from "react-native";
import BookDeposButton from "@/components/ui/BookDeposButton";
import { router, useFocusEffect } from "expo-router";
import { getData } from "@/components/BookDepository/BookDepository.service";
import { books } from ".";
import styles from "@/components/BookDepository/styles";
import { log } from "@/configs/logger";
import PagerView from "react-native-pager-view";
import BookDeposBackButton from "@/components/BookDepository/BookDeposBackButton";

export default function DetailBook() {
  let { id } = useLocalSearchParams<{ id: string }>();

  const pagerRef = useRef<PagerView>(null);

  const goToPage = (index: number) => {
    if (pagerRef.current) {
      pagerRef.current.setPageWithoutAnimation(index);
    }
  };

  /**
   * Массив с книгой
   */
  const [array, setArray] = React.useState<books[]>([]);

  /**
   * Получает информацию о книге по id
   * @param id Передаваемый id
   */
  const fetchData = async (id: number) => {
    const response = await getData();
    if (response === undefined) {
      router.push("/BookDepository");
    }
    log.debug(
      `(fetchData)([id]): Пользователь получил такие данные: ${JSON.stringify(
        response
      )}`
    );
    // setArray(JSON.parse(response as string));
    const booksArray: books[] = JSON.parse(response as string);
    setArray(booksArray);
    const index = booksArray.findIndex((book) => book.id === id);
    index !== -1 ? goToPage(index) : null;
  };

  useFocusEffect(
    useCallback(() => {
      fetchData(parseInt(id));
    }, [id])
  );

  if (Platform.OS === "web") {
    return (
      <View style={styles.container}>
        <Text>Только для телефонов</Text>
      </View>
    );
  } else {
    return (
      <View style={styles_id.container}>
        <PagerView style={styles_id.container} ref={pagerRef}>
          {array.map((item) => (
            <View key={item.id} style={styles_id.page}>
              <Text style={styles.h1}>{item?.name}</Text>
              <Text style={styles.textCenter}>
                Дата добавления: {item?.date}
              </Text>
              <Text style={styles.textCenter}>
                Прочтена? {item?.status ? "Да" : "Нет"}
              </Text>
              <BookDeposBackButton />
            </View>
          ))}
        </PagerView>
      </View>
    );
  }
}

const styles_id = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
  },
});
