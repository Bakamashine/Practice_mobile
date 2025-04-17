import React, { useCallback } from "react";
import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";
import BookDeposButton from "@/components/ui/BookDeposButton";
import { router, useFocusEffect } from "expo-router";
import { getBookforId } from "@/components/BookDepository/BookDepository.service";
import { books } from ".";
import styles from "@/components/BookDepository/styles";

export default function DetailBook() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [array, setArray] = React.useState<books>();

  const fetchData = async (id: number) => {
    const response = await getBookforId(id);
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
          text="Назад"
          func={() => router.push("/BookDepository")}
        />
      </View>
    </View>
  );
}
