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
import { Card, ListItem, Button, Icon } from "react-native-elements";

function accountScreen(props) {
  const { setCurrentStep } = props;
  const updateUser = props.updateUser;

  const users = [
    {
      name: "Change email or password",
      avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg",
    },
    {
      name: "Change address",
      avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg",
    },
    {
      name: "Logout",
      avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg",
    },
    {
      name: "Need Help?",
      avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg",
    },
  ];

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Card containerStyle={{ padding: 0 }}>
            {users.map((u, i) => {
              return (
                <ListItem
                  key={i}
                  roundAvatar
                  title={u.name}
                  avatar={{ uri: u.avatar }}
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
