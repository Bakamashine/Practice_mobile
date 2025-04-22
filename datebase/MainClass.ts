import * as SQLite from "expo-sqlite";
import { date_to_day } from "@/components/BookDepository/BookDepository.service";
import ConnectDB from "./ConnectDb";
import { log } from "@/configs/logger";

class MainClass extends ConnectDB {
  async migrate() {
    try {
      await this.connect();

      // books
      await this._db?.execAsync(
        `
            PRAGMA journal_mode = WAL;
            CREATE TABLE IF NOT EXISTS books (
            id INTEGER PRIMARY KEY NOT NULL,
            name TEXT NOT NULL,
            status BOOLEAN,
            date TEXT
);
            `
      );
      log.debug("Миграции были завершены");
    } catch (err) {
      log.error(err);
    }
  }

  async getData(table: string) {
    try {
      await this.connect();
      const response = await this._db?.getAllAsync(`
            select * from ${table}
        `);
      if (response !== null) {
        return response;
      } else throw new Error("Нет записей");
    } catch (err) {
      log.error(err);
    }
  }

  /**
   * Удаление таблицы по имени
   * @param table Имя удаляемой таблицы
   */
  async DropTable(table: string) {
    try {
      await this.connect();
      const result = await this._db?.runAsync(`DROP table ${table}`);
      log.debug("Результат удаления: ", result);
    } catch (err) {
      log.error(err);
    }
  }

  /**
   * Очистка таблицы
   * @param table Имя очищаемой очищаемой таблицы
   */
  async DeleteTable(table: string) {
    try {
      await this.connect();
      const result = await this._db?.runAsync(`DELETE from ${table}`);
      log.debug("Результат очистки таблицы: ", result);
    } catch (err) {
      log.error(err);
    }
  }
}

export default MainClass;
