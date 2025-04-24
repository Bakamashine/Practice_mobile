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
  },
  marginCenter: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContent: {
    width: "80%",
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
});

export default styles;
