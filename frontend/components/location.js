import React, { useState, useEffect } from 'react';
import { subscribe } from 'react-contextual';
import {  Text, Image,View ,StyleSheet, TouchableHighlight,TouchableOpacity} from 'react-native';
import PlacesInput from 'react-native-places-input'
import {  getUser } from './api';
import { ListItem ,Badge} from "react-native-elements";
import apiKey  from '../googleAPI';
import { ScrollView } from 'react-native-gesture-handler';

const GooglePlacesInput = (props) => {

  const [errorMsg, setErrorMsg] = useState(false);
  return (
    // <ScrollView style={{backgroundColor: 'white'}}>
    <View
      style={{...styles.container, flex: 1}}
    > 
      {errorMsg && 
      <View style={{height: 30}}>
        <Badge
          status="error" 
          value={'Enter a complete address!'}
          />
      </View> 
      }
      <View style={{height: 90}}>
        <PlacesInput
          googleApiKey={apiKey}
          placeHolder={"Search address"}
          language={"en-US"}
          onChangeText={()=> {
            props.updateUser({
              showList: false
            });
            setErrorMsg(false);
          }}
          onSelect={place => {
            const format = formatAddress(place.result.formatted_address);
            const { error } = format;
            const { state, city , postalCode, street, country} = format;
            if(error !== undefined) {
              setErrorMsg(true);
              console.log("err", error)
             
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
               newlySearch: true,
              });
              props.navigation.navigate("Address");
            }
          }}
          />
      </View>    
            
      <View style={{ width: '100%', paddingTop: 15, paddingRight: 5, paddingLeft: 5 }}>
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
                props.updateAddress({...item});
                props.navigation.navigate("Address");
                // console.log("address", item, "props", props.address);
              }}
              bottomDivider
            />
          );
        })}
      </View>
      {props.user.showList && props.user.addresses.length === 0 &&
      <View style={{padding: 40, paddingTop: 200, justifyContent:'center', backgroundColor: 'white', height: 50 , width:'100%' , alignItems: 'center'}}>
        <Text 
          style={{color: '#ff6363',fontSize: 20, backgroundColor: 'white', height: 50 , width:'100%' ,justifyContent:'center', textAlign: 'center'}}
        > 
          Please enter an address.
        </Text>
        <Text 
          style={{color: '#ff6363',fontSize: 15,backgroundColor: 'white', height: 40  , width:'100%',textAlign: 'center' }}
        > 
          We will locate the neareast stores for you!!!
        </Text>
      </View>
      }
    </View>
    // </ScrollView>
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
      width: '100%',
  }
});
