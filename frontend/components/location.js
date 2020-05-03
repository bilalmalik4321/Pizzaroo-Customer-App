import React, { useState, useEffect, useRef } from 'react';
import { subscribe } from 'react-contextual';

import { Image, Text, View, ScrollView,TouchableOpacity ,StyleSheet, Modal, TouchableHighlight, Alert} from 'react-native';
import PlacesInput from 'react-native-places-input'
import { uuidv4 , editAddresses, getUser } from './api';
import { Card, ListItem ,Badge} from "react-native-elements";
import { Input } from 'react-native-elements';
import apiKey  from '../googleAPI';
import firebase from '../firebases';
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

const GooglePlacesInput = (props) => {
  let GoogleRef = useRef();
  const { loggedIn } = props.user;
  const [listOfAddreses, setAddresses] = useState(props.user.addresses);
  const [errorMsg, setErrorMsg] = useState(false);

  useEffect( ()=> {
    (async ()=> {
      try {
        const user = await getUser();
        setAddresses(user.addresses);
        props.updateUser({...user});
        console.log("user-------important\n",user)
    
      } catch( err)
      {
        console.log("failed to retrieve user",err)
      }
    })
   
 
  },[]);
  // console.log("list", props.user)
  // console.log("address", props.user.addresses)

  return (
    <View
      style={styles.container}
    > 
       <TouchableHighlight
        onPress={() => {
          props.navigation.navigate("Restaurants");
        }}
      >
      <Text style={{color: 'red' }}>Menu</Text>
      </TouchableHighlight>
      {errorMsg && <View style={{height: 30}}>
        <Badge
          status="error" 
          value={'Enter a complete address!'}
          />
      </View> }
      <View style={{height: 60}}>
        <PlacesInput
          ref={ e=> GoogleRef = e}
          googleApiKey={apiKey}
          placeHolder={"Search address"}
          language={"en-US"}
          onChangeText={()=> {
            props.updateUser({
              showList: false
            })
            setErrorMsg(false)
          }}
          onSelect={place => {
            const format = formatAddress(place.result.formatted_address);
            const { error } = format;
            const { state, city , postalCode, street, country} = format;
            if(error !== undefined) {
              setErrorMsg(true);
             
            } else {
              console.log("place", place, "format", format)
              const { lat , lng } = place.result.geometry.location;
              props.updateAddress({
               state,
               city,
               country,
               postalCode,
               street,
               lat,
               uuid: '',
               lng,
               modalVisible: true,
               newlySearch: true,
              })
            }
          }}
          />
      </View>    
            
      <View style={{ width: '100%' , paddingTop: 15, paddingRight: 15, paddingLeft: 15}}>
          {props.user.showList && props.user.addresses.length !=0 && props.user.addresses.sort((a,b)=> a.uuid < b.uuid).map((item, i) => {
            return (
              <ListItem
                leftIcon={{ name: 'location-on' }}
                rightIcon={{ name: 'edit'}}
                subtitle={item.street + ", " + item.city + ", " + item.state + ", " + item.country}
                key={i}
                title={item.title}
                subtitleStyle={{ paddingTop: 10 }}
                onPress={()=> {
                  props.updateAddress({ modalVisible: true ,...item});
                  // console.log("address", item, "props", props.address);
                }}
                bottomDivider
              />
            );
          })}
      </View>
      <EditAddress/>
    </View>
  );
}

export default subscribe()(GooglePlacesInput);

const formatAddress = address => {
  const temp = address.split(',');
  const error= 'Full address not provided!';
  if( temp.length < 4)
    return {
      error
    }
  try {
  const temp2 = temp[2].trim().split(" ");
  let state = temp2[0].trim();
  let postalCode = temp2[1].trim();
  if(temp2.length > 2)
    postalCode = postalCode + " " + temp2[2];
    
  return {
    street: temp[0].trim(),
    city: temp[1].trim(),
    state,
    postalCode,
    country: temp[3].trim()
  }
  } catch (err) {
    return {
      error
    }
  } 
}

const EditAddress = subscribe()(props => {
  const {    
    newlySearch, 
    title,
    uuid,
    apt,
    street,
    city,
    state,
    postalCode,
    country,
    lng,
    lat,
    instruction,
    modalVisible } = props.address;

  const onSaveAddress = async () => {
      const { addresses } = props.user;
      let payload = addresses;
      const { newlySearch } = props.address;
      const temp = {
        title,
        apt,
        street,
        city,
        state,
        postalCode,
        country,
        lng,
        lat,
        uuid,
        instruction
      }
      if((uuid === undefined || !uuid )&& newlySearch) {
        temp.createdAt = timestamp;
        temp.uuid = uuidv4();
        temp.newlySearch = false;
        payload.push(temp);
        console.log("new addres-------")
      } else {
        const newArray = addresses.filter( e => e.uuid !== props.address.uuid)
        temp.newlySearch = false;
        newArray.push(temp);
        payload = newArray;
        console.log("edited address-------", temp);
      }

      try {
        const result = await editAddresses(payload);
        // console.log("this is user info ", props.user)
        console.log(`new all address`, payload)
        props.updateUser({
          showList: true,
          addresses: payload
        });
        
      } catch (err) {
        console.log("error", err)
      }
      props.updateAddress({
        title: '',
        apt: '',
        instruction: '',
        uuid: ''
      });
  }
  const onDeleteAddress = async () => {
    const temp = props.user.addresses.filter(e => e.uuid != props.address.uuid);
    const result = await editAddresses(temp);
    props.updateUser({
      showList: true,
      addresses: temp
    });
    console.log("delete array", temp);
    props.updateAddress({
      tittle: '',
      uuid: '',
      apt: '',
      street: '',
      city:'',
      state: '',
      postalCode: '',
      country: '',
      lng: '',
      lat: '',
      instruction: '',
      modalVisible: false,
      newlySearch: true,
    });
  }

  return(
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          props.updateAddress({modalVisible: false})
        }}
      >
      
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between'
              }}>
              <View>
                  <TouchableHighlight
                    onPress={() => {
                      props.updateAddress({modalVisible: false})
                    }}
                  >
                <Text >Back</Text>
                </TouchableHighlight>
              </View> 
              <View >
                <Text> Edit Address</Text>
              </View>
                    
              <View>
                  <TouchableHighlight
                    onPress={() => {
                      onDeleteAddress();
                    }}
                  >
                <Text style={{color: 'red' }}>Delete</Text>
                </TouchableHighlight>
              </View>
            </View> 

            <View style={{paddingTop: 50, paddingBottom: 20}}> 
              <ListItem
                leftIcon={{ name: 'location-on' }}
                subtitle={city+ " "+ state +" "+ postalCode+ " " + country}
                title={street}
                titleStyle={{ fontWeight: "bold"}}
                subtitleStyle={{ paddingTop: 10 }}
                onPress={()=> {
               
                }}
              />
            </View>
            <View style={{ paddingBottom: 20}}>
              <Input
                label="Title"
                value={props.address.title}
                placeholder={'Home'}
                onChangeText={text => props.updateAddress({title: text})}
              />
            </View>
            <View style={{ paddingBottom: 20}}>
              <Input
                label="Apt/Unit"
                value={props.address.apt}
                placeholder={'Unit 3'}
                onChangeText={text => props.updateAddress({apt: text})}
              />
            </View>
            <View style={{ paddingBottom: 20}}>
             <Input
                label="Instructions for Deliveryman"
                placeholder="e.g. Righ the door bell.."
                value={props.address.instruction}
                onChangeText={text => props.updateAddress({instruction: text})}
  
              />
  
            </View>
            <View style={{ paddingTop:40}}>
              <TouchableHighlight
                  style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                  onPress={() => {
                    onSaveAddress();
                    props.updateAddress({modalVisible: false})
                  }}
                >
                  <Text style={styles.textStyle}>Save Address</Text>
                </TouchableHighlight>
            </View>
           
          </View>
          </View>
      </Modal>
    </View>
  )
});
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
      width: '100%',
      flex: 1,
      paddingTop: '13%',
      flexDirection: 'column',
  },
  centeredView: {
    flex: 1,
    width: '100%',
    alignItems: "center",
    marginTop: 22,

  },
  modalView: {
    margin: 20,
    width: '100%',
    height: '100%',
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
