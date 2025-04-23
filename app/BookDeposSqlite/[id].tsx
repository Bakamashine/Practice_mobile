import React, { useCallback, useEffect, useRef } from "react";
import { useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  Platform,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { router, useFocusEffect } from "expo-router";
import Books, { books } from "@/datebase/Books";
import styles from "@/components/BookDepository/styles";
import { log } from "@/configs/logger";
import PagerView from "react-native-pager-view";
import BookDeposSqliteBackButton from "@/components/BookDepository/BookDeposSqliteBackButton";
import BookDeposButton from "@/components/ui/BookDeposButton";

export default function DetailBook() {
  let { id } = useLocalSearchParams<{ id: string }>();

  const books = new Books();
  const pagerRef = useRef<PagerView>(null);

  const [loading, setLoading] = React.useState(true);

  /**
   * Массив с книгами
   */
  const [array, setArray] = React.useState<books[]>([]);

  /**
   * Переход на страницу по id
   * TODO: Находит индекс записи по id
   */
  const goToPage = (id: number) => {
    const index = array.findIndex((book) => book.id === id);
    if (index !== -1 && pagerRef.current && array.length > 0) {
      pagerRef.current.setPageWithoutAnimation(index);
      log.debug(
        `(BooksDeposSqlite)(goToPage)([id]): Перешло на страницу ${index}`
      );
    } else log.error("Такой книги нет");
  };

  /**
   * Получает все книги
   */
  const fetchData = async () => {
    try {
      const response = await books.getData();
      if (response !== undefined) {
        const BooksArray = response as books[];
        log.debug("(BookDeposSqlite)[id] Полученные данные: ", BooksArray);
        setArray(BooksArray);
      }
    } catch (err) {
      log.error(err);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    //   goToPage(parseInt(id));
    }, [])
  );

    // useFocusEffect(
    //   useCallback(() => {
    //     goToPage(parseInt(id));
    //   }, [array])
    // );

    useEffect(() => {
        if (!loading) {
            goToPage(parseInt(id))
        }
    }, [id, loading, array])

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={"large"} color={"#0000ff"} />
      </View>
    );
  }

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
              <BookDeposSqliteBackButton />
                <BookDeposButton
                text='Отправить отчёт о прочтении'
                />
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
