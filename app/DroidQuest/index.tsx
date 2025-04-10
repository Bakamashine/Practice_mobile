// import React, { useState } from "react";
// import { onequestion as DATA } from "@/app/DroidQuest/droidquest.service";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
// } from "react-native";

// export default function index() {
//   const [status, setStatus] = useState<boolean | undefined>();
//   const checkAnswer = (answer: boolean) => {
//     const isCorrect = DATA.answer === answer;
    
//     setStatus(isCorrect)
//     // TODO: Работает только в Android и IOS
//     Alert.alert("Результат: ", isCorrect ? "Верно" : "Не верно");
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.questionText}>{DATA.question}</Text>
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => checkAnswer(true)}
//         >
//           <Text>Да</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => checkAnswer(false)}
//         >
//           <Text>Нет</Text>
//         </TouchableOpacity>
//       </View>
//       <Text>{status}</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#fff",
//   },
//   questionText: {
//     marginBottom: 20,
//   },
//   buttonContainer: {
//     flexDirection: "row",
//   },
//   button: {
//     backgroundColor: "gray",
//     width: 50,
//     height: 30,
//     margin: 10,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { fabric } from './droidquest.service';
import { underDampedSpringCalculations } from 'react-native-reanimated/lib/typescript/animation/springUtils';

// const questions = [
//   {
//     question: "Android является операционной системой?",
//     answer: true,
//   },
//   {
//     question: "Java является основным языком программирования для разработки приложений на Android?",
//     answer: true,
//   },
//   {
//     question: "APK — это формат файла для установки приложений на Android?",
//     answer: true,
//   },
//   {
//     question: "Google Play Store — это магазин приложений для Android?",
//     answer: true,
//   },
//   {
//     question: "В Android можно создавать приложения только для смартфонов?",
//     answer: false,
//   },
// ];

const questions = [
  fabric("Android является операционной системой?", true),
  fabric("Java является основным языком программирования для разработки приложений на Android?", false),
  fabric("APK - это формат файла для установки приложений на Android?", true),
  fabric("Google Play Store - это магазин приложений для Android?", true),
  fabric("Android поддерживает многозадачность?", true)
]

const App = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // index
  const [score, setScore] = useState(0); // result
  const [quizFinished, setQuizFinished] = useState(false); // переменная для проверки правильности ответа

  const handleAnswer = (userAnswer: boolean) => {
    if (userAnswer === questions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizFinished(true);
      // Alert.alert("Тест завершен", `Ваш результат: ${score + (userAnswer === questions[currentQuestionIndex].answer ? 1 : 0)} из ${questions.length}`);
    }
  };

  if (quizFinished) {
    return (
      <View style={styles.container}>
        <Text style={styles.resultText}>Ваш результат: {score} из {questions.length}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.questionText}>{questions[currentQuestionIndex].question}</Text>
      <TouchableOpacity style={styles.button} onPress={() => handleAnswer(true)}>
        <Text>Да</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleAnswer(false)}>
        <Text>Нет</Text>
      </TouchableOpacity>
      
      {currentQuestionIndex > 0 ? (
      <TouchableOpacity style={styles.button} onPress={() => {
        setCurrentQuestionIndex(currentQuestionIndex-1);
      }}>
        <Text>Назад</Text>
      </TouchableOpacity>
) : <Text></Text>}
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  questionText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'gray',
    padding: 10,
    marginVertical: 10,
    width: '20%',
    alignItems: 'center',
    borderRadius: 5,
  },
  resultText: {
    fontSize: 24,
    marginTop: 20,
  },
});

export default App;