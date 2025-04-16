import { View, TextInput, Text, TouchableOpacity } from "react-native";
import styles from "@/components/BookDepository/styles";
function add() {
  return (
    <View>
      <TextInput
        style={styles.TextInput}
        placeholder="Введите название книги."
      ></TextInput>
      <View style={styles.center}>
        <TouchableOpacity style={styles.button}>
          <Text>Добавить книгу</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default add;
