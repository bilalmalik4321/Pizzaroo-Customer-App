import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  Avatar
} from "react-native";
import { Card, ListItem, Button, Icon } from "react-native-elements";

function avatar () {
  return(
  <Avatar
            rounded
            icon={{ name: "user", type: "font-awesome" }}
            onPress={() => navigation.navigate("Account")}
            style={styles.userButton}
          />
  );
}
function accountScreen(props) {
  const { setCurrentStep } = props;
  const updateUser = props.updateUser;

  const list = [
    {
      title: "Change email",
      icon: 'email'
    },
    {
      title: "Change password",
      icon: 'lock'
    },
    {
      title: "Change address",
      icon: 'location-on'
    },
    {
      title: "Logout",
      icon: 'exit-to-app'
    },
    {
      title: "Need Help?",
      icon: 'help'
    },
  ];

  return (
    <SafeAreaView>
      <ScrollView style={styles.scrollableArea} >
        <View>
          <Card containerStyle={ styles.card } dividerStyle>
            {list.map((item, i) => {
              return (
                <ListItem
        key={i}
        title={item.title}
        leftIcon={{ name: item.icon }}
        bottomDivider
        chevron
      />
              );
            })}
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default accountScreen;

const styles = StyleSheet.create({
  scrollableArea: {
    paddingBottom:300
  },
  card: {
    padding: 0
  },
});
