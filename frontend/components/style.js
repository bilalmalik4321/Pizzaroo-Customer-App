const React = require("react-native");

const { StyleSheet } = React;

export default {
  centeredView: {
    flex: 1,
    justifyContent: "center",
    height: '100%'
    // backgroundColor: 'grey'
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
    padding: "5%",
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
    color: '#ff6363',
    fontSize: 40,
    fontWeight: "200",
    // marginTop: "10%",
    marginBottom: "5%",
    textAlign: "center",
    paddingBottom: 20
  },
  logoText2: {
    fontSize: 40,
    fontWeight: "500",
    marginBottom: "5%",
    textAlign: "center",
  },
  loginFormView: {
    padding:35,
    flex: 1,
    alignItems:"center",
    justifyContent: 'center'
  },
  loginFormTextInput: {
    elevation: 10,
    shadowColor: '#eaeaea',
    height: 45,
    width: "70%",
    fontSize: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#eaeaea",
    backgroundColor: "white",
    paddingLeft: 10,
    marginLeft: "15%",
    marginRight: "15%",
    marginTop: "2.5%",
    marginBottom: "2.5%",
  },
  signupFormcheckbox: {

    fontSize: 14,
    // borderColor: "#fff",
    // backgroundColor: "#fff",
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
    marginTop: "2.5%",
    marginBottom: "2.5%",
  },
  loginButton: {
    backgroundColor: "#13aa52",
    borderRadius: 25,
    width: '100%',
    marginTop: 60,
    paddingLeft: '15%',
    paddingRight: '15%'
  },
  modalExit: {
    left:1,
    padding:5,
    position:"absolute",
  },
  signupButton: {
    backgroundColor: "purple",
    borderRadius: 25,
    height: 45,
    width: 95,

    marginTop: 20,
  },
  registerButton: {
    backgroundColor: "#13aa52",
    borderRadius: 25,
    height: 45,
    width: '100%',
    marginTop: 20,
  },
};
