import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView
} from "react-native";
import { Card, ListItem, Button, Icon, Rating, Avatar } from "react-native-elements";

function restaurantScreen(props) {
  
  const { setCurrentStep } = props;
  const updateUser = props.updateUser;

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <TouchableOpacity onPress={() => props.navigation.navigate("Menu", { title: "Arcata's Pizza" } )} activeOpacity={0.75}>
            <Card title="Arcata's Pizza" image={require("../images/pic2.jpg")}>
              <Text style={{ marginBottom: 10 }}>
                The idea with React Native Elements is more about component
                structure than actual design.
              </Text>
              <Rating imageSize={20} readonly startingValue={5} />
            </Card>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => props.navigation.navigate("Menu", { title: "Oven 360" })} activeOpacity={0.75}>
            <Card title="Oven 360" image={require("../images/oven360.png")}>
              <Text style={{ marginBottom: 10 }}>
                The idea with React Native Elements is more about component
                structure than actual design.
              </Text>
              <Rating imageSize={20} readonly startingValue={3.5} />
            </Card>
          </TouchableOpacity>
        </View>
        <View>
          <Card title="HELLO WORLD" image={require("../images/pic2.jpg")}>
            <Text style={{ marginBottom: 10 }}>
              The idea with React Native Elements is more about component
              structure than actual design.
            </Text>
            <Rating imageSize={20} readonly startingValue={4} />
          </Card>
        </View>
        <View>
          <Card title="HELLO WORLD" image={require("../images/pic2.jpg")} activeOpacity={0.75}>
            <Text style={{ marginBottom: 10 }}>
              The idea with React Native Elements is more about component
              structure than actual design.
            </Text>
            <Rating imageSize={20} readonly startingValue={1.25} />
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default restaurantScreen;
