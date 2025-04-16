import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import styles from "@/components/BookDepository/styles";
import BookDeposButton from "@/components/ui/BookDeposButton";
import { router } from "expo-router";
import { getData } from "@/components/BookDepository/BookDepository.service";

export interface books {
  id: number;
  name: string;
  status: boolean;
  date: Date;
}

function BookDepository() {
  const [array, setArray] = useState<books>();

  if (!array) {
    return (
      <View style={styles.container}>
        <Text style={styles.h1}>Книги отсуствуют</Text>
        <BookDeposButton
          text="Создать новую книгу"
          func={() => router.replace("/BookDepository/add")}
        />
      </View>
    );
  } else {
    const data = getData();
    return (
        <View>
            <Text>{data}</Text>            
        </View>
    )
  }
}

export default BookDepository;

const BookDepository_styles = StyleSheet.create({});
