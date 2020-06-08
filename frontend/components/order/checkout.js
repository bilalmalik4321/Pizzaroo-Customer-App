import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, SafeAreaView, Modal, ScrollView } from "react-native";
import { Text, Button, Input, Badge, Divider, ListItem } from "react-native-elements";
import StickyHeaderFooterScrollView from 'react-native-sticky-header-footer-scroll-view';
import Icon from "react-native-vector-icons/FontAwesome";
import { subscribe } from 'react-contextual';
import { CreditCardInput } from "react-native-input-credit-card";

import { findNumberOfOrder, total } from '../_shared/utility';
import { callCloudFunctions, createOrder } from '../api';

const stripe_test_pk = 'pk_test_COhB9eDpQa7IK6llDCJffqFs003rbLlfSE';
const stripe_live_pk = 'pk_test_COhB9eDpQa7IK6llDCJffqFs003rbLlfSE';
const stripe = require('stripe-client')( __DEV__? stripe_test_pk : stripe_live_pk );
/**
 * Checkout component - display the pizza store info and prompt for order delivery detail
 * @param {Object} props - store of HOC 
 */
const  Checkout = props => {

  // set modal for instruction input
  const [modalVisibleOther, setModalVisibleOther] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errMsg , setErrMsg] = useState(null);
  const [errCard, setErrCard] = useState(null);
  const [_form, setForm ] = useState(null);
  // console.log("items", props.items, "props checkout", props.checkout)
  // Confirm action to place an order for user
  const onConfirm = async ()=> {

    setLoading(true);
    // make sure the address is selected
    if(!props.checkout.selected_address){
      setErrMsg('You must select an address')
    } else {
      
      console.log("form--", _form);

      const { values, valid } = _form;
      const { number, name, postalCode, expiry, cvc} = values;

      if ( valid ) {

        try {
    
        const exp_month = expiry.split('/')[0];
        const exp_year = '20' + expiry.split('/')[1];
        const token = await stripe.createToken({
          card: {
            number,
            exp_month,
            exp_year,
            cvc,
            name,
            address_zip: postalCode.toUpperCase()
          }
        });
        // console.log("token-------", token.id);
        if (!token.error) {
          
          const { address, instruction, store } = props.checkout;
          const { items } = props;
          const numberOfItems = findNumberOfOrder(items);
          
          // console.log("\n\n hi \n\n");
          // console.log("one-- sucesss", token);
          // connectedAccount from the firebase
          // prevent somenone from input their connected account and take the tranfer payment
          // retrieve seller connected account ID from the backend instead

          const result = await callCloudFunctions(`createPaymentIntent`,{
            amount: total(items),
            customerEmail: 'leanprakort@gmail.com',
            // is development ? then use 'tok_visa' to create paymentIntent
            token: __DEV__ ? 'tok_visa' : token.id,
            storeId: store.id,
  
          })

          // console.log("result=====",result)

          // prepare payload
          if(result){

            const payload = {
              customerName: props.user.name,
              customerPhone: props.user.phone,
              customerEmail: props.user.email,
              items,
              address,
              instruction,
              payment: 'paid',
              paymentIntent: result.result.id,
              storeId: store.id,
              store,
              numberOfItems,
              total: total(items),
            }
            
            // creat eh order
            await createOrder(payload);
            // navigate the orders screen
            setLoading(false);
            props.navigation.navigate('Orders')
          } else {
            setErrCard('There is something with the payment.')
          }
        }
      } catch (error) {
        console.log("error", error);
      }
    }
    setLoading(false);
  }
  setLoading(false);
  };

  return (
    <SafeAreaView>
      <StickyHeaderFooterScrollView
        renderStickyFooter={() => 
          <View  style={styles.buttonWrapper}>
            <Button 
             disabled={loading}
             loading={loading}
              buttonStyle={styles.buttonStyle}
              raised 
              title="Pay"
              onPress={() => {
                onConfirm() 
                if( _form && _form.valid )
                  onConfirm() 
                else 
                  setErrCard('Please enter valid card info.')
              }}
            />
          </View>}
        style={styles.backgroundWhite}
        makeScrollable = {true}
      >
      <View  style={styles.backgroundWhite}>
   
          <View style={styles.paymentWrapper}>
            <Text h4 style={{fontWeight: "bold"}} >
              Payment
            </Text>
          </View>
          <View style={{ marginTop: 40}}>
            <CreditCardInput 
              onChange={(e)=> setForm(e)} 
              requiresName={true}
              onFocus={()=> setErrCard('')}
              requiresPostalCode={true}
              validatePostalCode={() => 'valid'}
              inputContainerStyle={{ borderBottomWidth: 0.3}}
              allowScroll={true}
            /> 
    
            {  !errCard ? 
            <></> 
            :
            <Badge
              status="error"
              value={errCard}
            />
            }
          </View>

          <View  style={styles.deliveryWrapper}>
            <View style={{paddingLeft: 15}}>
              <Text h4 style={{fontWeight: "bold"}} >
                Delivery Details
              </Text>
            </View>
          </View>
      
      
              {/* -------- Address -------- */}
              <ListItem 
                title="Address"
                rightElement={ 
                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                      onPress={()=> {
                        setErrMsg(null)
                        props.updateUser({
                          previousScreen: 'checkout'
                        });
                        props.navigation.navigate("SelectLocation");
                      }}
                    >
                      <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        { (props.checkout.selected_address)? 
                          <Text style={{paddingRight: 5, color: 'grey'}}>
                            {props.checkout.address.street.length < 20 ? props.checkout.address.street : props.checkout.address.street.substring(0,19)}
                          </Text> 
                          : errMsg !== null ?
                          <Badge
                            badgeStyle={{marginRight: 5}}
                            status="error"
                            value={errMsg}
                          />
                          : 
                          <Text></Text>

                        }
                        <Icon 
                          color='#0ecfb9'
                          name="search"
                          />
                      </View> 
                    </TouchableOpacity>
                  </View>}
                /> 

              <View style={styles.paddingLeftandRight15}>
                <Divider/>
              </View>
                        
              
              {/* -------- Instructions -------- */}
              <ListItem 
                title="Instructions"
                rightElement={ 
                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                      onPress={()=> setModalVisibleOther(true)}
                    >
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text style={{paddingRight: 5, color: 'grey'}}>
                        {props.checkout.instruction.length < 20 ? props.checkout.instruction : props.checkout.instruction.substring(0,20) }
                      </Text>
                      <Icon 
                            color='#0ecfb9'
                            name="chevron-right"
                      />
                    </View>
                    
                    </TouchableOpacity>
                  </View>}
              /> 
              <View style={styles.paddingLeftandRight15}>
                <Divider/>
              </View>

            </View>
        
      <View >
    </View>
  </StickyHeaderFooterScrollView>

    <Modal visible={modalVisibleOther} animationType="slide" >
      <View  style={styles.modalExit2}>
        <Icon
          borderRadius={2}
          backgroundColor="#ffffff"
            name="close"
            size={30}
            color="#ffffff"
            onPress={() => {
              setModalVisibleOther(false);
            }}
            style={{...styles.modalExit, zIndex: 1 , paddingTop: 4, paddingLeft: 8}}
          />
      </View>
      <ScrollView>
        <View style={{...styles.displayChoice, paddingTop: '30%'}} >
          <Text style={{ fontWeight:"bold" , fontSize: 25, paddingBottom: 9}}>
            Instructions
          </Text>
        
          <Divider style={{ backgroundColor: 'grey'}} />
        </View>
        <View style={{...styles.displayChoice, paddingLeft:10, paddingRight: 10}}>
          <Input
            style={{width: '100%'}}
            placeholder="e.g. Leave at the door. Ring the bell...."
            label="Instructions"
            value={props.checkout.instruction}
            multiline={true}
            numberOfLines={4}
            onChangeText={text => props.updateCheckout({ instruction: text})}
          />
        </View>
  
      </ScrollView>

      <View style={{flexDirection: 'row', paddingBottom: 20, alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
        <Button 
          onPress={() => {
            setModalVisibleOther(false);
          }}
          title="Save"
          buttonStyle={{borderRadius: 20, paddingRight: 40, paddingLeft: 40, alignItems: 'center', backgroundColor: "#0ecfb9", justifyContent: 'center'}}
          titleStyle={{ textAlign: 'center'}}
        />
      </View>
    </Modal>
  </SafeAreaView>
);}

export default subscribe()(Checkout);

const styles = StyleSheet.create({
  modalExit: {
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
  },
  buttonWrapper: {
    paddingLeft: 15, 
    paddingRight:15, 
    marginBottom: 10
  },
  buttonStyle: {
    backgroundColor: '#0ecfb9', 
    borderRadius: 20
  },
  backgroundWhite: {
    backgroundColor: 'white'
  },
  paymentWrapper: {
    paddingLeft: 35, 
    marginTop: 30
  },
  deliveryWrapper: {
    padding: 20, 
    flex: 1, 
    flexDirection: "row", 
    justifyContent: 'space-between'
  },
  paddingLeftandRight15: {
    paddingLeft: 15, 
    paddingRight: 15
  }

});
