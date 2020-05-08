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

const  Checkout = props => {
  const [modalVisibleOther, setModalVisibleOther] = useState(false);
  const [method, setMethod] = useState(0);
  const [errMsg , setErrMsg] = useState(null);
  console.log("checkout info",props.checkout);

  const onConfirm = async()=> {
    if(!props.checkout.selected_address){
      setErrMsg('You must select an address')
    } else {
      //TODO ===> send to order status
    }
  };

  return (
    <SafeAreaView>
      <StickyHeaderFooterScrollView
        renderStickyFooter={() => 
          <View  style={styles.shoppingButton}>
            <Button 
              buttonStyle={{backgroundColor: '#ff6363', borderRadius: 20}}
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
                    <Text>Pizzia Plazza</Text>
                </View>}
            /> 
            <View style={{paddingLeft: 15, paddingRight: 15}}>
              <Divider/>
            </View>

            <ListItem 
              title="Address"
              rightElement={ 
                <View>
                  <Text>400 sunset ave</Text> 
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
                          buttonInnerColor={method===0 ? '#c3edea' : '#000'}
                          buttonOuterColor={'#c3edea'}
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
                          obj={{label: 'Card', value: 1}}
                          onPress={()=>{
                            setMethod(1)
                            props.updateCheckout({payment: 'card'});
                          }}
                          borderWidth={1}
                          buttonInnerColor={method===1? '#c3edea' : '#000'}
                          buttonOuterColor={'#c3edea'}
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
                      <Text style={{color: 'grey'}} >123-123-123</Text>
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
                          color='red'
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
                            color='red'
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
          buttonStyle={{borderRadius: 20, paddingRight: 40, paddingLeft: 40, alignItems: 'center', backgroundColor: "#ff6363", justifyContent: 'center'}}
          titleStyle={{ textAlign: 'center'}}
        />
      </View>
    </Modal>
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
