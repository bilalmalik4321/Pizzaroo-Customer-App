import React from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Card, ListItem } from "react-native-elements";
import firebase from '../firebases';
import {subscribe} from 'react-contextual';

function AccountScreen(props) {
  const { setCurrentStep } = props;
  const updateUser = props.updateUser;

  const list = [
    {
      title: "Change email",
      icon: 'email',
      onClick: () => {}
    },
    {
      title: "Change password",
      icon: 'lock',
      onClick: () => {}
    },
    {
      title: "Change address",
      icon: 'location-on',
      onClick: () => {
        props.navigation.navigate("Location");
      }
    },
    {
      title: "Logout",
      icon: 'exit-to-app',
      onClick: async () => {
        await firebase.auth().signOut(); 
        props.updateUser({
          loggedIn: false
        })
        props.navigation.navigate("Introduction");
      }

    },
    {
      title: "Need Help?",
      icon: 'help',
      onClick: () => {}

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
                  onPress={item.onClick}
                  bottomDivider
                />
              );
            })}
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default subscribe()(AccountScreen);


const styles = StyleSheet.create({
  scrollableArea: {
    paddingBottom:300
  },
  card: {
    padding: 0
  },
});

