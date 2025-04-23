import * as SQLite from "expo-sqlite";
import { date_to_day } from "@/components/BookDepository/BookDepository.service";
import ConnectDB from "./ConnectDb";
import { log } from "@/configs/logger";

class MainClass extends ConnectDB {
  /**
   * Система миграций
   */
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

  /**
   * Извлечение всех записей из таблицы
   * @param table Таблица из которой необходимо извлечь записи
   * @returns  Значение из таблицы
   */
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
   * Низкоуровневое обновление записи
   * @param table Таблица в которой необходимо обновить
   * @param param1 Объект со значениями: id - поле по которой ищется запись, value - значение поля по которому ищется запись
   * @param param2 Объект со значениямм: one - поле в котором нужно сделать замену, two - сама замена
   */
  async updateRecord(
    table: string,
    { id, value }: { id: string; value: string | number },
    { one, two }: { one: string; two: string | number }
  ) {
    try {
      await this.connect();
      //   const result = await this._db?.runAsync(`
      //     UPDATE ${table}
      //     SET ${one} = '${typeof two == "string" ? `'${two}'` : `${two}`}'
      //     WHERE ${id} = ${typeof value == "string" ? `'${value}'` : `${value}`}
      const result = await this._db?.runAsync(
        `
        UPDATE ${table} 
        SET ${one} = ?
        WHERE ${id} = ?
`,
        [two, value]
      );
      log.debug(`(updateRecord) Запись обновлена: `, result);
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

  /**
   * Низкоуровневый поиск записи по ID
   * @param table Таблица из которой необходимо взять запись
   * @param id ID по которому она будет искаться
   */
  async getRecordForId(table: string, id: number) {
    try {
      await this.connect();
      const result = await this._db?.getFirstAsync(`
          select * from ${table} where id = ${id}
        `);
      log.debug(result);
      if (result !== undefined) {
        return result;
      }
    } catch (err) {
      log.error(err);
    }
  }

  /**
   * Низкоуровневое удаление записи по ID
   * @param table Имя таблицы в которой будет удалена запись
   * @param id ID по которому будет удалена запись
   */
  async DeleteRecord(table: string, id: number) {
    try {
      await this.connect();
      const result = await this._db?.runAsync(
        `
          delete from ${table} where id = ?
        `,
        id
      );
      log.debug(result);
    } catch (err) {
      log.error(err);
    }
  }
}

export default MainClass;
