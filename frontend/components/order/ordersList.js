import React, {useState} from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  ScrollView
} from "react-native";
import { subscribe } from 'react-contextual';
import {
  Text,
  Button,
  Input,
  Badge,
  Divider,
  ListItem,
} from "react-native-elements";
import StickyHeaderFooterScrollView from 'react-native-sticky-header-footer-scroll-view';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import Icon from "react-native-vector-icons/FontAwesome";
import moment from 'moment';
import firebase from '../../firebases';
const timestamp = new firebase.firestore.Timestamp.now().toString();
const aa = moment("2020-05-08 08:05:55 am",'YYYY-MM-DD hh:mm:ss a').add(1,'day').format('LL');

const  Checkout = props => {
  const [modalVisibleOther, setModalVisibleOther] = useState(false);
  const [method, setMethod] = useState(0);
  const [errMsg , setErrMsg] = useState(null);
  console.log("checkout info",props.checkout);
  
  console.log("time-----",aa);
  const orders = [
    {
      id: '123-123',
      status: {
        current: 'open',
        progress: ['waiting', 'confirmed', 'preparing', 'delivered']
      },
      restaurant: '123 Pizza',
      total: 100.22,
      date: 'Monday, Marc 24th',
      numberOfitems: 10,
      items: {
        pizzas: [],
        dessert: []
      }
    },
    {
      id: '123-123',
      restaurant: '123 Pizza',
      total: 100.22,
      date: 'Monday, Marc 24th',
      numberOfitems: 10,
      items: {
        pizzas: [],
        dessert: []
      }
    },
    {
      id: '123-123',
      restaurant: '123 Pizza',
      total: 100.22,
      date: 'Monday, Marc 24th',
      numberOfitems: 10,
      items: {
        pizzas: [],
        dessert: []
      }
    }
  ]

  return (
    <SafeAreaView>
      <StickyHeaderFooterScrollView
        // renderStickyFooter={() => 
        //   <View  style={styles.shoppingButton}>
        //     <Button 
        //       buttonStyle={{backgroundColor: '#ff6363', borderRadius: 20}}
        //       raised 
        //       title="Confirm"
        //       onPress={() => onConfirm()}
        //     />
        //   </View>}
        style={{ backgroundColor: 'white'}}
        makeScrollable = {true}
      >
      <View style={{backgroundColor: 'white'}}>
        <View  style={{padding: 20, flex: 1, flexDirection: "row", justifyContent: 'space-between'}}>
          <View style={{paddingLeft: 15}}>
            <Text h4 style={{fontWeight: "normal", color: '#ff6363'}} >
              Current
            </Text>
          </View>
        </View>

        {orders && orders.length !== 0 && orders.map((item, index)=> (
          <TouchableOpacity 
            onPress={() => {}}
          >
            <View style={{paddingLeft: 35, paddingRight: 35, paddingBottom: 10}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <Text style={{ fontWeight:"bold" ,fontSize: 20}}>
                        {item.restaurant}
                  </Text>
                  <Text style={{ fontWeight:"bold", fontSize: 15, color: 'green'}}>
                      {item.total}
                  </Text>
                </View>
                  <Text style={{}}>
                  {item.date}
                  </Text>
                  <Text style={styles.foodItemPrice}>
                  {item.numberOfitems} items
                  </Text>
                  <View style={{paddingBottom: 10}}>
                      <Divider/>
                  </View>
              </View>
          </TouchableOpacity>
          
        ))}

        <View  style={{padding: 20, flex: 1, flexDirection: "row", justifyContent: 'space-between'}}>
          <View style={{paddingLeft: 15}}>
            <Text h4 style={{fontWeight: "normal",color: '#ff6363'}} >
              Past
            </Text>
          </View>
        </View>
  
        {orders && orders.length !== 0 && orders.map((item, index)=> (
          <TouchableOpacity 
            onPress={() => {}}
          >
            <View style={{paddingLeft: 35, paddingRight: 35, paddingBottom: 10}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <Text style={{ fontWeight:"bold" ,fontSize: 20}}>
                        {item.restaurant}
                  </Text>
                  <Text style={{ fontWeight:"bold", fontSize: 15, color: 'green'}}>
                      {item.total}
                  </Text>
                </View>
                  <Text style={{}}>
                  {item.date}
                  </Text>
                  <Text style={styles.foodItemPrice}>
                  {item.numberOfitems} items
                  </Text>
                  <View style={{paddingBottom: 10}}>
                      <Divider/>
                  </View>
              </View>
          </TouchableOpacity>
          
        ))}

      </View>
    </StickyHeaderFooterScrollView>
  </SafeAreaView>
);}

export default subscribe()(Checkout);

const styles = StyleSheet.create({
centeredView: {
  flex: 1,
  justifyContent: "center",
},

modalView: {
  margin: 20,
  // height: '100%',
  backgroundColor: "white",
  borderRadius: 20,
  padding: "5%",
  alignItems: "center",
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.6,
  shadowRadius: 3.84,
},

foodAddOrder: {
  backgroundColor: "#ff6363",
  borderRadius: 25,
  height: 45,
  width: '80%',
  marginTop: 20,
},

foodItemDescription: {
  marginBottom: 10,
},

foodItemPrice: {
  marginBottom: 10,
  color: "green",
},

modalItemHeader: {
  textAlign:"center",
},

modalInput: {
  marginBottom: 20,
  margin:20,
  width:"80%",
  height:40,
},

modalInput2: {
  marginBottom: 20,
  margin:20,
  width:"100%",
  height:60,
},

modalPrice: {
  textAlign: 'center',
  marginTop: 20,
  marginBottom: 20,
  color: "green",
},

modalExit: {
  // left:1,
  // padding:5,
  position:"absolute",
},
modalExit2: {
  position:"absolute",
  marginLeft: 20, 
  marginTop: 50, 
  zIndex: 1, 
  height: 40, 
  width: 40,
  backgroundColor: 'grey', 
  borderRadius: 50,
  opacity:0.8,
},
displayChoice: { 
  width: '100%', 
  paddingBottom: 20, 
  paddingLeft: 20, 
  paddingRight: 20, 
  marginTop:0
}
  ,
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
},
drinks: {
  paddingBottom: 0,
  marginBottom: 0,
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.20,
  shadowRadius: 1.41,
  elevation: 2,
  borderRadius: 10,
},

shoppingButton: {
 
  paddingLeft: 15,
  paddingRight:15,
  marginBottom: 10
},

Icon: {
  marginTop:2,
  marginRight: 10
}

});
