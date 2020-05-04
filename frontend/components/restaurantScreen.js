import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import {
  Card,
  Tile,
} from "react-native-elements";

const restaurants = [
  {
    name: `Aracta's Pizza`,
    menu: {
      pizza: [
        {
          name: 'Hawaii',
          description: 'Best pizza small:210 cal, med:300cal, ........',
          sizes: [
            {
              size: 'S',
              price: 10.99
            },
            {
              size: 'M',
              price: 12.99
            },
            {
              size: 'L',
              price: 14.99
            },
            {
              size: 'XL',
              price: 14.99
            },
          ]
        },
        {
          name: 'Cheese and Sauage',
          description: 'Best pizza small:210 cal, med:300cal, ........',
          sizes: [
            {
              size: 'S',
              price: 10.99
            },
            {
              size: 'M',
              price: 12.99
            },
            {
              size: 'L',
              price: 14.99
            },
            {
              size: 'XL',
              price: 14.99
            },
          ]
        },
        {
          name: 'Vegie',
          description: 'Best pizza small:210 cal, lot and lot of vegie, ........',
          sizes: [
            {
              size: 'S',
              price: 10.99
            },
            {
              size: 'M',
              price: 12.99
            },
            {
              size: 'L',
              price: 14.99
            },
            {
              size: 'XL',
              price: 14.99
            },
          ]
        }
      ],
      desert: [
        {
          name: 'Funnel Cake Stick',
          description: 'Sweet strips of delicious funnel cake made by our special in house chef. Fresh out of the kitchen!!',
          price: 3.33
        },
        {
          name: 'Brownie',
          description: 'Sweet strips of delicious funnel cake made by our special in house chef. Fresh out of the kitchen!!',
          price: 9.99
        },
        {
          name: 'Deep fry icecream',
          description: 'Sweet strips of delicious funnel cake made by our special in house chef. Fresh out of the kitchen!!',
          price: 4.0
        },
        {
          name: 'Sweet Candy',
          description: 'Sweet strips of delicious funnel cake made by our special in house chef. Fresh out of the kitchen!!',
          price: 9.99
        }
      ],
      drink: [
        {
          name: 'coke',
          size: '500ml',
          type: 'Bottle',
          price: 2.99
        },
        {
          name: 'Diet coke',
          size: '500ml',
          type: 'Bottle',
          price: 2.99
        },
        {
          name: 'Orange soda coke',
          size: '500ml',
          type: 'Bottle',
          price: 2.99
        },
        {
          name: 'Sprite coke',
          size: '500ml',
          type: 'Bottle',
          price: 2.99
        }
      ],
      sides: [
        {
          name: '10 Chicken wings',
          description: 'Sweet, spicy and Cripsy dreep fried chicken wings with our special sauce!!',
          styleChoice: {
            hasOption: true,
            options: ['Breaded', 'Classic']
          },
          freeDipping: 2,
          gluten: false,
          price: 12.333
        },
        {
          name: 'Big Box Fries',
          description: 'Sweet, spicy and Cripsy dreep fried chicken wings with our special sauce!!',
          styleChoice: {
            hasOption: false,
            options: []
          },
          freeDipping: 0,
          gluten: false,
          price: 4.55
        },
        {
          name: 'Half Moon Cheesy Bread',
          description: 'Sweet, spicy and Cripsy dreep fried chicken wings with our special sauce!!',
          styleChoice: {
            hasOption: false,
            options: []
          },
          freeDipping: 0,
          gluten: false,
          price: 4.55
        }
      ],
      dipping: [
        {
          name: 'Creamy Garlic',
          description: '',
          price: 1.44,
          gluten: false
        },
        {
          name: 'Blue Cheese',
          description: '',
          price: 1.44,
          gluten: false
        },
        {
          name: 'Honey Garlic',
          description: '',
          price: 1.44,
          gluten: false
        },
        {
          name: 'Creamy Dil',
          description: '',
          price: 1.44,
          gluten: false
        },
        {
          name: 'Mild',
          description: '',
          price: 1.44,
          gluten: false
        },
        {
          name: 'Hot',
          description: '',
          price: 1.44,
          gluten: false
        }
      ]
    }
  }
]
function restaurantScreen(props) {
  const { setCurrentStep } = props;
  const updateUser = props.updateUser;

  return (
    <SafeAreaView>

      <ScrollView style={{backgroundColor: "white"}}>
        <View>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("Menu", { title: "Arcata's Pizza" })
            }
            activeOpacity={0.75}
          >
          <Tile
        imageSrc={require("../images/banner.png")}
      />
            <Card title="Arcata's Pizza" image={require("../images/pic2.jpg")} containerStyle={styles.cardborder}>
              <Text style={styles.card}>
                The idea with React Native Elements is more about component
                structure than actual design.
              </Text>
            </Card>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("Menu", { title: "Oven 360" })
            }
            activeOpacity={0.75}
          >
            <Card title="Oven 360" image={require("../images/oven360.png")} containerStyle={styles.cardborder}>
              <Text style={styles.card}>
                The idea with React Native Elements is more about component
                structure than actual design.
              </Text>
            </Card>
          </TouchableOpacity>
        </View>
        <View>
          <Card title="HELLO WORLD" image={require("../images/pic2.jpg")} containerStyle={styles.cardborder}>
            <Text style={styles.card}>
              The idea with React Native Elements is more about component
              structure than actual design.
            </Text>
          </Card>
        </View>
        <View>
          <Card
            title="HELLO WORLD"
            image={require("../images/pic2.jpg")}
            activeOpacity={0.75}
            containerStyle={styles.cardborder}
          >
            <Text style={styles.card}>
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
    marginBottom: 10,
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
  }
});
