/**
 * Только для мобильных устройств
 * К сожалению, в браузере больше не открыть, выдаёт исключение
 *
 * !FIXME: Некорректно отображаются только что добавленные новые книги, после обновления всё приходит в норму
 */
import React, { useCallback, useEffect, useRef } from "react";
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

  /**
   * Переход на страницу по id
   * TODO: Находит индекс записи по id
   * @param index Индекс страницы на которую нужно перейти
   */
  const goToPage = (id: number) => {
    const index = array.findIndex((book) => book.id === id);
    if (index !== -1) {
      if (pagerRef.current) {
        // pagerRef.current.setPage(index);
        pagerRef.current.setPageWithoutAnimation(index);
        log.debug(`(goToPage)([id]): Перешло на страницу ${index}`);
      }
    } else log.error("Такой книги нет");
  };

  /**
   * Массив с книгой
   */
  const [array, setArray] = React.useState<books[]>([]);

  /**
   * Получает все книги
   */
  const fetchData = async () => {
    const response = await getData();
    if (response === undefined) {
      router.push("/BookDepository");
    }
    log.debug(
      `(fetchData)([id]): Пользователь получил такие данные: ${response}`
    );
    const booksArray: books[] = JSON.parse(response as string);
    setArray(booksArray);
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [id])
  );

  useFocusEffect(
    useCallback(() => {
      goToPage(parseInt(id));
    }, [array])
  );
  /**
   * Благодаря некоторым библиотекам, которые неразрывно связаны с android или ios
   * Перестало отображаться в браузере.
   * ! FIXME: Этот хак не работает
   */
  if (Platform.OS === "web") {
    return (
      <View style={styles.container}>
        <Text>Только для телефонов</Text>
      </View>
    );
  } else {
    return (
      <View style={styles_id.container}>
        <PagerView
          style={styles_id.container}
          ref={pagerRef}
          // key={array.length}
        >
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
