import MainClass from "./MainClass";
import * as SQLite from "expo-sqlite";
import { date_to_day } from "@/components/BookDepository/BookDepository.service";
import ConnectDB from "./ConnectDb";
import { log } from "@/configs/logger";

class Books extends MainClass {
    
  /**
   * Генерирует книги для БД
   * @param num Число генераций
   */
  async generateBooks(num: number = 10) {
    try {
      for (let i = 0; i < num; i++) {
        let name = `book${i}`;
        await this._db?.runAsync(`
                insert into books (name, date, status) values ('${name}', '${date_to_day()}', '${false}')
            `);
        log.debug("(generateBooks) Была добавлена книга")
      }
    } catch (err) {
      log.error(err);
    }
  }
}
export default Books;