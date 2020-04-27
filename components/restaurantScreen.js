import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  SafeAreaView,
  ScrollView,
} from "react-native";
import {
  Card,
  ListItem,
  Button,
  Icon,
  Rating,
  Avatar,
} from "react-native-elements";




function restaurantScreen(props) {
  const { setCurrentStep } = props;
  const updateUser = props.updateUser;


  return (
    <SafeAreaView>
      <ScrollView>
        <View >
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Menu", { title: "Arcata's Pizza" })
            }
            activeOpacity={0.75} 
          >
		 
            <Card title="Arcata's Pizza" image={require("../images/pic2.jpg")} containerStyle={styles.cardBorder}>
              <Text style={styles.card}>
                The idea with React Native Elements is more about component
                structure than actual design.
              </Text>
            </Card>
		  
          </TouchableOpacity>
        </View>
        <View >
          <TouchableOpacity 
            onPress={() => props.navigation.navigate("Menu", { title: "Oven 360" })
            }
            activeOpacity={0.75}
          >
            <Card title="Oven 360" image={require("../images/oven360.png")} containerStyle={styles.cardBorder} >
              <Text style={styles.card}>
                The idea with React Native Elements is more about component
                structure than actual design.
              </Text>
            </Card>
          </TouchableOpacity>
        </View>
        <View >
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Menu", { title: "Store#3" })
            }
            activeOpacity={0.75} 
          >
		 
            <Card title="Store#3" image={require("../images/pic2.jpg")} containerStyle={styles.cardBorder}>
              <Text style={styles.card}>
                The idea with React Native Elements is more about component
                structure than actual design.
              </Text>
            </Card>
		  
          </TouchableOpacity>
        </View>
        <View >
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Menu", { title: "Store#4" })
            }
            activeOpacity={0.75} 
          >
		 
            <Card title="Store#4" image={require("../images/pic2.jpg")} containerStyle={styles.cardBorder}>
              <Text style={styles.card}>
                The idea with React Native Elements is more about component
                structure than actual design.
              </Text>
            </Card>
		  
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default restaurantScreen;

const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
  },
  cardBorder: {
	backgroundColor: "white",
	//shadow for IOS
	shadowColor: "#000",
	shadowOffset: {
		width: 0,
		height: 12,
	},
	shadowOpacity: 0.58,
	shadowRadius: 16.00,
	//shadow for Andriod
	elevation: 24,
	
	borderRadius: 10,
  },
  cardBorderPressed: {
	backgroundColor: "white",
	//shadow for IOS
	shadowColor: "#0000",
	shadowOffset: {
		width: 0,
		height: 1,
	},
	shadowOpacity: 0.18,
	shadowRadius: 1.00,


	//shadow for Andriod
	elevation: 1,
	
	borderRadius: 10,
  }
});
