const React = require("react-native");

const { StyleSheet } = React;

export default {
  centeredView: {
    flex: 1,
    justifyContent: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: "5%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.6,
    shadowRadius: 3.84,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  containerView: {
    flex: 1,
  },
  loginScreenContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  logoText: {
    fontSize: 40,
    fontWeight: "800",
    marginTop: 150,
    marginBottom: 30,
    textAlign: "center",
  },
  loginFormView: {
    flex: 1,
  },
  loginFormTextInput: {
    height: 43,
    fontSize: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#eaeaea",
    backgroundColor: "#fafafa",
    paddingLeft: 10,
    marginLeft: "15%",
    marginRight: "15%",
    marginTop: 20,
    marginBottom: 20,
  },
  signupFormcheckbox: {
    height: 43,
    fontSize: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "#fff",
    paddingLeft: 10,
    marginLeft: "15%",
    marginRight: "15%",
    marginTop: 20,
    marginBottom: 20,
  },
  signupFormTextInput: {
    height: 45,

    fontSize: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#eaeaea",
    backgroundColor: "#fafafa",
    paddingLeft: 5,
    width: "100%",
    marginTop: 5,
    marginBottom: 5,
  },
  loginButton: {
    backgroundColor: "orange",
    borderRadius: 25,
    height: 45,
    width: 95,
    marginLeft: "40%",
    marginTop: 20,
  },
  signupButton: {
    backgroundColor: "orange",
    borderRadius: 25,
    height: 45,
    width: 95,
    marginLeft: "40%",
    marginTop: 20,
  },
  registerButton: {
    backgroundColor: "orange",
    borderRadius: 25,
    height: 45,
    width: 95,

    marginTop: 20,
  },
};
