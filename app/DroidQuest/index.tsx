import React, { useState } from "react";
import { DATA } from "@/app/DroidQuest/droidquest.service";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

export default function index() {
  const [status, setStatus] = useState<boolean | undefined>();
  const checkAnswer = (answer: boolean) => {
    const isCorrect = DATA.answer === answer;
    setStatus(isCorrect)
    // TODO: Работает только в Android и IOS
    Alert.alert("Результат: ", isCorrect ? "Верно" : "Не верно");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{DATA.question}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => checkAnswer(true)}
        >
          <Text>Да</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => checkAnswer(false)}
        >
          <Text>Нет</Text>
        </TouchableOpacity>
      </View>
      <Text>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  questionText: {
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  button: {
    backgroundColor: "gray",
    width: 50,
    height: 30,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
