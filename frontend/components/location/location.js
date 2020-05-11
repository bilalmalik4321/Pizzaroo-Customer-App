import React, { useState , useEffect} from 'react';
import { subscribe } from 'react-contextual';
import {  Text,View ,StyleSheet,Dimensions} from 'react-native';
import { ListItem ,Icon } from "react-native-elements";
import apiKey  from '../../googleAPI';
import GoogleSearch from './searchPlaces';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
const GooglePlacesInput = (props) => {

 
  const [errorMsg, setErrorMsg] = useState(false);
  const screenHeight = Math.round(Dimensions.get('window').height)
  const listA = props.user.addresses;
  useEffect(() => {
    if( props.user.addresses.length === 0) {
      props.updateCheckout({
        selected_address: false,
        address: {}
      })}
  },[listA]);

  // props.updateCheckout({
  //   selected_address: true,
  //   address :{
  //     apt,
  //     city,
  //     country,
  //     lng,
  //     lat,
  //     postalCode,
  //     street,
  //     state
  //   }
  // })
  const onSelectAddress = (address) => {
    const { apt, city, country, lng, lat , state, postalCode, street , uuid} = address;
    props.updateCheckout({
      selected_address: true,
      address :{
        uuid,
        apt,
        city,
        country,
        lng,
        lat,
        postalCode,
        street,
        state
      }
    })
  }

  return (
   
  <SafeAreaView style={{ backgroundColor: 'white', height: '100%'}}>
    <View style={{ width: '100%', height: props.user.showList? 90 : '100%' , backgroundColor: 'white' }}>
      <GoogleSearch
        googleApiKey={apiKey}
        queryCountries={['ca']}
        placeHolder={"Search address"}
        language={"en-US"}
        onChangeText={()=> {
          props.updateUser({
            showList: false,
            clearSearch: false
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
      { errorMsg && 
      <View style={{ paddingBottom:10, width: '100%', backgroundColor: 'white', alignItems: 'center'}}>
        <Text style={{color: '#ff6363'}}>
          Select a complete address.
        </Text>
      </View>
        }
          
      </View>

     <ScrollView style={{height:'100%'}}>
      <View style={{ backgroundColor: 'white', width: '100%', paddingRight: 5, paddingLeft: 5, paddingBottom: 40 }}>
          {props.user.showList && props.user.addresses.length !=0 && props.user.addresses.sort((a,b)=> a.createdAt === b.createdAt ? a.street < b.street : a.createdAt < b.createdAt).map((item, i) => {
            return (
            <View key={i} style={{ paddingTop: 5}}>
              <ListItem
                  onPress={()=>onSelectAddress(item) }
                  bottomDivider
                  leftElement={() => 
                    <Icon 
                      color={props.checkout.address.uuid === item.uuid? '#ff6363': 'black'}
                      name="location-on"
                      onPress={()=> onSelectAddress(item)}
                    />}
                  rightElement={() => 
                    <Icon 
                      color={props.checkout.address.uuid === item.uuid? '#ff6363': 'black'}
                      name="edit"
                      onPress={()=> {
                        props.updateAddress({...item});
                        props.navigation.navigate("Address");}}
                      />
                  }
                  subtitle={item.street + ", " + item.city + ", " + item.state + ", " + item.country}
                  key={i}
                  title={item.title}
                  titleStyle={{ color: `${props.checkout.address.uuid === item.uuid? '#ff6363': 'black'}`}}
                  subtitleStyle={{ paddingTop: 10 }}
                  subtitleStyle={{ color: `${props.checkout.address.uuid === item.uuid? '#ff6363': 'grey'}`}}
              />
            
            </View>
              
          );
        })}
      {props.user.showList && props.user.addresses.length !=0 &&
        <View style={{ paddingTop: 20, paddingBottom: 40}}>
            <ListItem
                leftElement={() => 
                  <Icon 
                    color={'#ff6363'}
                    name="location-on"/>}
                title={ !props.checkout.selected_address? "Please select one address": "Default address selected"}
                titleStyle={{color:'#ff6363'}}
              />
              <ListItem
                leftElement={() => 
                  <Icon 
                    color={'black'}
                    name="edit"/>}
                title="Edit the address"
              />
        </View>
        }
     
        {props.user.showList && props.user.addresses.length ===0 &&
        <View style={{ paddingTop: 20, paddingBottom: 40}}>
            <ListItem
                leftElement={() => 
                  <Icon 
                    color={'#ff6363'}
                    name="location-on"/>}
                title="You have no address ...!!!"
                titleStyle={{color:'#ff6363'}}
              />
              <ListItem
                leftElement={() => 
                  <Icon 
                    color={'black'}
                    name="search"/>}
                title="Search your address ..."
              />
        </View>
        }
      {props.user.showList && props.user.addresses.length === 0 &&
      <View style={{ paddingTop: 200, justifyContent:'center', backgroundColor: 'white', height: 200 , width:'100%' , alignItems: 'center'}}>
        <Text 
          style={{color: '#ff6363',fontSize: 20, backgroundColor: 'white', height: 100 , width:'100%' ,justifyContent:'center', textAlign: 'center'}}
        > 
          {/* Please enter an address. */}
        </Text>
        <Text 
          style={{color: '#ff6363', fontSize: 15,backgroundColor: 'white', height: 100  , width:'100%',textAlign: 'center' }}
        > 
          {/* We will locate the neareast stores for you!!! */}
        </Text>
      </View>
      }
      </View>
     </ScrollView>
</SafeAreaView>
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
