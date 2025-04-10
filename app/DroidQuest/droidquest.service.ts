import { log } from "@/configs/logger";

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
