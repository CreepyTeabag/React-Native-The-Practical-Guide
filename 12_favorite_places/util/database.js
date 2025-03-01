import * as SQLite from "expo-sqlite/legacy";

const database = SQLite.openDatabase("places.db");

export function init() {
  const promise = new Promise((resolve, reject) => {
    try {
      database?.transaction((tx) => {
        tx?.executeSql(
          `CREATE TABLE IF NOT EXISTS places (
           id INTEGER PRIMARY KEY NOT NULL,
           title TEXT NOT NULL,
           imageUri TEXT NOT NULL,
           address TEXT NOT NULL,
           lat REAL NOT NULL,
           lng REAL NOT NULL
          )`,
          [],
          () => {
            console.log("Table created");
            resolve();
          },
          (_, error) => {
            console.log("error here");
            reject(error);
          }
        );
      });
    } catch (error) {
      console.log(error);
    }
  });

  return promise;
}
