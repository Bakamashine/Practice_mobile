import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  Alert,
} from "react-native";
import { fabric, checkLie } from "@/services/droidquest.service";
import { log } from "@/configs/logger";
import { router } from "expo-router";
// import sendAnswer from "@/components/DroidQuest/sendAnswer";

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
   * Показывание модульного окна при нажатии "Обмануть"
   * @default false
   */
  const [statusModal, setStatusModal] = useState(false);

  /**
   * Показывает второе модульное окно
   * @default false
   */
  const [statusModal2, setStatusModal2] = useState(false);

  /**
   * Статус лжи. Если пользователь нажмёт на кнокпу "Обмануть", он поменяется на истину
   * @default false
   */
  const [statusLie, setStatusLie] = useState(false);

  useEffect(() => {
    log.debug(statusLie);
    setTimeout(() => {
      setStatusModal2(false);
    }, 3000);
  }, [statusModal2, statusLie]);
  
  /**
   * Заканчивает тест
   * @param result Передаваемый результат
   */
  const end = (result: boolean) => {
      let finalScore = score + (result ? 1 : 0);
      setQuizFinished(true);
      log.info(
        `Пользователь завершил тест с результатом: ${finalScore} из ${questions.length}`
      );
  }
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
      end(result)
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
        onPress={() =>
          checkLie(
            statusLie,
            () => setStatusModal2(true),
            () => handleAnswer(true)
          )
        }
      >
        <Text>Да</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        // onPress={() => handleAnswer(false)}
        onPress={() =>
          checkLie(
            statusLie,
            () => setStatusModal2(true),
            () => handleAnswer(false)
          )
        }
      >
        <Text>Нет</Text>
      </TouchableOpacity>

      {/* DEBUG */}
      {/* <TouchableOpacity
        style={styles.button}
        onPress={() => setStatusLie(false)}
      >
        <Text>Убрать ложь (DEBUG)</Text>
      </TouchableOpacity> */}

      {/* Продвижение назад */}
      {/* {currentQuestionIndex > 0 ? (
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
      )} */}

      {/* Продвижение вперёд */}
      {currentQuestionIndex >= 0 ? (
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setStatusLie(false);
            if (currentQuestionIndex < questions.length-1) {
              setCurrentQuestionIndex(currentQuestionIndex + 1);
              // setQuizFinished(true)
            } else end(false)
            log.info("Пользователь перешёл на другой вопрос");
          }}
        >
          <Text>{currentQuestionIndex != questions.length-1 ? "Далее" : "Закончить тест"}</Text>
        </TouchableOpacity>
      ) : (
        <Text></Text>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setStatusModal(true);
        }}
      >
        <Text>Обмануть!</Text>
      </TouchableOpacity>
      
      {/* <Text>{score}</Text> */}

      {/* FIXME: Потом следует сделать модальные окна в отдельный компонент */}

      {/* Модальное окно при попытке обмануть */}
      <View>
        <Modal visible={statusModal} animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text>Вы уверены, в том что хотите этого?</Text>

              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setStatusModal(false);
                  setStatusLie(true);
                  let str = `Ответ будет: ${
                    questions[currentQuestionIndex].answer ? "Да" : "Нет"
                  }`;
                  // TODO: Заменить Alert
                  Alert.alert("Ошибка:", str);
                  // alert(str);
                }}
              >
                <Text>Да, покажите мне ответ</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setStatusModal(false);
                }}
              >
                <Text>Назад</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>

      {/* Модальное окно при попытке ответить на вопрос */}
      <View>
        <Modal visible={statusModal2} animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text>Ответ уже был показан!</Text>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

export const styles = StyleSheet.create({
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default App;
