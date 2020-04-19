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
} from "react-native-elements";

const price = 12.99;

function menuScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [state, setState] = useState(1);
  const buttons = ["S", "M", "L", "XL"];

  return (
    <SafeAreaView>
      <Modal visible={modalVisible} animationType="slide">
        <View>
          <Icon
            name="close"
            size={30}
            color="black"
            onPress={() => {
              setModalVisible(false);
            }}
            style={styles.modalExit}
          />
          <Text h3 style={styles.modalItemHeader}>
            How Many?
          </Text>
          <View style={styles.modalInput}>
            <Input placeholder="Quantity" keyboardType={"numeric"} defaultValue="1"/>
          </View>
          <Text h3 style={styles.modalItemHeader}>
            Size
          </Text>
          <View style={styles.modalInput}>
            <ButtonGroup buttons={buttons} containerStyle={{ height: 50 }} selectedIndex={1}/>
          </View>
          <Text h3 style={styles.modalItemHeader}>
            Other Specifics?
          </Text>
          <View style={styles.modalInput}>
            <Input
              placeholder="new cutter, heavy on the topping ..."
              multiline={true}
              numberOfLines={4}
            />
          </View>
          <Text h3 style={styles.modalPrice}>
            {price}
          </Text>
          {/*<View>
            <Input
              placeholder="INPUT WITH ICON"
              leftIcon={{ type: "font-awesome", name: "chevron-left" }}
            />

            <Input
              placeholder="INPUT WITH CUSTOM ICON"
              leftIcon={<Icon name="user" size={24} color="black" />}
            />

            <Input
              placeholder="INPUT WITH ERROR MESSAGE"
              errorStyle={{ color: "red" }}
              errorMessage="ENTER A VALID ERROR HERE"
            />
          </View>*/}
          <Button
            onPress={() => {
              setModalVisible(false);
            }}
            title="Add to Order"
          />
        </View>
      </Modal>
      <ScrollView>
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
            <Card title="Water" image={require("../images/Pepsi.jpg")}>
              <Text style={styles.foodItemDescription}>
                Offered from small to XL.
              </Text>
              <Text style={styles.foodItemPrice}>Free</Text>
            </Card>
            <Card
              title="Pepsi Softdrink"
              image={require("../images/Pepsi.jpg")}
            >
              <Text style={styles.foodItemDescription}>
                Offered from small to XL.
              </Text>
              <Text style={styles.foodItemPrice}>1.99</Text>
            </Card>
            <Card title="Sprite" image={require("../images/Pepsi.jpg")}>
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
      </ScrollView>
    </SafeAreaView>
  );
}

export default menuScreen;

const styles = StyleSheet.create({
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
    marginLeft:20,
  },
  modalInput: {
    marginBottom: 40,
    margin:20,
  },
  modalPrice: {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
    color: "green",
  },
  modalExit: {
    margin: 20
  }
});
