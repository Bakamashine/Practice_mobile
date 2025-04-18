import React, { useCallback } from "react";
import { useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  Dimensions,
} from "react-native";
import BookDeposButton from "@/components/ui/BookDeposButton";
import { router, useFocusEffect } from "expo-router";
import {
  getBookforId,
  getData,
  getMaxId,
} from "@/components/BookDepository/BookDepository.service";
import { books } from ".";
import styles from "@/components/BookDepository/styles";
import { log } from "@/configs/logger";
import { SwiperFlatList } from "react-native-swiper-flatlist";

export default function DetailBook() {
  let { id } = useLocalSearchParams<{ id: string }>();

  const [array, setArray] = React.useState<books[]>([]);
  const [position, setPos] = React.useState(0);

  /**
   * Получает информацию о книге по id
   * @param id Передаваемый id
   */
  const fetchData = async (id: number) => {
    const response = await getData();
    if (response === undefined) router.push("/BookDepository");
    else {
      log.debug(
        `(fetchData)([id]): Пользователь получил вот такие данные: ${JSON.stringify(
          response
        )} `
      );
      const booksData: books[] = JSON.parse(response);
      setArray(booksData);
      setPos(id)
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData(parseInt(id));
    }, [id])
  );
  return (
    <View style={[styles_id.container]}>
      <SwiperFlatList
        key={position}
        index={position}
        data={array}
        showPagination
        renderItem={({ item }: { item: books }) => (
          <View style={[styles_id.child]}>
            <Text>{position}</Text>
            <Text style={styles_id.text}>Название книги: {item.name}</Text>
            <Text>Прочтена? {item.status ? "Да" : "Нет"}</Text>
            <BookDeposButton
              text="Перейти к остальным книгам"
              func={() => router.push("/BookDepository")}
            />
            <Text>Для перехода к следущей, свайпните вправо</Text>
          </View>
        )}
      />
    </View>
  );
}

const { width } = Dimensions.get("window");
const styles_id = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  child: { width, justifyContent: "center" },
  text: {
    fontSize: 20,
  },
});
