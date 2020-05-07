import React from 'react';
import { subscribe } from 'react-contextual';
import {  Text, View,StyleSheet, TouchableHighlight} from 'react-native';
import { uuidv4 , editAddresses,} from './api';
import { ListItem} from "react-native-elements";
import { Input } from 'react-native-elements';
import moment from 'moment';

const timestamp = moment()
    .utcOffset('+05:30')
    .format('YYYY-MM-DD hh:mm:ss a');

const EditAddress = subscribe()(props => {
  const {    
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
  } = props.address;

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
        addresses: payload,
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
  };

  const onDeleteAddress = async () => {
    const temp = props.user.addresses.filter(e => e.uuid != props.address.uuid);
    const result = await editAddresses(temp);
    props.updateUser({
      showList: true,
      addresses: temp,
    });
    console.log("delete array", temp);
    props.updateAddress({
      title: '',
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
      newlySearch: true,
    });
    props.navigation.navigate("Location");
  }

  return(
    <View style={{...styles.centeredView}}>
      <View style={styles.modalView}>
        <View style={{paddingBottom: 20, paddingLeft: 25, justifyContent: 'center'}}> 
          <ListItem
            leftIcon={{ name: 'location-on' }}
            subtitle={city+ " "+ state +" "+ postalCode+ " " + country}
            title={street}
            titleStyle={{ fontWeight: "bold" , fontSize: 20}}
            subtitleStyle={{ paddingTop: 10 }}
            onPress={()=> {
              props.navigation.navigate("Location");
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
        <View style={{backgroundColor: 'white', paddingTop: 50 ,paddingLeft: 15, paddingRight: 15, flexDirection: 'row', justifyContent:'space-between'}}>
          <TouchableHighlight
            style={{ ...styles.openButton,width: '45%', backgroundColor: "#2196F3"}}
            onPress={() => {
              onSaveAddress();
              props.navigation.navigate("Location");
            }}
            >
              <Text style={styles.textStyle}>
                Save Address
              </Text>
          </TouchableHighlight>
          <TouchableHighlight
              style={{ ...styles.openButton, width: '45%',backgroundColor: "#ff6363" }}
              onPress={() => {
                onDeleteAddress();
              }}
            >
              <Text style={styles.textStyle}>
                Delete
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  )
});

export default EditAddress;


const styles = StyleSheet.create({

  centeredView: {
    flex: 1,
    width: '100%',
alignItems: "center"
  },
  modalView: {
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 20,
    width: '100%',
    height: '100%',
    backgroundColor: "white",
    paddingRight: 35,
    paddingLeft: 35,
    paddingBottom: 35,
    paddingTop: 70,
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
