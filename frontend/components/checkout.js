import React, {useState} from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import { subscribe } from 'react-contextual';
import {
  Text,
  Tile,
  Card,
  Button,
  Input,
  ButtonGroup,
  Badge,
  Divider,
  ListItem
} from "react-native-elements";
import StickyHeaderFooterScrollView from 'react-native-sticky-header-footer-scroll-view';
import Icon from "react-native-vector-icons/FontAwesome";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
function Checkout(props) {
  var radio_props = [
    {label: 'Cash', value: 0 },
    {label: 'Card', value: 1 }
  ];

  const [method, setMethod] = useState(0);
  return (
    <SafeAreaView>
    <StickyHeaderFooterScrollView
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
          <View style={{paddingRight: 15}}>
          <TouchableOpacity 
            onPress={()=> {}}
          >
            {/* <Text h4 style={{fontWeight: "bold" , color: "#ff6363"}} >
                Edit
              </Text> */}
          </TouchableOpacity>
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
              <ListItem 
                  title="Mr."
                  rightElement={ 
                  <View>
                      <Text style={{fontWeight: 'bold', fontSize: 20}}>John Wick</Text>
                  </View>}
                  /> 
                <View style={{paddingLeft: 15, paddingRight: 15}}>
                  <Divider/>
                </View>
                <ListItem 
                  title="Address"
                  rightElement={ 
                  <View>
                      <View>
                        <Text>400 sunset ave</Text>
                      </View>
                    
                  </View>}
                  /> 
                <View style={{paddingLeft: 15, paddingRight: 15}}>
                  <Divider/>
                </View>
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
                      onPress={()=>{setMethod(0)}}
                    >
                      <RadioButtonInput
                        isSelected={method===0}
                        obj={{label: 'Cash', value: 0}}
                        onPress={()=>{setMethod(0)}}
                        borderWidth={1}
                        buttonInnerColor={method===0 ? '#c3edea' : '#000'}
                        buttonOuterColor={'#c3edea'}
                        buttonSize={20}
                        buttonOuterSize={25}
                        buttonStyle={{}}
                        buttonWrapStyle={{}}
                      />
                      <RadioButtonLabel
                        labelStyle={{fontWeight: `${method===0? 'bold': 'normal'}`}}
                        onPress={()=>{()=>setMethod(0)}}
                        obj={{label: 'Cash ', value: 0}}
                      />
                    </RadioButton>
                  </View>
                    
                    <View>
                    <RadioButton
                      onPress={()=>{setMethod(1)}}
                    >
                      <RadioButtonInput
                      isSelected={method===1}
                        obj={{label: 'Card', value: 1}}
                        onPress={()=> setMethod(1) }
                        borderWidth={1}
                        buttonInnerColor={method===1? '#c3edea' : '#000'}
                        buttonOuterColor={'#c3edea'}
                        buttonSize={20}
                        buttonOuterSize={25}
                        buttonStyle={{}}
                        buttonWrapStyle={{alignItems: 'center', justifyContent:'center'}}
                      />
                        <RadioButtonLabel
                            labelStyle={{fontWeight: `${method===1? 'bold': 'normal'}`}}
                          onPress={()=>setMethod(1)}
                          obj={{label: 'Card', value:1}}
                        >
                        </RadioButtonLabel>
                    </RadioButton>  
                    </View>
                    
                    </RadioForm>
                  </View>
                 
                  }
                  /> 
                <View style={{paddingLeft: 15, paddingRight: 15}}>
                  <Divider/>
                </View>
                <ListItem 
                  title="Instructions"
                  rightElement={ 
                  <View>
                      <Text>e.g..</Text>
                  </View>}
                  /> 
                   <View style={{paddingLeft: 15, paddingRight: 15}}>
                  <Divider/>
                  </View>
                  <ListItem 
                  title="Phone"
                  rightElement={ 
                  <View>
                      <Text>123-123-123</Text>
                  </View>}
                  /> 
                <View style={{paddingLeft: 15, paddingRight: 15}}>
                  <Divider/>
                </View>
              </View>
          </View>
      </View>
    </StickyHeaderFooterScrollView>
    <View >
      <Button style={{ fontWeight: "bold", flex: 1, alignItems: 'center',justifyContent: 'flex-end', marginBottom: 20 }}
        onPress={() => {
        //TODO go to pick location
      
        }}
        title={"Comfirm"}
        buttonStyle={{...styles.foodAddOrder}}
      />
    </View>
  </SafeAreaView>
);
}
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
