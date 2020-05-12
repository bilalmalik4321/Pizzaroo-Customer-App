import React, {useEffect} from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  ScrollView,
  YellowBox 
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

// const bb = firebase.firestore.FieldValue.serverTimestamp();
// const aa = moment(timestamp,'YYYY-MM-DD hh:mm:ss a').add(1,'day').format('LLLL');

const  Checkout = props => {

  // console.log("props", props)
  YellowBox.ignoreWarnings(['componentWillReceiveProps']);
  // console.log("timestamp", timestamp, "aaaaa",aa)

  useEffect(()=> {
    // console.log("inside***")
    props.getCustomerOrders();
  },[props.getCustomerOrders])

  const convertDate = (time) => moment(time,'YYYY-MM-DD hh:mm:ss a').add(1,'day').format('LLLL');
  const timestamp = moment().format('YYYY-MM-DD hh:mm:ss:SS:SSS a');
  // console.log("user", props.user);
  const { active, completed} = props.user;
  // const one = active[0].createdAt;
 
  // console.log("one--edited", timestamp);
  // const aa = moment(timestamp,'YYYY-MM-DD hh:mm:ss a').add(1,'day').format('LLLL');
  // console.log("active", active, 'completed', completed);

  return (
    <SafeAreaView>
      <StickyHeaderFooterScrollView
        renderStickyFooter={() => 
          <View  style={styles.shoppingButton}>
            <Button 
              buttonStyle={{backgroundColor: '#ff6363', borderRadius: 20}}
              raised 
              title="Home"
              onPress={() => props.navigation.navigate('Restaurants')}
            />
          </View>}
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
        {active.length ===0 && 
        <View style={{padding: 35, justifyContent: 'center'}}>
          <Text style={{alignSelf: 'center'}}>
            You have no order....!
          </Text>
          <Text style={{alignSelf: 'center'}}>
            Let's order your favorite Pizza!s
          </Text>
        </View>}
        {active && active.length !== 0 && active.map((item, index)=> (
          <TouchableOpacity 
            key={index}
            onPress={() => {
              props.updateStatus({id: item.id});
              props.navigation.navigate('Status')
            }}
          >
            <View style={{paddingLeft: 35, paddingRight: 35, paddingBottom: 10}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <Text style={{ fontWeight:"400" ,fontSize: 20}}>
                        {item.store.name}
                  </Text>
                  <Text style={{ fontWeight:"500", fontSize: 15, color: 'green'}}>
                      {item.total.toFixed(2)}
                  </Text>
                </View>
                  <Text style={{}}>
                  {convertDate(item.createdAt)}
                  </Text>
                  <Text style={styles.foodItemPrice}>
                  {item.numberOfItems} items
                  </Text>
                  <View style={{paddingBottom: 10}}>
                      <Divider/>
                  </View>
              </View>
          </TouchableOpacity>
          
        ))}

        {completed && completed.length !== 0 && 
        <View  style={{padding: 20, flex: 1, flexDirection: "row", justifyContent: 'space-between'}}>
          <View style={{paddingLeft: 15}}>
            <Text h4 style={{fontWeight: "normal",color: '#ff6363'}} >
              Past
            </Text>
          </View>
        </View>
        }
  
        {completed && completed.length !== 0 && completed.map((item, index)=> (
          <TouchableOpacity 
              key={index}
            onPress={() => {}}
          >
            <View style={{paddingLeft: 35, paddingRight: 35, paddingBottom: 10}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <Text style={{ fontWeight:"400" ,fontSize: 20, color: 'grey'}}>
                        {item.store.name}
                  </Text>
                  <Text style={{ fontWeight:"500", fontSize: 15, fontWeight: '300', color: 'green'}}>
                      {item.total.toFixed(2)}
                  </Text>
                </View>
                  <Text style={{color: 'grey'}}>
                  {convertDate(item.createdAt)}
                  </Text>
                  <Text style={{...styles.foodItemPrice, fontWeight: '300'}}>
                  {item.numberOfItems} items
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
