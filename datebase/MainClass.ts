import * as SQLite from "expo-sqlite";
import ConnectDB from "./ConnectDb";
import { log } from "@/configs/logger";

class MainClass extends ConnectDB {
  async migrate() {
    try {
      await this.connect();
      this._db?.execAsync(
        `
            PRAGMA journal_mode = WAL;
CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY NOT NULL, value TEXT NOT NULL, intValue INTEGER);
INSERT INTO test (value, intValue) VALUES ('test1', 123);
INSERT INTO test (value, intValue) VALUES ('test2', 456);
INSERT INTO test (value, intValue) VALUES ('test3', 789);
            
            `
      );
      log.debug("Миграции были завершены");
    } catch (err) {
      log.error(err);
    }
  }
}

export default MainClass;