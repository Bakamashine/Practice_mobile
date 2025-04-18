import { books } from "@/app/BookDepository";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { log } from "@/configs/logger";

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
    if (typeof value === "object" && value !== null) {
      const response = await AsyncStorage.getItem("books");
      let booksArray: books[] = [];

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
    log.debug(`(getData): Полученные данные: ${JSON.stringify(value)}`);
    if (value !== null) {
      return value;
    } else {
      // throw new Error("Books not found 404")
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

export const getMaxId = async () => {
  try {
    const response = await AsyncStorage.getItem("books");
    let array: Array<books> = JSON.parse(response as string);
    for (let i = 0; i < array.length; i++) {
      if (i == array.length-1) {
        return array[i].id 
      }
    }
  } catch (err) {
    if (err instanceof Error) {
      console.log(`${err.name}: ${err.message}`);
    }
  }
};
