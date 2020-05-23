import React, {useState} from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  ScrollView
} from "react-native";
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
import { subscribe } from 'react-contextual';

import { createOrder } from '../api';
import { findNumberOfOrder , total } from '../_shared/utility';

/**
 * Checkout component - display the pizza store info and prompt for order delivery detail
 * @param {Object} props - store of HOC 
 */
const  Checkout = props => {

  // set modal for instruction input
  const [modalVisibleOther, setModalVisibleOther] = useState(false);
  // payment cash/card var
  const [method, setMethod] = useState(0);
  const [errMsg , setErrMsg] = useState(null);

  // console.log("items", props.items, "props checkout", props.checkout)
  // Confirm action to place an order for user
  const onConfirm = async ()=> {

    // make the address is selected
    if(!props.checkout.selected_address){
      setErrMsg('You must select an address')
    } else {
      
      // store all the important info of an order
      const { address, instruction, payment, store } = props.checkout;
      const { items } = props;
      const numberOfItems = findNumberOfOrder(items);
      const payload = {
        customerName: props.user.name,
        customerPhone: props.user.phone,
        customerEmail: props.user.email,
        items,
        address,
        instruction,
        payment,
        storeId: store.id,
        store,
        numberOfItems,
        total: total(items)
      }
      console.log("did it work")
      // call the api to create an order
      await createOrder(payload);
      // navigate to the order history to see the order status
      props.navigation.navigate('Orders')
    }
  };

  return (
    <SafeAreaView>
      <StickyHeaderFooterScrollView
        renderStickyFooter={() => 
          <View  style={{paddingLeft: 15, paddingRight:15, marginBottom: 10}}>
            <Button 
              buttonStyle={{backgroundColor: '#0ecfb9', borderRadius: 20}}
              raised 
              title="Confirm"
              onPress={() => onConfirm()}
            />
          </View>}
        style={{ backgroundColor: 'white'}}
        makeScrollable = {true}
      >
      <View style={{backgroundColor: 'white'}}>
        <View  style={{padding: 20, flex: 1, flexDirection: "row", justifyContent: 'space-between'}}>
          <View style={{paddingLeft: 15}}>
            <Text h4 style={{fontWeight: "bold"}} >
              Delivery Details
            </Text>
        </View>
        </View>
        
        <View  style={{paddingRight: 20,paddingLeft: 20, flex: 1, flexDirection: "row", justifyContent: 'space-between'}}>
          <View style={{paddingLeft: 15}}>
            <Text style={{fontWeight: "bold", fontSize: 20, color: 'grey'}} >
              From
            </Text>
          </View>
        </View>

          {/* -------- Pizza --------- */}
        <View style={{ paddingLeft: 20, paddingRight: 20}}>
          
          <View >
            <ListItem 
              title="Restaurant"
              rightElement={ 
                <View>
                    <Text>{props.checkout.store.name}</Text>
                </View>}
            /> 
            <View style={{paddingLeft: 15, paddingRight: 15}}>
              <Divider/>
            </View>

            <ListItem 
              title="Address"
              rightElement={ 
                <View>
                  <Text>{props.checkout.store.address.street}</Text> 
                </View>}
              /> 
              <View style={{paddingLeft: 15, paddingRight: 15}}>
                <Divider/>
              </View>
            </View>
          </View>
        
                
          <View  style={{paddingRight: 20,paddingTop: 20,paddingLeft: 20, flex: 1, flexDirection: "row", justifyContent: 'space-between'}}>
            <View style={{paddingLeft: 15}}>
              <Text style={{fontWeight: "bold", fontSize: 20, color: 'grey'}} >
                To
              </Text>
            </View>
          </View>
          {/* -------- Pizza --------- */}
          <View style={{ paddingLeft: 20, paddingRight: 20}}>
            <View style={{paddingRight: 20}}>
              {/* -------- Name -------- */}
              <ListItem 
                title="Name"
                rightElement={ 
                  <View>
                      <Text style={{fontWeight: 'bold', fontSize: 20}}>John Wick</Text>
                  </View>}
              /> 
              <View style={{paddingLeft: 15, paddingRight: 15}}>
                <Divider/>
              </View>


             {/* --------Payment -------- */}
              <ListItem 
                title="Payment"
                rightElement={ 
                  <View > 
                    <RadioForm
                      initial={0}
                      formHorizontal={true}
                    >
                      <View>
                      <RadioButton
                        onPress={()=>{
                          setMethod(0)
                          props.updateCheckout({payment: 'cash'});
                        }}
                      >
                        <RadioButtonInput
                          isSelected={method===0}
                          obj={{label: 'Cash', value: 0}}
                          onPress={()=>{
                            setMethod(0)
                            props.updateCheckout({payment: 'cash'});
                          }}
                          borderWidth={1}
                          buttonInnerColor={method===0 ? '#0ecfb9' : '#000'}
                          buttonOuterColor={'#0ecfb9'}
                          buttonSize={20}
                          buttonOuterSize={25}
                          buttonStyle={{}}
                          buttonWrapStyle={{}}
                        />

                        <RadioButtonLabel
                          labelStyle={{color: 'grey' ,fontWeight: `${method===0? 'bold': 'normal'}`}}
                          onPress={()=>{
                            setMethod(0)
                            props.updateCheckout({payment: 'cash'});
                          }}
                          obj={{label: 'Cash ', value: 0}}
                        />
                      </RadioButton>
                    </View>
                    
                    <View>
                      <RadioButton
                        onPress={()=>{
                          setMethod(1)
                          props.updateCheckout({payment: 'card'});
                        }}
                      >
                        <RadioButtonInput
                        isSelected={method===1}
                          obj={{label: ' Card', value: 1}}
                          onPress={()=>{
                            setMethod(1)
                            props.updateCheckout({payment: 'card'});
                          }}
                          borderWidth={1}
                          buttonInnerColor={method===1? '#0ecfb9' : '#000'}
                          buttonOuterColor={'#0ecfb9'}
                          buttonSize={20}
                          buttonOuterSize={25}
                          buttonStyle={{}}
                          buttonWrapStyle={{alignItems: 'center', justifyContent:'center'}}
                        />
                        <RadioButtonLabel
                          labelStyle={{color: 'grey',fontWeight: `${method===1? 'bold': 'normal'}`}}
                          onPress={()=>{
                            setMethod(1)
                            props.updateCheckout({payment: 'card'});
                          }}
                          obj={{label: 'Card', value:1}}
                        >
                        </RadioButtonLabel>
                      </RadioButton>  
                    </View>
                    
                  </RadioForm>
                </View>
                 
                }/> 
              <View style={{paddingLeft: 15, paddingRight: 15}}>
                <Divider/>
              </View>

              {/* -------- Phone -------- */}
              <ListItem 
                title="Phone"
                rightElement={ 
                  <View>
                      <Text style={{color: 'grey'}} >{props.user.phone}</Text>
                  </View>}
              /> 
              <View style={{paddingLeft: 15, paddingRight: 15}}>
                <Divider/>
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

              <View style={{paddingLeft: 15, paddingRight: 15}}>
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
              <View style={{paddingLeft: 15, paddingRight: 15}}>
                <Divider/>
              </View>

            </View>
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
  }

});
