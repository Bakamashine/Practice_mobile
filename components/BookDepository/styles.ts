import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  TextInput: {
    borderBottomWidth: 2,
    borderColor: "black",
    margin: 20,
    color: "grey",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "gray",
    padding: 10,
    marginVertical: 10,
    width: "40%",
    alignItems: "center",
    borderRadius: 5,
    // textAlign: 'center',
  },
  h1: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold'
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    // backgroundColor: "#fff",
  },
  textCenter: {
    textAlign: 'center'
  },
  hidden: {
    display: 'none'
  }
});

export default styles;
