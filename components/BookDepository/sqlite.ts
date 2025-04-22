import { PrismaClient } from "@prisma/client";
import { date_to_day } from "./BookDepository.service";
import { log } from "@/configs/logger";
import * as SQLite from "expo-sqlite";
class BooksSqlite {
  #db: SQLite.SQLiteDatabase | null = null;

  /**
   * Подключение к БД
   * @returns
   */
  async connectDB() {
    if (!this.#db) {
      this.#db = await SQLite.openDatabaseAsync("database.sqlite");
    }
    return this.#db;
  }

  /**
   * Миграции
   */
  async migrate() {
    try {
      await this.connectDB();

      // Создание таблицы books
      this.#db?.runAsync(`
            create table if not exists books (
            id integer primary  key not null AUTOINCREMENT,
            title string not null,
            date string,
            readed boolean
            )
            `);
      log.debug(this.#db);
      log.debug(`Миграции были сделаны`);
    } catch (err) {
      log.error(err);
    }
  }


  /**
   * Генерирует книги для БД
   * @param num Число генераций
   */
  async generateBooks(num: number = 10) {
    try {
      for (let i = 0; i < num; i++) {
        let name = `book${i}`;
        await this.#db?.runAsync(`
                insert into books (title, date, readed) values ('${name}', '${date_to_day()}', '${false}')
            `);
      }
    } catch (err) {
      log.error(err);
    }
  }
}
/**
 * Prisma
 */

/**
 * Класс для управление книгами посредством библиотеки Prisma
 */
// class BooksSqlite {

//     /**
//      * Генерирует книги для БД
//      * @param num Число генераций
//      */
//     static async generateBooks(num: number = 10) {
//         for (let i = 0; i<num; i++) {
//             let name = `book${i}`
//             prisma.books.create({
//                 data: {
//                     title: name,
//                     date: date_to_day(),
//                     readed: false,
//                 }
//             })
//             log.debug("(generateBooks): Книга была добавлена!");
//         }
//     }

//     /**
//      * Возврращает все книги из БД
//      * @returns Вывод всех книг
//      */
//     static async getAllBooks () {
//         const result =  prisma.books.findMany();
//         return result;
//     }
// }

export default BooksSqlite;
