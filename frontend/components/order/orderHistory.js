import React, { useEffect } from "react";
import {
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import {
  Text,
  Button,
  Divider,
} from "react-native-elements";
import StickyHeaderFooterScrollView from 'react-native-sticky-header-footer-scroll-view';
import moment from 'moment';
import { subscribe } from 'react-contextual';

/**
 * History component renders the list of current open/completed orders
 * @param {Object} props - store of HOC  
 */
const  History = props => {

  // get the updated list of order from the firestore
  useEffect(()=> {
    props.getCustomerOrders();
  },[props.getCustomerOrders])

  // convert data to a long format
  const convertDate = (time) => moment(time,'YYYY-MM-DD hh:mm:ss a').add(1,'day').format('LLLL');
  // get current local time with milli seconds
  const timestamp = moment().format('YYYY-MM-DD hh:mm:ss:SS:SSS a');
  
  // active: open order, completed: closed order
  const { active, completed} = props.user;

  return (
    <SafeAreaView>
      <StickyHeaderFooterScrollView
        renderStickyFooter={() => 
          <View  style={{paddingLeft: 15, paddingRight:15, marginBottom: 10}}>
            <Button 
              buttonStyle={{backgroundColor: '#0ecfb9', borderRadius: 20}}
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
              Let's order your favorite Pizza!
            </Text>
          </View>}
        {active && active.length !== 0 && active.map((item, index)=> (
          <TouchableOpacity 
            key={index}
            onPress={() => {
              props.updateStatus({order: item, id: item.id, loading: false, uuid: item.uuid});
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
              <Text style={{color: 'green', marginBottom: 10}}>
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
            onPress={() => {
              props.updateStatus({order: item, id: item.id, loading: false, uuid: item.uuid});
              props.navigation.navigate('Status')
            }}
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
              <Text style={{color: 'green', marginBottom: 10, fontWeight: '300'}}>
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

export default subscribe()(History);
