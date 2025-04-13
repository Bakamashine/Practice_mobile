import { log } from "@/configs/logger";
import { View } from "react-native-reanimated/lib/typescript/Animated";

/**
 * Фабрика объетов
 * @param question Задаваемый вопрос
 * @param answer Правильный ответ
 * @returns {Object}
 */
export function fabric(question: string, answer: boolean) {
  log.info("Задан вопрос: ", question);
  return {
    question,
    answer,
  };
}


/**
 * Проверка на ложь
 * @param lie Статус лжи
 * @param Func1 Колл-бэк функция которая выполнится при истинном статусе лжи
 * @param Func2 Колл-бэк функция которая выполнится при ложном статусе лжи
 * @returns 
 */
export function checkLie(lie: boolean, Func1: CallableFunction,  Func2: CallableFunction) {
  return lie ? Func1() : Func2()
}