import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { fabric } from "./droidquest.service";
import { log } from "@/configs/logger";

/**
 * Общий массив с вопросами (каждый вопрос собирает фабрика)
 */
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

const test = () => {
  log.info("test")
}
const App = () => {
  
  /**
   * Определяет порядок вопроса
   * @default 0
   */
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  /**
   * Подсчёт очков пользователя
   * @default 0
   */
  const [score, setScore] = useState(0); 
  
  /**
   * Переменная для проверки решённого теста
   * @default false
   */
  const [quizFinished, setQuizFinished] = useState(false);
  
  /**
   * Правильность ответа
   * @default false
   */
  const [status, setStatus] = useState(false);

  /**
   * Сравнивает полученный ответ с ответом, который указан в Object в котором находится вопрос
   * @param userAnswer Ответ пользователя
   */
  const handleAnswer = (userAnswer: boolean) => {
    let result = userAnswer === questions[currentQuestionIndex].answer;
    if (result) {
      setStatus(true);
      setScore(score + 1);
      log.info(
        `Пользователь ответил правильно на вопрос: ${questions[currentQuestionIndex].question}`
      );
    } else {
      setStatus(false);
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
    let finalScore = score + (result ? 1 : 0)
      setQuizFinished(true);
      log.info(
        `Пользователь завершил тест с результатом: ${finalScore} из ${questions.length}`
      );
    }
  };

  /**
   * Если истинно, то будет вывод полученных очков и предложение повторить тест
   */
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
            log.info("Тест начали с начала");
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

            log.info("Пользователь вернулся на вопрос назад");
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
