import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import {
  Text,
  Button,
  Divider,
  ListItem
} from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import StickyHeaderFooterScrollView from 'react-native-sticky-header-footer-scroll-view';
import {subscribe} from "react-contextual";

import { findNumberOfOrder, total } from '../_shared/utility';

/**
 * Review component that shows the list of the order and total
 * @param {Object} props - store of HOC
 *  
 */
const Review = (props) => {

  // count the number of the items
  const numberOfOrder =findNumberOfOrder(props.items);

  // if user removes all item from the list, return to the Menu
  useEffect(() => {
   if(numberOfOrder === 0)
     props.navigation.navigate("Menu")
  }, [numberOfOrder]);

  // toggle edit x icons 
  const [edit, setEdit] = useState(false);
  // get each kind of food
  const { pizzas, desserts, drinks, sides, dippings } = props.items;

  // Remove an item of the list
  const onRemove = (item) => {
    if(edit) {
      // get the id of the item
      const { id } = item;
      // get the type of the item
      const kind = item.kind;
      // get the current item list
      const currentList = props.items[kind];
      // filter the current list to get a new list without the removed item
      const newList = currentList.filter( obj => obj.id != id);
      // update the store with the new list
      props.updateItems(kind,newList);
      // toggle x remove icons
      setEdit(false);
    }
  }

  return (
    <SafeAreaView>
      <StickyHeaderFooterScrollView
       makeScrollable = {true}
       renderStickyFooter={() => 
        <View  style={{paddingLeft: 15, paddingRight:15, marginBottom: 10 }}>
          <Button 
            buttonStyle={{backgroundColor: '#ff6363', borderRadius: 20}}
            raised 
            title="Checkout"
            onPress={() => props.navigation.navigate('Checkout')}
          />
        </View>
        }
        style={{ backgroundColor: 'white'}}
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
            {dippings && Object.keys(dippings).length!=0 && dippings.sort((a,b)=>a.name < b.name).map((item,index)=>(
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
            titleStyle={{ color: '#ff6363', alignSelf:'center'}}
            buttonStyle={{ alignSelf: 'center', padding: 10, borderRadius: 20, backgroundColor: "white" , borderColor:'#ff6363', borderWidth: 1 }}
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
      </StickyHeaderFooterScrollView>
    </SafeAreaView>
  );
}
export default subscribe()(Review);
