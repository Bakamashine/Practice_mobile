import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useRef, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { log } from "@/configs/logger";

/**
 * Выглядит паршиво
 * @returns
 */
export default function App() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [image, setImage] = useState<string | undefined>(undefined);

  const camera = useRef<CameraView | null>(null);
  /**
   * Если разрешения нет, то не будет ничего показывать
   */
  if (!permission) {
    return <View />;
  }

  /**
   * Спрашивает разрешение на подачу полномочий для использования камеры устройства
   * TODO: Решил спрашивать разрешение на прямую через библиотеку, есть конечно вариант посредством андроида получить нужные полномочия на камеру
   */
  if (!permission.granted) {
    return (
      <View>
        <Text>Вы должны дать разрешение на камеру</Text>
        <Button onPress={requestPermission} title="Повышение полномочий" />
      </View>
    );
  }

  /**
   * Переключение камеры (можно использовать заднюю и переднюю)
   */
  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  /**
   * Остановка работы камеры
   */
  function stopCamera() {}

  /**
   * Загрузка изображения в кеш, затем получение его и передача
   */
  async function getPicture() {
    const photo = await camera.current?.takePictureAsync();
    log.debug("photo: ", photo);
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={camera}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Перевернуть камеру</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={getPicture}>
            <Text style={styles.text}>Сделать фото</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>Закрыть камеру и вернуться назад</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>Выбрать из галереи</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 20,
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0a65a6",
    borderRadius: 10,
    padding: 10,
    width: 200,
    height: 150,
    marginRight: 10,
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
});
