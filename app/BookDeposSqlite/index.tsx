/**
 * В отличие от обычного BookDepository,
 * Хранение книг происходит в sqlite
 * Для этого используется библиотека expo-sqlite
 */
import React, { useCallback, useEffect, useState } from "react";
import { Link, router } from "expo-router";
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Image,
} from "react-native";
import BookDeposButton from "@/components/ui/BookDeposButton";
import Books from "@/datebase/Books";
import { log } from "@/configs/logger";
import { useFocusEffect } from "expo-router";
import { BookDepository_styles } from "../BookDepository";
import styles from "@/components/BookDepository/styles";
import { books } from "@/datebase/Books";

export default function BookDeposSqlite() {
  const sqlite = new Books();

  const [array, setArray] = React.useState<books[]>([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  const fetchData = async () => {
    try {
      const data: unknown[] | undefined = await sqlite.getData();
      log.debug(
        "(fetchData)(BookDeposSqlite) Полученные данные: ",
        JSON.stringify(data)
      );
      if (data !== undefined) {
        const booksArray = data as books[];
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
      fetchData();
    }, [])
  );

  // async function checkImage(image: string) {
  //   const result = await FileSystem.getInfoAsync(image);
  //   return result.exists;
  // }

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={"large"} color={"#0000ff"} />
      </View>
    );
  }
  return (
    <View>
      <FlatList
        data={array}
        renderItem={({ item }) => (
          <View key={item.id} style={BookDepository_styles.section}>
            <Image
              source={
                item.image
                  ? { uri: item.image }
                  : require("@/datebase/default_image.jpg")
              }
              style={[
                {
                  width: 100,
                  height: 100,
                  borderRadius: 10,
                },
                styles.marginCenter,
              ]}
            />
            <Text>Id книги: {item.id}</Text>
            <Text>Название книги: {item.name}</Text>
            <Text>Дата добавление книги: {item.date}</Text>
            <Text>Прочтена? {item.status ? "Да" : "Нет"}</Text>
            <View>
              <BookDeposButton
                text="Удалить книгу"
                func={async () => {
                  await sqlite.DeleteRecord(item.id as number, "books");
                  await fetchData();
                }}
              />
              <BookDeposButton
                text="Изменить дату прочтения"
                func={() =>
                  router.push({
                    pathname: "/BookDeposSqlite/redact",
                    params: { id: item.id },
                  })
                }
              />
              <BookDeposButton
                text="Посмотреть книгу "
                func={() => {
                  router.push(`/BookDeposSqlite/${item.id}`);
                }}
              />
            </View>
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
          <View style={[styles.center, { paddingBottom: 40 }]}>
            <BookDeposButton
              text="Добавить новую книгу"
              func={() => {
                router.push("/BookDeposSqlite/add");
              }}
            />

            <BookDeposButton
              text="Добавить книги"
              func={async () => {
                await sqlite.generateBooks();
                await fetchData();
              }}
            />

            <BookDeposButton
              text="Удалить все книги"
              func={async () => {
                await sqlite.DeleteTable("books");
                await fetchData();
              }}
            />
            <Text style={[styles.textCenter, {marginTop: 15}]}>Дальше будет работа с БД (аккуратно)</Text>
            <BookDeposButton
              text="Сделать миграции"
              func={async () => await sqlite.migrate()}
            />
            <BookDeposButton
              text="Удалить таблицу с книгами"
              func={async () => await sqlite.DropTable("books")}
            />
          </View>
        }
      />
    </View>
  );
}
