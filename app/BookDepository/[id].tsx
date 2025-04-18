import React, { useCallback } from "react";
import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";
import BookDeposButton from "@/components/ui/BookDeposButton";
import { router, useFocusEffect } from "expo-router";
import {
  getBookforId,
  getMaxId,
} from "@/components/BookDepository/BookDepository.service";
import { books } from ".";
import styles from "@/components/BookDepository/styles";
import { log } from "@/configs/logger";

export default function DetailBook() {
  let { id } = useLocalSearchParams<{ id: string }>();

  /**
   * Массив с книгой
   */
  const [array, setArray] = React.useState<books>();

  /**
   * Статус "последней книги"
   * Делает видимым или не видимым кнопку перехода на следующую книгу
   */
  const [status_id, setStatusId] = React.useState(false);

  /**
   * Получение максимального id
   * @returns Получение максимального id
   */
  const checkMaxId = async () => {
    let max_id = await getMaxId();
    let result = max_id != parseInt(id);
    setStatusId(result);
    return result;
  };

  /**
   * Осуществляется переход на следующую книгу
   */
  const handleNextBook = async () => {
    const canGoNextBook = await checkMaxId();
    if (canGoNextBook) {
      let new_id = parseInt(id) + 1;
      router.push({
        pathname: "/BookDepository/[id]",
        params: { id: new_id },
      });
      log.debug(`Пользователь перешёл на следующую книгу с id: ${new_id}`);
    }
  };

  /**
   * Получает информацию о книге по id
   * @param id Передаваемый id
   */
  const fetchData = async (id: number) => {
    const response = await getBookforId(id);
    if (response === undefined) {
      router.push("/BookDepository");
    }
    log.debug(
      `Пользователь получил данные когда зашёл посмотреть "подробнее": ${JSON.stringify(
        response
      )}`
    );
    setArray(response);
  };

  useFocusEffect(
    useCallback(() => {
      fetchData(parseInt(id));
    }, [id])
  );
  return (
    <View>
      <Text style={styles.h1}>{array?.name}</Text>
      <Text style={styles.textCenter}>Дата добавления: {array?.date}</Text>
      <Text style={styles.textCenter}>
        Прочтена? {array?.status ? "Да" : "Нет"}
      </Text>
      <View style={styles.center}>
        <BookDeposButton
          text="Перейти к остальным книгам"
          func={() => router.push("/BookDepository")}
        />
        <BookDeposButton
          text="Следующая книга"
          func={handleNextBook}
          disabled={status_id}
        />
      </View>
    </View>
  );
}
