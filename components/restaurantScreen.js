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
              <Text style={ styles.card }>
                The idea with React Native Elements is more about component
                structure than actual design.
              </Text>
            </Card>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => props.navigation.navigate("Menu", { title: "Oven 360" })} activeOpacity={0.75}>
            <Card title="Oven 360" image={require("../images/oven360.png")}>
              <Text style={ styles.card }>
                The idea with React Native Elements is more about component
                structure than actual design.
              </Text>
            </Card>
          </TouchableOpacity>
        </View>
        <View>
          <Card title="HELLO WORLD" image={require("../images/pic2.jpg")}>
            <Text style={ styles.card }>
              The idea with React Native Elements is more about component
              structure than actual design.
            </Text>
          </Card>
        </View>
        <View>
          <Card title="HELLO WORLD" image={require("../images/pic2.jpg")} activeOpacity={0.75}>
            <Text style={ styles.card }>
              The idea with React Native Elements is more about component
              structure than actual design.
            </Text>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default restaurantScreen;

const styles = StyleSheet.create({
  card: {
    marginBottom: 10
  }
});
