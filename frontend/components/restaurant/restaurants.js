import React, {useState, useEffect} from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Platform
} from "react-native";
import {
  Card,
  Tile,
  Icon
} from "react-native-elements";

import { subscribe } from "react-contextual";
import { getDistanceFromLatLonInKm, convertDate } from '../_shared/utility';
import moment from 'moment';

 
var information = {
  card: {
    number: '4242424242424242',
    exp_month: '02',
    exp_year: '31',
    cvc: '999',
    name: 'Billy Joe'
  }
}
/**
 * Restaurant screen
 * @param {Object} props - store of HOC
 */
function RestaurantScreen(props) {


 
  const [toggleModal, setModal] = useState(false);

  const { addresses } = props.user;

  let list = [];
  list.push(props.schema[0]);
  list.push(props.schema[0]);  
  list.push(props.schema[0]);

  const getLocation = addresses.length === 0;
 
  const { lat, lng } = !getLocation? addresses[0] : {};
  // console.log("user", getLocation)
  useEffect(() => {
    props.getAllRestaurants();
  }, [props.getAllRestaurants])

  console.log("window __DEV__", __DEV__);
  console.log("window location", window.location);

  const { stores, loading } = props.restaurants;
  // console.log('store ----', props.restaurants.stores);
  // console.log('how many restaurants ?', stores.length);
  return (
    <SafeAreaView>
      <ScrollView style={{backgroundColor: "white"}}> 
        <Tile
          imageSrc={require("../../images/banner.png")}
        />  
       {/* <Icon 
              size={50}
              color='#ff6363'
              name="location-on"
              onPress={()=> onPayment()}
            /> */}
        {
          getLocation &&
          <View style={{ paddingBottom: 20}}>
            <Text style={{alignSelf: "center" , color: 'red' ,fontSize: 20 , paddingBottom: 20}}>
              You do not have an address.
            </Text>
            <Text style={{alignSelf: "center" , color: 'red' ,fontSize: 20 , paddingBottom: 20}}>
              Please Click
            </Text>
            <Icon 
              size={50}
              color='#ff6363'
              name="location-on"
              onPress={()=> props.navigation.navigate('Location')}
            />
          </View>
        }
        { !loading && stores.length !=0 && stores && stores.sort((a,b) => (a.name < b.name)).map((res, index)=> {
            {/* console.log("menu", res.menu) */}
          if ( res.menu && Object.keys(res.menu).length !== 0)
           return (
          <View key={index}>
            <TouchableOpacity
              key={index}
              onPress={() =>{

                props.clearItems();
                props.updateCheckout({
                  store: {
                    id: res.storeId,
                    address: {
                      street : res.street,
                      postalCode: res.postalCode,
                      province: res.province,
                      city: res.city

                    },
                    phone: res.storePhone,
                    name: res.storeName,
                    email: res.email
                  }
                })
               
                props.copyMenu({...res.menu})
                {/* console.log("menu--", res.menu) */}
                props.navigation.navigate("Menu", { title: res.storeName + " " + index })
              }}
              activeOpacity={0.75}
            >
            <Card key={index} title={res.storeName + " " + index} image={require("../../images/pic2.jpg")} containerStyle={styles.cardborder}>
              <Text style={styles.card}>
                {res.description}
              </Text>
              <Text style={styles.card}>
                {res.description}
              </Text>
              { props.user.addresses.length !==0?
                <Text style={{marginBottom: 10,color: "green"}}>{getDistanceFromLatLonInKm(lat,lng,res.lat, res.lng).toFixed(0)+"km"}</Text>
                : 
                <></>
              }
              { res.hour && res.hour.open && res.hour.close &&
                <Text style={{marginBottom: 10,color: "green"}}>
                  open: {res.hour.open} - {res.hour.close}
                </Text> 
              }
            </Card>
            </TouchableOpacity>
          </View>
          )
          })
        }
      </ScrollView>
    </SafeAreaView>
  );
};

export default subscribe()(RestaurantScreen);

const styles = StyleSheet.create({
  card: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 12
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
