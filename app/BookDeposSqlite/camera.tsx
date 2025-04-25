import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useRef, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Modal,
} from "react-native";
import { log } from "@/configs/logger";
import * as basic_styles from "@/components/BookDepository/styles";
import * as MediaLibrary from "expo-media-library";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

/**
 * Выглядит паршиво
 * @returns
 */
export default function App() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [permissionMediaLibrary, requestMediaLibrary] =
    MediaLibrary.usePermissions();
  const [image, setImage] = useState<string | undefined>(undefined);
  const [modalView, setModalView] = useState(false);

  const camera = useRef<CameraView | null>(null);

  /**
   * Если разрешения нет, то не будет ничего показывать
   */
  if (!permission || !permissionMediaLibrary) {
    return <View />;
  }

  /**
   * Спрашивает разрешение на подачу полномочий для использования камеры устройства
   * TODO: Решил спрашивать разрешение на прямую через библиотеку, есть конечно вариант посредством андроида получить нужные полномочия на камеру
   */
  if (!permission.granted) {
    return (
      <View style={styles.permissions}>
        <Text>Вы должны дать разрешение на камеру</Text>
        <Button onPress={requestPermission} title="Повышение полномочий" />
      </View>
    );
  }

  if (!permissionMediaLibrary?.granted) {
    return (
      <View style={styles.permissions}>
        <Text>Вы должны дать разрешение на использования галереи</Text>
        <Button onPress={requestMediaLibrary} title="Повышение полномочий" />
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
   * Сохранение изображения
   */
  async function saveImage() {
    if (image !== undefined) {
      const result = await MediaLibrary.createAssetAsync(image);
      log.debug("Изображение было сохранено: ", result);
      router.push({
        pathname: "/BookDeposSqlite/add",
        params: {new_img: result.uri}
      })
    }
  }

  /**
   * Загрузка изображения в кеш, затем получение его и передача
   */
  async function getPicture() {
    if (camera.current) {
      const photo = await camera.current.takePictureAsync();
      log.debug("Была сделана фотография: ", photo);
      if (photo !== undefined) {
        setImage(photo.uri);
        setModalView(true);
      }
    }
  }
  
  /**
   * При переходе на другую страницу, react сам закрывает камеру
   */
  function back() {
    router.push("/BookDeposSqlite/add")
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
          <TouchableOpacity style={styles.button} onPress={back}>
            <Text style={styles.text}>Закрыть камеру и вернуться назад</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>Выбрать из галереи</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
      {/* Вылетает модальное окно если была сделана фотография */}
      {image && (
        <Modal visible={modalView} animationType="slide">
          <View style={styles.modalOverlay}>
            <SafeAreaView style={styles.modalContent}>
              <Text style={basic_styles.default.center}>Ваше фото: </Text>
              <Image
                source={
                  image
                    ? { uri: image }
                    : require("@/datebase/default_image.jpg")
                }
                style={{
                  width: 200,
                  height: 200,
                  marginTop: 10,
                }}
                resizeMode="center"
              />

              <View
                style={{
                  marginTop: 10,
                  flexDirection: "row",
                  paddingBottom: 50,
                }}
              >
                <TouchableOpacity
                  style={[styles.button, { marginTop: 10 }]}
                  onPress={() => {
                    setModalView(false);
                    setImage(undefined);
                  }}
                >
                  <Text style={{ color: "white" }}>Отменить фото</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, { marginTop: 10 }]}
                  onPress={async () => {
                    setModalView(false);
                    await saveImage();
                  }}
                >
                  <Text style={{ color: "white" }}>Подтвердить фото</Text>
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          </View>
        </Modal>
      )}
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
  permissions: {
    margin: 50,
  },
  modalContent: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
});
