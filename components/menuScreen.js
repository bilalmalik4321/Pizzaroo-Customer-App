import styles from "./style";
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
import { CheckBox, Text, Tile, Card } from "react-native-elements";

function menuScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView>
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
            <View style={{ paddingTop: 50, marginLeft:15 }}>
              <Text h3 style={"color:red,"}>
                Pizzas
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              activeOpacity={0.75}
            >
              <Card
                title="Pepperoni Pizza"
                image={require("../images/pep-pizza.jpg")}
              >
                <Text style={{ marginBottom: 10 }}>
                  Offered from small to XL.
                </Text>
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
                <Text style={{ marginBottom: 10 }}>
                  Offered from small to XL.
                </Text>
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
                <Text style={{ marginBottom: 10 }}>
                  Offered from small to XL.
                </Text>
              </Card>
            </TouchableOpacity>
          </View>
          <View>
            <View style={{ paddingTop:50, marginLeft:15 }}>
              <Text h3 style={"color:red,"}>
                Drinks
              </Text>
            </View>
            <Card title="Water" image={require("../images/Pepsi.jpg")}>
              <Text style={{ marginBottom: 10 }}>
                Offered from small to XL.
              </Text>
            </Card>
            <Card
              title="Pepsi Softdrink"
              image={require("../images/Pepsi.jpg")}
            >
              <Text style={{ marginBottom: 10 }}>
                Offered from small to XL.
              </Text>
            </Card>
            <Card title="Sprite" image={require("../images/Pepsi.jpg")}>
              <Text style={{ marginBottom: 10 }}>
                Offered from small to XL.
              </Text>
            </Card>
          </View>
          <View>
            <View style={{ paddingTop:50, marginLeft:15 }}>
              <Text h3 style={"color:red,"}>
                Desserts
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default menuScreen;
