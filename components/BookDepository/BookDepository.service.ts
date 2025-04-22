import { books } from "@/app/BookDepository";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { log } from "@/configs/logger";

export const fabric = (id: number) => {
  let name = `book${id}`;
  return {
    id,
    name,
    status: false,
    date: date_to_day(new Date()),
  };
};

/**
 * Фабрика, которая позволяет добавить 100 книг в хранилище
 * @param num Кол-во добавляемых книг
 */
export const addNumericBooks = async (num: number = 100) => {
  for (let i = 0; i<num; i++) {
    await storeData(fabric(i))
  }
};

/**
 * Добавление книги в локальное хранилище
 * Для этого служит библиотека AsyncStorage,
 * Которая позволяет асинхронно брать или сохранять данные
 * @param value Добавляемая книга
 */
export const storeData = async (value: string | books) => {
  // try {
  //   async function check() {
  //     let response = await AsyncStorage.getItem("books");
  //     return response;
  //   }
  //   if (typeof value == "object" && value !== null) {
  //     let response = await check();
  //     if (response === undefined) {
  //       await AsyncStorage.setItem("books", JSON.stringify(value));
  //     } else {
  //       let newarray = Array(value).push(JSON.parse(response as string));
  //       await AsyncStorage.setItem("books", JSON.stringify(newarray))
  //     }
  //     // await AsyncStorage.mergeItem("books", JSON.stringify(value));
  //     log.debug("Было принят объект и была добавлена книга: ", value);
  //   } else if (typeof value == "string") {
  //     await AsyncStorage.setItem("books", value);
  //     log.debug("Была принята строка и добавлена книга:", value);
  //   }
  // } catch (err) {
  //   if (err instanceof Error) {
  //     console.error(`${err.name} : ${err.message}`);
  //   }
  // }

  try {
    const response = await AsyncStorage.getItem("books");
    let booksArray: books[] = [];
    if (typeof value === "object" && value !== null) {
      if (response !== null && response !== "[]") {
        booksArray = JSON.parse(response);
        log.debug("Некоторые книги уже были: ", booksArray);
        let id = booksArray[booksArray.length - 1]["id"];
        value.id = id + 1;
        log.debug(
          `Будет добавлена новая книга с id: ${value.id}, прошлое id было: ${id}`
        );
      }

      booksArray.push(value);

      await AsyncStorage.setItem("books", JSON.stringify(booksArray));
      log.debug("Было добавлено: ", value);
    } else if (typeof value === "string" && value !== null) {
      // if (response !== null && response !== "[]") {
      //   booksArray = JSON.parse(response);
      //   log.debug("Некоторые книги уже были: ", booksArray);
      // }

      log.error("В разработке");
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error(`${err.name} : ${err.message}`);
    }
  }
};

/**
 * Возвращает данные из хранилища
 * @returns Возвращает Promise
 */
export const getData = async () => {
  try {
    const value = await AsyncStorage.getItem("books");
    log.debug(`(getData): Полученные данные: ${value}`);
    if (value !== null) {
      return value;
    } else {
      log.error("Books not found 404");
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error(`${err.name} : ${err.message}`);
    }
  }
};

/**
 * Удаление всех книг
 */
export const DeleteAll = async () => {
  try {
    await AsyncStorage.removeItem("books");
    log.debug("Были удалены все книги");
  } catch (err) {
    if (err instanceof Error) {
      console.log(`${err.name}: ${err.message}`);
    }
  }
};

/**
 * Удаление книги по ID
 * @param id ID удаляемой книги
 */
export const deleteBook = async (id: number) => {
  try {
    const response = await AsyncStorage.getItem("books");
    let booksArray = response ? JSON.parse(response) : [];

    booksArray = booksArray.filter((book: books) => book.id !== id);
    log.debug(`Была удалена книга с id: ${id}`);

    await AsyncStorage.setItem("books", JSON.stringify(booksArray));
  } catch (err) {
    if (err instanceof Error) {
      console.log(`${err.name}: ${err.message}`);
    }
  }
};

/**
 * Вывод информации определённой книги (по id)
 * @param id ID выводимой книги
 * @returns Массив с информацией
 */
export const getBookforId = async (id: number) => {
  try {
    const response = await AsyncStorage.getItem("books");
    let array: Array<books> = JSON.parse(response as string);
    let filteredArray = array.filter((value) => value.id == id);
    log.debug(`Произошёл просмотр книги по ID: ${id}`);
    return filteredArray[0];
  } catch (err) {
    if (err instanceof Error) {
      console.log(`${err.name}: ${err.message}`);
    }
  }
};

/**
 * Получение id последней книги
 * @returns Максимальный ID
 */
export const getMaxId = async () => {
  try {
    const response = await AsyncStorage.getItem("books");
    let array: Array<books> = JSON.parse(response as string);
    for (let i = 0; i < array.length; i++) {
      if (i == array.length - 1) {
        return array[i].id;
      }
    }
  } catch (err) {
    if (err instanceof Error) {
      console.log(`${err.name}: ${err.message}`);
    }
  }
};

/**
 * Форматирует дату по заданному стандарту
 * @param date Передаваемая дата для форматирования
 * @returns Отформатированая дата
 */
export const date_to_day = (date: Date = new Date()) => {
  let week = [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ];

  let mounth = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];
  return `${week[date.getDay()]}, ${date.getDate()} ${
    mounth[date.getMonth()]
  } ${date.getFullYear()} г.`;
};

/**
 * Обновление книги
 * @param updatedBooksArray Массив с книгой который следует заменить
 * @param id Необязательный параметр, возможно, потом можно будет обновлять по ID
 */
export const updateBook = async (updatedBooksArray: books[], id?: number) => {
  try {
    const response = await getData();
    if (response !== undefined) {
      const booksArray: books[] = JSON.parse(response);
      if (id === undefined || id === null) {
        await AsyncStorage.setItem("books", JSON.stringify(updatedBooksArray));
        log.debug("(updateBook): Дата была успешно обновлена");
      }
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error(`${err.name}: ${err.message}`);
    }
  }
};

/**
 * Меняет дату добавления книги (по id)
 * @param id ID записи
 * @param new_data Новая дата
 */
export const updateDate = async (id: number, new_data: Date) => {
  try {
    const response = await getData();
    if (response !== undefined) {
      const booksArray: books[] = JSON.parse(response);
      for (let i = 0; i < booksArray.length; i++) {
        if (booksArray[i].id === id) {
          booksArray[i].date = date_to_day(new_data);
          log.debug(
            `Обновление даты книги под id: ${id}:\nНовая дата: ${date_to_day(
              new_data
            )}`
          );
          break;
        }
      }
      log.debug(`Итоговая дата после изменения: ${JSON.stringify(booksArray)}`);
      updateBook(booksArray);
    }
  } catch (err) {
    if (err instanceof Error) {
      console.log(`${err.name}: ${err.message}`);
    }
  }
};
