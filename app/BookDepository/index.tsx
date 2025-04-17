import { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  FlatList,
  RefreshControl,
} from "react-native";
import styles from "@/components/BookDepository/styles";
import BookDeposButton from "@/components/ui/BookDeposButton";
import {
  router,
  useGlobalSearchParams,
  useLocalSearchParams,
} from "expo-router";
import {
  getData,
  DeleteAll,
  deleteBook,
} from "@/components/BookDepository/BookDepository.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";

export interface books {
  id: number;
  name: string;
  status: boolean;
  date: string;
}

function BookDepository() {
  const [array, setArray] = useState<books[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState(false);
  /**
   * Получение данных
   */
  const fetchData = async () => {
    try {
      const data = await getData();
      setArray(data ? JSON.parse(data) : []);
      // console.log("data: ", data);
      // console.log("parsedData: ", JSON.parse(data as string));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  // useEffect(() => {
  //   fetchData();
  // }, []);

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
          func={() => router.replace("/BookDepository/add")}
        />

        <BookDeposButton
          text="Если же вы добавили книгу, пожалуйста, перезагрузите страницу"
          func={fetchData}
        />
      </View>
    );
  } else {
    return (
      <View>
        {/* <Text style={styles.h1}>Ваши книги: </Text> */}
        {/* {array.map((books) => (
          <View key={books.id} style={BookDepository_styles.section}>
            <Text>Id книги: {books.id}</Text>
            <Text>Название книги: {books.name}</Text>
            <Text>Дата добавление книги: {books.date}</Text>
            <Text>Прочтена? {books.status ? "Да" : "Нет"}</Text>
            <BookDeposButton
              text="Удалить книгу"
              func={async () => {
                await deleteBook(books.id);
                fetchData();
              }}
            />
          </View>
        ))} */}
        <FlatList
          data={array}
          renderItem={({ item }) => (
            <View key={item.id} style={BookDepository_styles.section}>
              <Text>Id книги: {item.id}</Text>
              <Text>Название книги: {item.name}</Text>
              <Text>Дата добавление книги: {item.date}</Text>
              <Text>Прочтена? {item.status ? "Да" : "Нет"}</Text>
              <BookDeposButton
                text="Удалить книгу"
                func={async () => {
                  await deleteBook(item.id);
                  fetchData();
                }}
              />
            </View>
          )}
          // keyExtractor={(item) => item.id}
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
              <BookDeposButton
                text="Удалить все книги"
                func={async () => {
                  await DeleteAll();
                  setArray([]);
                  fetchData();
                }}
              />
            </View>
          }
        />
        {/* <View style={styles.center}>
          <BookDeposButton
            text="Создать новую книгу"
            func={() => router.replace("/BookDepository/add")}
          />
          <BookDeposButton
            text="Удалить все книги"
            func={async () => {
              await DeleteAll();
              setArray([]);
              fetchData();
            }} */}
        {/* /> */}
      </View>
      //  </View>
    );
  }
}

export default BookDepository;

const BookDepository_styles = StyleSheet.create({
  section: {
    borderBlockColor: "black",
    borderWidth: 1,
    padding: 10,
    margin: 10,
  },
});
