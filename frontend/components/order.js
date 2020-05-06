import Icon from "react-native-vector-icons/FontAwesome";
import React, { useState,useEffect } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Modal,
  TouchableOpacity,
  Image
} from "react-native";
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
import InputSpinner from "react-native-input-spinner";
import {subscribe} from "react-contextual";
import { ScrollView } from "react-native-gesture-handler";
import {RadioButton} from 'react-native-paper';
import {uuidv4} from './api';
import { SwipeListView } from 'react-native-swipe-list-view';

const total = (items) => {
  
  let count = 0;
  const { pizzas, dipping, drinks, sides,desserts} = items;      

  pizzas.forEach(element =>{
    count = count + (element.quantity * element.price);
  });
  drinks.forEach(element =>{
    count = count + (element.quantity * element.price);
  });
  sides.forEach(element =>{
    count = count + (element.quantity * element.price);
  });
  dipping.forEach(element =>{
    count = count + (element.quantity * element.price);
  });
  desserts.forEach(element =>{
    count = count + (element.quantity * element.price);
  });

  return count;

 }

 function findNumberOfOrder(items) {
  const {pizzas, desserts, drinks, dipping, sides} = items;

  return pizzas.length+ desserts.length+ drinks.length+ dipping.length+sides.length
}


function MenuScreen(props) {

  const [modalVisibleOther, setModalVisibleOther] = useState(false);
  const buttons = ["S", "M", "L", "XL"];
  const [footer, setFooter] = useState(false);

  const temp = {
    pizzas: [{
      id: '123',
      kind: 'pizza',
      name: 'Hawaii',
      quantity: 2,
      price: 22.99,
      description: 'Best pizza eve',
      cal: 0,
      type: '',
      size: 'S',
      sizeDescription: 'Small'
    },
    {
      id: '123',
      kind: 'pizza',
      name: 'Hawaii',
      quantity: 2,
      price: 22.99,
      description: 'Best pizza eve',
      cal: 0,
      type: '',
      size: 'S',
      sizeDescription: 'Small'
    },
    {
      id: '123',
      kind: 'pizza',
      name: 'Hawaii',
      quantity: 1,
      price: 22.99,
      description: 'Best pizza eve',
      cal: 0,
      type: '',
      size: 'S',
      sizeDescription: 'Small'
    }],
    drinks: [{
      id: '1234',
      kind: 'drinks',
      name: 'Coke',
      quantity: 2,
      price: 1.99,
      description: '',
      cal: 0,
      type: 'Bottle',
      size: '500 ml'
    }],
    dipping: [{
      id: '12345',
      kind: 'dipping',
      name: 'Honey Garlic',
      quantity: 3,
      price: 0.99,
      description: '',
      cal: 0,
      type: '',
      size: ''
    }],
    sides: []
  };
 
  const numberOfOrder =findNumberOfOrder(props.items);

  useEffect(() => {
   if(numberOfOrder === 0)
     props.navigation.navigate("Menu")
  }, [numberOfOrder]);


  const [edit, setEdit] = useState(false);
  const { pizzas, desserts, drinks, sides, dipping } = props.items;
  // console.log("-----*****Order*****------", props.pizzaOrder);
  console.log("-----*****Item*****------", props.items);
  const onRemove = (item) => {
    if(edit) {
      const { id } = item;
      const kind = item.kind;
      console.log("itemsss", props.items, 'kinda', kind)
      const currentList = props.items[kind];
      const newList = currentList.filter( obj => obj.id != id);
      props.updateItems(kind,newList)
      setEdit(false);
    }
  }
  return (
    <SafeAreaView>
      <StickyHeaderFooterScrollView
        style={{ backgroundColor: 'white', zIndex: -1}}
        makeScrollable = {true}
      >

        <View style={{backgroundColor: 'white'}}>
         

          <View  style={{padding: 20, flex: 1, flexDirection: "row", justifyContent: 'space-between'}}>
            <View style={{paddingLeft: 15}}>
              <Text h4 style={{fontWeight: "bold"}} >
                Items
              </Text>
            </View>
            <View style={{paddingRight: 15}}>
            <TouchableOpacity 
              onPress={()=> setEdit(!edit)}
            >
              <Text h4 style={{fontWeight: "bold" , color: "#ff6363"}} >
                  {!edit?"Edit" : ''}
                </Text>
            </TouchableOpacity>
            </View>
          </View>
        
    
          {/* -------- Pizza --------- */}
          <View style={{ paddingLeft: 20, paddingRight: 20}}>
            {pizzas && Object.keys(pizzas).length!=0 && pizzas.sort((a,b)=>a.name < b.name).map((item,index)=>(
              <View  key={index}>
                <ListItem 
                  key={index}
                  title={item.name}
                  leftElement={()=> <Text>{item.quantity}</Text>}
                  rightElement={edit? <Icon name="close" color="#ff6363" size={20} onPress={()=> onRemove(item)}/>:<Text style={{ }} >${(item.price*item.quantity).toFixed(2)}</Text>}
                /> 
                <View style={{paddingLeft: 36, paddingRight: 15}}>
                  <Divider/>
                </View>
              </View>
            ))}
          </View>

          {/* -------- Sides --------- */}
          <View style={{ paddingLeft: 20, paddingRight: 20}}>
            {sides && Object.keys(sides).length!=0 && sides.sort((a,b)=>a.name < b.name).map((item,index)=>(
              <View  key={index}>
                <ListItem 
                  key={index}
                  title={item.name}
                  leftElement={()=> <Text>{item.quantity}</Text>}
                  rightElement={edit? <Icon name="close" color="#ff6363" size={20} onPress={()=> onRemove(item)}/>:<Text style={{ }} >${(item.price*item.quantity).toFixed(2)}</Text>}
                /> 
                <View style={{paddingLeft: 36, paddingRight: 15}}>
                  <Divider/>
                </View>
              </View>
            ))}
          </View>

          {/* -------- Desserts --------- */}
          <View style={{ paddingLeft: 20, paddingRight: 20}}>
            {desserts && Object.keys(desserts).length!=0 && desserts.sort((a,b)=>a.name < b.name).map((item,index)=>(
              <View  key={index}>
                <ListItem 
                  key={index}
                  title={item.name}
                  leftElement={()=> <Text>{item.quantity}</Text>}
                  rightElement={edit? <Icon name="close" color="#ff6363" size={20} onPress={()=> onRemove(item)}/>:<Text style={{ }} >${(item.price*item.quantity).toFixed(2)}</Text>}
                /> 
                <View style={{paddingLeft: 36, paddingRight: 15}}>
                  <Divider/>
                </View>
              </View>
            ))}
          </View>

           {/* -------- Drinks --------- */}
           <View style={{ paddingLeft: 20, paddingRight: 20}}>
            {drinks && Object.keys(drinks).length!=0 && drinks.sort((a,b)=>a.name < b.name).map((item,index)=>(
              <View  key={index}>
                <ListItem 
                  key={index}
                  title={item.name}
                  leftElement={()=> <Text>{item.quantity}</Text>}
                  rightElement={edit? <Icon name="close" color="#ff6363" size={20} onPress={()=> onRemove(item)}/>:<Text style={{ }} >${(item.price*item.quantity).toFixed(2)}</Text>}
                /> 
                <View style={{paddingLeft: 36, paddingRight: 15}}>
                  <Divider/>
                </View>
              </View>
            ))}
          </View>

             {/* -------- Dipping --------- */}
             <View style={{ paddingLeft: 20, paddingRight: 20}}>
            {dipping && Object.keys(dipping).length!=0 && dipping.sort((a,b)=>a.name < b.name).map((item,index)=>(
              <View  key={index}>
                <ListItem 
                  key={index}
                  title={item.name}
                  leftElement={()=> <Text>{item.quantity}</Text>}
                  rightElement={edit? <Icon name="close" color="#ff6363" size={20} onPress={()=> onRemove(item)}/>:<Text style={{ }} >${(item.price*item.quantity).toFixed(2)}</Text>}
                /> 
                <View style={{paddingLeft: 36, paddingRight: 15}}>
                  <Divider/>
                </View>
              </View>
            ))}
          </View>

        <View style={{padding: 30}}>
        <Button
            title="Add more items"
            titleStyle={{ color: 'white', alignSelf:'center'}}
            buttonStyle={{ alignSelf: 'center', padding: 10, borderRadius: 20, backgroundColor: "#ff6363"}}
            onPress={()=> props.navigation.navigate("Menu")}
        />
        </View>
      
        <View  style={{padding: 20, flex: 1, flexDirection: "row", justifyContent: 'space-between'}}>
            <View style={{paddingLeft: 15}}>
              <Text h4 style={{fontWeight: "bold"}} >
                Total
              </Text>
            </View>
            <View style={{paddingRight: 15}}>
              <Text h4 style={{fontSize:15, color: "#ff6363"}} >
                  ${(total(props.items)).toFixed(2)}
                </Text>
            </View>
            </View>
        </View>
        <View style={{ alignSelf: 'center',justifyContent: 'center', alignContent: 'center', textAlign: 'center'}}>
          <Button style={{ fontWeight: "bold", flex: 1, alignItems: 'center',justifyContent: 'flex-end', marginBottom: 20 }}
            onPress={() => {
            //TODO go to pick location
            if(numberOfOrder!=0){
              props.navigation.navigate("Checkout");
            }
            }}
            title={"Checkout"}
            buttonStyle={{...styles.foodAddOrder}}
          />
      </View>
      </StickyHeaderFooterScrollView>
   
    </SafeAreaView>
  );
}
export default subscribe()(MenuScreen);

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
