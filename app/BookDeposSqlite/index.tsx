import React, { useCallback } from "react";
import { View, Text } from "react-native";
import BookDeposButton from "@/components/ui/BookDeposButton";
import Books from "@/datebase/Books";
import { log } from "@/configs/logger";
import { useFocusEffect } from "expo-router";
import { books } from "../BookDepository";

export default function BookDeposSqlite() {
  const sqlite = new Books();

  const [array, setArray] = React.useState<books[]>([]);

  const fetchData = async () => {
    const data: unknown[] | undefined = await sqlite.getData("books");
    log.debug(
      "(fetchData)(BookDeposSqlite) Полученные данные: ",
      JSON.stringify(data)
    );
    if (data !== undefined) {
      const booksArray = data as books[];
      setArray(booksArray);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );
  return (
    <View>
      <BookDeposButton text="Сделать миграции" func={async () => await sqlite.migrate()} />
        <BookDeposButton text="Удалить таблицу" func={async () => await sqlite.DropTable("books")} />
      <BookDeposButton
        text="Добавить книги"
        func={async () => {
          await sqlite.generateBooks();
          await fetchData();
        }}
      />
      <View>
        <Text>{array[0]?.name}</Text>
        <Text>{array[1]?.name}</Text>
                <Text>Hel</Text>
      </View>
    </View>
  );
}
