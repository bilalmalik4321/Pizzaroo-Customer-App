import Icon from "react-native-vector-icons/FontAwesome";
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Modal,
  TouchableOpacity,
  TextInput,
} from "react-native";

import {
  CheckBox,
  Text,
  Tile,
  Card,
  Button,
  Input,
  ButtonGroup,
  Badge
} from "react-native-elements";

import StickyHeaderFooterScrollView from 'react-native-sticky-header-footer-scroll-view';

const price = 12.99;


function menuScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [state, setState] = useState(0);
  const buttons = ["S", "M", "L", "XL"];
  const [footer, setFooter] = useState(false);

  return (
    <SafeAreaView>
      <Modal visible={modalVisible} animationType="slide" >
      <View style={[styles.centeredView, modalVisible ? {backgroundColor: 'rgba(0,0,0,0.5)'} : '']}>
      <View style={styles.modalView}>
          <Icon
            name="close"
            size={30}
            color="black"
            onPress={() => {
              setModalVisible(false);
            }}
            style={styles.modalExit}
          />
          <Text style={styles.modalItemHeader}>
            How Many?
          </Text>
          <View style={styles.modalInput}>
            <Input placeholder="Quantity" keyboardType={"numeric"} defaultValue="1" maxLength={1}/>
          </View>
          <Text style={styles.modalItemHeader}>
            Size
          </Text>
          <View style={styles.modalInput}>
            <ButtonGroup buttons={buttons} containerStyle={{ height: 50 }} selectedIndex={1} selectedButtonStyle={{backgroundColor:"purple"}}/>
          </View>
          <Text style={styles.modalItemHeader}>
            Other Specifics?
          </Text>
          <View style={styles.modalInput2}>
            <Input
              placeholder="new cutter, heavy on the topping ..."
              multiline={true}
              numberOfLines={4}
            />
          </View>
          <Text style={styles.modalPrice}>
            Price: $ {price}
          </Text>

          <Button
            onPress={() => {
              setModalVisible(false);
              setFooter(true);
              setState(state + 1);
            }}
            title="Add to Order"
            buttonStyle={styles.foodAddOrder}
          />

        </View>
        </View>
      </Modal>
      <View >
      <StickyHeaderFooterScrollView
      makeScrollable = {true}
      renderStickyFooter={() => { return (
        <View  style={styles.shoppingButton}>
          {
            footer &&
            <Button raised title="Checkout Order" icon={<View style={styles.Icon}><Badge value={state} status="primary" /></View>} />
          }
        </View>
      )}}
    >
        <View>
          <Tile
            imageSrc={require("../images/pic2.jpg")}
            featured
            overlayContainerStyle
            activeOpacity={0.9}
          />
        </View>
        <View>
          <View>
            <View style={styles.foodItemHeader}>
              <Text h3>Pizzas</Text>
            </View>
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              activeOpacity={0.75}
            >
              <Card
                title="Pepperoni Pizza"
                image={require("../images/pep-pizza.jpg")}
                containerStyle={styles.cardborder}
              >
                <Text style={styles.foodItemDescription}>
                  Offered from small to XL.
                </Text>
                <Text style={styles.foodItemPrice}>12.99</Text>
              </Card>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              activeOpacity={0.75}
            >
              <Card
                title="Cheese Pizza"
                image={require("../images/pep-pizza.jpg")}
                containerStyle={styles.cardborder}
              >
                <Text style={styles.foodItemDescription}>
                  Offered from small to XL.
                </Text>
                <Text style={styles.foodItemPrice}>10.99</Text>
              </Card>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              activeOpacity={0.75}
            >
              <Card
                title="Hawaiian Pizza"
                image={require("../images/pep-pizza.jpg")}
                containerStyle={styles.cardborder}
              >
                <Text style={styles.foodItemDescription}>
                  Offered from small to XL.
                </Text>
                <Text style={styles.foodItemPrice}>13.99</Text>
              </Card>
            </TouchableOpacity>
          </View>
          <View>
            <View style={styles.foodItemHeader}>
              <Text h3>Drinks</Text>
            </View>
            <Card title="Water" image={require("../images/Pepsi.jpg")} containerStyle={styles.cardborder}>
              <Text style={styles.foodItemDescription}>
                Offered from small to XL.
              </Text>
              <Text style={styles.foodItemPrice}>Free</Text>
            </Card>
            <Card
              title="Pepsi Softdrink"
              image={require("../images/Pepsi.jpg")}
              containerStyle={styles.cardborder}
            >
              <Text style={styles.foodItemDescription}>
                Offered from small to XL.
              </Text>
              <Text style={styles.foodItemPrice}>1.99</Text>
            </Card>
            <Card title="Sprite" image={require("../images/Pepsi.jpg")} containerStyle={styles.cardborder}>
              <Text style={styles.foodItemDescription}>
                Offered from small to XL.
              </Text>
              <Text style={styles.foodItemPrice}>1.99</Text>
            </Card>
          </View>
          <View>
            <View style={styles.foodItemHeader}>
              <Text h3>Desserts</Text>
            </View>
          </View>
        </View>
        </StickyHeaderFooterScrollView>
        </View>
    </SafeAreaView>
  );
  updateIndex = () =>  {
    this.setState({selectedIndex})
  }
}

export default menuScreen;

const styles = StyleSheet.create({
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

  foodAddOrder: {
    backgroundColor: "purple",
    borderRadius: 25,
    height: 45,
    width: 125,
    marginTop: 20,
  },

  foodItemHeader: {
    paddingTop: 50,
    marginLeft: 15,
  },

  foodItemDescription: {
    marginBottom: 10,
  },

  foodItemPrice: {
    marginBottom: 10,
    color: "green",
  },

  modalItemHeader: {
    textAlign:"center",
  },

  modalInput: {
    marginBottom: 20,
    margin:20,
    width:"80%",
    height:40,
  },

  modalInput2: {
    marginBottom: 20,
    margin:20,
    width:"100%",
    height:60,
  },

  modalPrice: {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
    color: "green",
  },

  modalExit: {
    left:1,
    padding:5,
    position:"absolute",
  },

  cardborder: {
    shadowColor: "#000",
    shadowOffset: {
	    width: 0,
	    height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
    borderRadius: 10,
  },

  shoppingButton: {
    paddingLeft: 15,
    paddingRight:15,
    marginBottom: 10
  },

  Icon: {
    marginTop:2,
    marginRight: 10
  }

});
