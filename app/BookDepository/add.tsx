import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import styles from "@/components/BookDepository/styles";
import BookDeposButton from "@/components/ui/BookDeposButton";
import { storeData } from "@/components/BookDepository/BookDepository.service";
import { router } from "expo-router";

function add() {
  /**
   * Статус нажатия на checkbox
   * @default false
   */
  const [check, setCheck] = React.useState(false);

  /**
   * Имя вводимой книги
   * @default ''
   */
  const [name, setName] = React.useState("");

  function date_to_day() {
    let date = new Date();
    let week = [
      "Воскресенье",
      "Понедельник",
      "Вторник",
      "Среда",
      "Четверг",
      "Пятница",
      "Суббота",
    ];
    
    let mounth =[
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь"
    ]
    return `${week[date.getDay()]}, ${date.getDate()} ${mounth[date.getMonth()]} ${date.getFullYear()} г.`;
  }

  return (
    <View>
      <TextInput
        style={styles.TextInput}
        placeholder="Введите название книги."
        onChangeText={(value) => setName(value)}
      ></TextInput>
      <View style={[styles.center]}>
        <BookDeposButton
          text={`Добавить новую книгу`}
          func={() => {
            storeData({
              name: name,
              id: 0,
              date: date_to_day(),
              status: check,
            });
            // router.replace("/BookDepository");
            router.push({
              pathname:"/BookDepository",
              // params: {status: 1}
            })
          }}
        />
        <BouncyCheckbox
          textStyle={{ textDecorationLine: "none" }}
          onPress={(isChecked: boolean) => setCheck(isChecked)}
          size={25}
          text="Прочтена?"
        />
        <BookDeposButton
          text="Назад"
          func={() => router.replace("/BookDepository")}
        />
      </View>
    </View>
  );
}

export default add;

const add_style = StyleSheet.create({});
