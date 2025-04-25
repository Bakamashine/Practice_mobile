import MainClass from "./MainClass";
import * as SQLite from "expo-sqlite";
import { date_to_day } from "@/components/BookDepository/BookDepository.service";
import ConnectDB from "./ConnectDb";
import { log } from "@/configs/logger";

export interface books {
  id?: number;
  name: string;
  status: boolean;
  date: string;
  image?: string | null;
}
class Books extends MainClass {
  #table: string = "books";

  /**
   * Генерирует книги для БД
   * @param num Число генераций
   */
  async generateBooks(num: number = 10) {
    try {
      await this.connect();
      for (let i = 0; i < num; i++) {
        let name = `book${i}`;
        await this._db?.getAllAsync(`
                insert into ${
                  this.#table
                } (name, date, status) values ('${name}', '${date_to_day()}', 0)
            `);
        log.debug("(generateBooks) Была добавлена книга");
      }
    } catch (err) {
      log.error(err);
    }
  }

  /**
   * Получение всех книг из БД
   * @returns Все книги
   */
  async getData(): Promise<unknown[] | undefined> {
    try {
      await this.connect();
      const response = await this._db?.getAllAsync(`
            select * from books
        `);
      if (response !== null) {
        return response;
      } else throw new Error("Нет записей");
    } catch (err) {
      log.error(err);
    }
  }

  /**
   * Добавляет книгу
   * @param elements Передаваемые значения по интерфейсу books
   */
  async addBook(elements: books) {
    try {
      await this.connect();
      const result = await this._db?.runAsync(
        `
        insert into ${this.#table} (name, date, status, image) values (?,?,?,?)
        `,
        [
          elements.name,
          elements.date,
          elements.status,
          elements.image !== undefined && elements.image,
        ]
      );
      log.debug(result);
    } catch (err) {
      log.error(err);
    }
  }

  /**
   * Обновление записи в таблице books
   * @param id ID записи которая будет обновляться
   * @param param1 Объект с полем и новым значением
   */
  async updateForIdBooks(
    id: number,
    { row, value }: { row: string; value: string }
  ) {
    try {
      await this.connect();
      const result = await this._db?.runAsync(
        `
          update ${this.#table} set ${row} = ? where id = ?
        `,
        [value, id]
      );
      log.debug(`(BookDeposSqlite)(update) result: `, result);
    } catch (err) {
      log.error(err);
    }
  }
}
export default Books;
