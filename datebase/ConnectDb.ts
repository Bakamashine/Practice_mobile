import * as SQLite from "expo-sqlite";
import { log } from "@/configs/logger";
export default class ConnectDB {
    
    /**
     * Объект SQLiteDatabase
     */
  _db: SQLite.SQLiteDatabase | null = null;
  
  /**
   * Подключение к БД
   * @returns 
   */
  async connect() {
    try {
      if (!this._db) {
        this._db = await SQLite.openDatabaseAsync("database.sqlite");
      }
      return this._db;
    } catch (err) {
      log.error(err);
    }
  }
}
