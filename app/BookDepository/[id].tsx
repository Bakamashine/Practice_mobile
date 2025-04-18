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

  const [new_id, setNewId] = React.useState(parseInt(id));
  const [array, setArray] = React.useState<books>();
  const [status_id, setStatusId] = React.useState(false);

  /**
   * Получение максимального id
   * @returns Получение максимального id
   */
  const checkMaxId = async () => {
    let max_id = await getMaxId();
    return max_id != new_id;
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

  /**
   * При смене new_id, идёт снова вызов функции fetchData
   */
  useFocusEffect(
    useCallback(() => {
      fetchData(new_id);
    }, [new_id])
  );

  /**
   * При изменения передаваемого id, меняет и переменную new_id
   */
  useFocusEffect(
    useCallback(() => {
      setNewId(parseInt(id));
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
