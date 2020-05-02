import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
} from "react-native";
import { Card, ListItem, Button } from "react-native-elements";
import StickyHeaderFooterScrollView from 'react-native-sticky-header-footer-scroll-view';
import {subscribe} from "react-contextual";

function order(props) {
  const { setCurrentStep } = props;
  const updateUser = props.updateUser;

  var buttonsListArr = [];
  const orderSize = props.order.size;
  
  for (let i = 0; i < orderSize; i++) 
  {
   buttonsListArr.push(
    <View style={styles.user} key={i}>
    <Text style={styles.name}>{props.item.quantity}  {props.item.name}  ${props.item.price}  {orderSize}</Text>
    <ListItem
  bottomDivider
  />
  </View>
   );
  };
  


  return (
    <SafeAreaView>
      <StickyHeaderFooterScrollView style={styles.scrollableArea}
      makeScrollable = {true}
      renderStickyFooter={() => { return (
        <View  style={styles.shoppingButton}>
            <Button 
            raised 
            title="Checkout Order"
            onPress={() =>
              props.navigation.navigate("Checkout")
            } 
            />
        </View>
      )}}
    >
        <View>
          <Card containerStyle={ styles.card } dividerStyle>
          {
    buttonsListArr
  }
          </Card>
        </View>
      </StickyHeaderFooterScrollView>
    </SafeAreaView>
  );
}

export default subscribe()(order);


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

