import { books } from "@/app/BookDepository";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { log } from "@/configs/logger";

export const storeData = async (value: string | books) => {
  try {
    if (typeof value == "function") {
      await AsyncStorage.setItem("books", JSON.stringify(value));
    } else if (typeof value == "string")
      await AsyncStorage.setItem("books", value);
  } catch (err) {
    if (err instanceof Error) {
            console.error(`${err.name} : ${err.message}`);
    }
  }
};

export const getData = async ()  => {
    try {
        const value = await AsyncStorage.getItem('books');
        if (value !== null) {
            return value
        } else throw new Error("Books not found 404")
    } catch (err) {
        if (err instanceof Error) {
            console.error(`${err.name} : ${err.message}`);
        }
    }
}
