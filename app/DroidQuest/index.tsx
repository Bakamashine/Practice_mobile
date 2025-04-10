import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { fabric } from "./droidquest.service";

const questions = [
  fabric("Android является операционной системой?", true),
  fabric(
    "Java является основным языком программирования для разработки приложений на Android?",
    false
  ),
  fabric("APK - это формат файла для установки приложений на Android?", true),
  fabric("Google Play Store - это магазин приложений для Android?", true),
  fabric("Android поддерживает многозадачность?", true),
];

const App = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // index
  const [score, setScore] = useState(0); // result
  const [quizFinished, setQuizFinished] = useState(false); // переменная для проверки решённого теста
  const [status, setStatus] = useState(false);

  const handleAnswer = (userAnswer: boolean) => {
    if (userAnswer === questions[currentQuestionIndex].answer) {
      setStatus(true);
      setScore(score + 1);
    } else {
      setStatus(false)
    }
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizFinished(true);
    }
  };

  if (quizFinished) {
    return (
      <View style={styles.container}>
        <Text style={styles.resultText}>
          Ваш результат: {score} из {questions.length}
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setCurrentQuestionIndex(0);
            setQuizFinished(false);
            setScore(0);
          }}
        >
          <Text>Пройти снова</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.questionText}>
        {questions[currentQuestionIndex].question}
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleAnswer(true)}
      >
        <Text>Да</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleAnswer(false)}
      >
        <Text>Нет</Text>
      </TouchableOpacity>

      {currentQuestionIndex > 0 ? (
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setCurrentQuestionIndex(currentQuestionIndex - 1);

            if (status) {
              setScore(score - 1);
            }
          }}
        >
          <Text>Назад</Text>
        </TouchableOpacity>
      ) : (
        <Text></Text>
      )}
      {/* <Text>Ваш результат: {score}</Text>
      <Text>Статус ответа: {status.toString()}</Text> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  questionText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "gray",
    padding: 10,
    marginVertical: 10,
    width: "40%",
    alignItems: "center",
    borderRadius: 5,
  },
  resultText: {
    fontSize: 24,
    marginTop: 20,
  },
});

export default App;
