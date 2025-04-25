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
  StatusBar
} from "react-native";
import { log } from "@/configs/logger";
import * as basic_styles from "@/components/BookDepository/styles";

/**
 * Выглядит паршиво
 * @returns
 */
export default function App() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [image, setImage] = useState<string | undefined>(undefined);
  const [modalView, setModalView] = useState(false);

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
    if (camera.current) {
      const photo = await camera.current.takePictureAsync();
      log.debug("Была сделана фотография: ", photo);
      if (photo !== undefined) {
        setImage(photo.uri);
        setModalView(true);
      }


    }
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

      {image && (
/*         <Image
          source={{uri: image}}
          style={StyleSheet.flatten([{
            width: 100,
            height: 100,
            flex: 2
          }, basic_styles.default.marginCenter])}
        /> */
      
        
          <Modal visible={modalView} animationType="slide">
            <View style={basic_styles.default.modalOverlay}>
              <View style={basic_styles.default.modalContent}>
              <Text style={basic_styles.default.center}>Ваше фото: </Text>
                <Image
                  source={
                    image
                      ? { uri: image }
                      : require("@/datebase/default_image.jpg")
                  }
                  // style={StyleSheet.flatten([
                  //   add_style.ImageStyle2,
                  //   styles.marginCenter,
                  // ])}
                
                  style={{
                    // width: 100,
                    // height: 100,
                    width: '80%',
                    height: '90%',
                    borderRadius: 5,

                  }}
                  resizeMode="cover"
                />

                <TouchableOpacity
                  style={[styles.button, {marginTop: 10}]}
                  onPress={() => {
                    setModalView(false);
                  }}
                >
                  <Text style={{color: 'white'}}>Назад</Text>
                </TouchableOpacity>
              </View>
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
});
