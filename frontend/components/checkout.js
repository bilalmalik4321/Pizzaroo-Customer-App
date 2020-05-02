import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import { PricingCard } from "react-native-elements";

function checkout(props) {
  const { setCurrentStep } = props;
  const updateUser = props.updateUser;

  return (
    <SafeAreaView>
      <ScrollView style={styles.scrollableArea}>
          <Text>
        <PricingCard
            color="#4f9deb"
            title="Free"
            price="$0"
            info={['1 User', 'Basic Support', 'All Core Features']}
            button={{ title: 'GET STARTED', icon: 'flight-takeoff' }}
        />
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

export default checkout;


const styles = StyleSheet.create({
  scrollableArea: {
    paddingBottom:300
  },
  card: {
    padding: 0
  },
  shoppingButton: {
    paddingLeft: 15,
    paddingRight:15,
    marginBottom: 10
  },
});

