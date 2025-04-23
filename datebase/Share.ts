import { Share, Alert } from "react-native";

/**
 * Взял пример из документации
 * Открывает меню в котором можно выбрать куда отправить строку message
 * @param message Название книги
 */
export const onShare = async (message: string) => {
  try {
    const result = await Share.share({
      message: `Ура! Я прочитал книгу ${message}!!! Ура! Ура!`,
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error: any) {
    Alert.alert(error.message);
  }
};
