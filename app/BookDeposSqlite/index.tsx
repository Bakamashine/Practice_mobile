/**
 * В отличие от обычной версии, тут будет реализовано хранение данных не в асинхронном хранилище (Библиотека AsyncStorage),
 * а в БД sqlite
 * В качестве управления sqlite, использовал библиотеку Prisma
 */


import { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  RefreshControl,
} from "react-native";
import styles from "@/components/BookDepository/styles";
import BookDeposButton from "@/components/ui/BookDeposButton";
import { router } from "expo-router";
import { useFocusEffect } from "expo-router";
import { log } from "@/configs/logger";
import { books } from "../BookDepository";
import BooksSqlite from "@/components/BookDepository/sqlite";

const sqlite = new BooksSqlite;

function BookDepositorySqlite() {
  /**
   * Массив в который передаётся информация о книгах
   * из AsyncStorage
   * @default []
   */
  const [array, setArray] = useState<books[]>([]);

  /**
   * Статус прогрузки страницы
   * @default true
   */
  const [loading, setLoading] = useState<boolean>(false);

  /**
   * Статус перезагрузки для FlatList (RefreshControll)
   * @default false
   */
  const [refreshing, setRefreshing] = useState(false);
  /**
   * Получение данных
   */
  const fetchData = async () => {
    // try {
    //   const data = await getData();
    //   log.debug(`(fetchData): Полученные данные: ${data}`);
    //   setArray(data ? JSON.parse(data) : []);
    // } catch (err) {
    //   console.error(err);
    // } finally {
    //   setLoading(false);
    // }
    
    // try {
    //   const data = await BooksSqlite.getAllBooks();
    //   if (data !== undefined && data !== null ) {
    //     // setArray(data);
    //     log.info(data)
    //   }
    // } catch (err) {
    //   log.error(err)
    // } finally {
    //   setLoading(false)
    // }
  };
  // useEffect(() => sqlite.connectDB(), [])

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={"large"} color={"#0000ff"} />
      </View>
    );
  }

  if (array.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.h1}>Книги отсуствуют</Text>
        <BookDeposButton
          text="Создать новую книгу"
          func={() => {
            router.replace("/BookDepository/add");
          }}
        />
        <BookDeposButton
          text="Добавить книг"
          func={async () => {
            await sqlite.generateBooks()
            fetchData();
          }}
        />
        <BookDeposButton
        text="Сделать миграции"
        func={async () => {
          await sqlite.migrate()
          fetchData()
        }}
        />
      </View>
    );
  } else {
    return (
      <View>
        <FlatList
          data={array}
          renderItem={({ item }) => (
            <View key={item.id} style={BookDepository_styles.section}>
              <Text>Id книги: {item.id}</Text>
              <Text>Название книги: {item.name}</Text>
              <Text>Дата добавление книги: {item.date}</Text>
              <Text>Прочтена? {item.status ? "Да" : "Нет"}</Text>
              {/* <BookDeposButton
                text="Удалить книгу"
                func={async () => {
                  await deleteBook(item.id);
                  fetchData();
                }}
              /> */}
              <BookDeposButton
                text="Посмотреть книгу подробнее"
                func={() =>
                  router.push({
                    pathname: "/BookDepository/[id]",
                    params: { id: item.id },
                  })
                }
              />
              <BookDeposButton
                text="Изменить дату прочтения"
                func={() =>
                  router.push({
                    pathname: "/BookDepository/redact",
                    params: { id: item.id },
                  })
                }
              />
            </View>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
          }
          ListHeaderComponent={
            <View>
              <Text style={styles.h1}>Ваши книги: </Text>
              <Text style={{ textAlign: "center" }}>
                (для перезагрузки страницы, свайпните вверх)
              </Text>
            </View>
          }
          ListFooterComponent={
            <View style={styles.center}>
              <BookDeposButton
                text="Создать новую книгу"
                func={() => router.replace("/BookDepository/add")}
              />
              {/* <BookDeposButton
                text="Удалить все книги"
                func={async () => {
                  await DeleteAll();
                  setArray([]);
                  fetchData();
                }}
              /> */}
            </View>
          }
        />
      </View>
    );
  }
}

export default BookDepositorySqlite;

const BookDepository_styles = StyleSheet.create({
  section: {
    borderBlockColor: "black",
    borderWidth: 1,
    padding: 10,
    margin: 10,
  },
});


