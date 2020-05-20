import Icon from "react-native-vector-icons/FontAwesome";
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Modal,
  TouchableOpacity,
} from "react-native";
import {
  Text,
  Tile,
  Card,
  Button,
  Input,
  Badge,
  Divider,
  ListItem
} from "react-native-elements";
import StickyHeaderFooterScrollView from 'react-native-sticky-header-footer-scroll-view';
import InputSpinner from "react-native-input-spinner";
import { ScrollView } from "react-native-gesture-handler";
import {RadioButton} from 'react-native-paper';
import {subscribe} from "react-contextual";


import {uuidv4} from '../api';
import { findNumberOfOrder } from '../_shared/utility';

function MenuScreen(props) {

  const [modalVisibleOther, setModalVisibleOther] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [footer, setFooter] = useState(false);


  const { pizzaMenu } = props;
  let counter = findNumberOfOrder(props.items);

  const { pizzas, desserts, drinks, sides, dippings } = props.menu;
  console.log("pizza menu--", props.pizzaMenu)
  return (
    <SafeAreaView>

      {/* ---------- Modal Pizza selection size ----------- */}
      <Modal visible={modalVisible} animationType="slide" >
      <View   style={styles.modalExit2}>
        <Icon
          borderRadius={2}
          backgroundColor="#ffffff"
          name="close"
          size={30}
          color="#ffffff"
          onPress={() => {
            props.copyPizzaMenu({});
            setModalVisible(false);
          }}
          style={{...styles.modalExit, zIndex: 1 , paddingTop: 4, paddingLeft: 8}}
        />
      </View>

      <ScrollView>
        <Tile
            imageSrc={require("../../images/pep-pizza.jpg")}
        /> 
        <View style={styles.displayChoice} >
          <Text style={{ fontWeight:"bold" , fontSize: 25, paddingBottom: 9}}>
            {props.pizzaOrder.name}
          </Text>
          <Text style={{ color: 'grey', paddingBottom: 20}}>
            {props.pizzaOrder.description}
          </Text>
          
          <Divider style={{ backgroundColor: 'grey'}} />
        </View>
  
        <View 
          style={styles.displayChoice}
        >
        
        <Text style={{ fontWeight:"bold" , fontSize: 20, paddingBottom: 9}}>
          Select Size
        </Text>
        <RadioButton.Group
          value={props.pizzaOrder.size}
        >
        {pizzaMenu.sizes && pizzaMenu.sizes.length != 0 && pizzaMenu.sizes.map((item, index)=>(
          <View key={index}>
            <ListItem
              key={index}
              leftElement={ 
              <RadioButton 
                style={{ backgroundColor: 'purple'}} 
                value={item.size}
                onPress={() => {
                props.updatePizzaOrder({ size: item.size , price: item.price})
              }}
              />}
              title={item.size}
              bottomDivider
              rightTitle={item.price.toString()}
              onPress={() => {
                props.updatePizzaOrder({ size: item.size , price: item.price})
              }}
            />
          </View>
          ))
          }

          </RadioButton.Group>          
        </View>

        <View style={{...styles.displayChoice, paddingLeft:10, paddingRight: 10}}>
          <Input
            style={{width: '100%'}}
            placeholder="e.g. Peanut allegies, do not include .....!!!"
            label="Extra  Instructions"
            multiline={true}
            numberOfLines={4}
            onChangeText={text => props.updatePizzaOrder({instruction: text})}
          />
        </View>

        <View style={{...styles.displayChoice,alignItems: 'center', paddingTop: 20, marginBottom: 100}}>
          <InputSpinner
            max={10}
            min={1} 
            value={props.pizzaOrder.quantity} 
            colorMax={"red"}
            color={"purple"}
            
            onChange={e => props.updatePizzaOrder({quantity: e})} 
            
          />
        </View>
      </ScrollView>
      <View style={{flexDirection: 'row', paddingBottom: 20, alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
        <Button
          onPress={() => {
            const { pizzas } = props.items;
            const item = props.pizzaOrder;
            item.id = uuidv4();
            pizzas.push(item);
            props.updateItems({pizzas});
            item.kind='pizzas'
            props.copyPizzaMenu({});
            props.clearPizzaOrder();
            setModalVisible(false);
            setFooter(true);
         
          }}
          title={`Add to Order\t\t\t${props.pizzaOrder.price && props.pizzaOrder.quantity? "$"+ (props.pizzaOrder.price * props.pizzaOrder.quantity).toFixed(2): '' }`}
          buttonStyle={{borderRadius: 20, paddingRight: 40, paddingLeft: 40, alignItems: 'center', backgroundColor: "#21bf73", justifyContent: 'center'}}
          titleStyle={{ textAlign: 'center'}}
        />
      </View>
      </Modal>



      {/* This is modal for others except Pizza -----------Others----------- */}


      <Modal visible={modalVisibleOther} animationType="slide" >
      <View   style={styles.modalExit2}>
        <Icon
          borderRadius={2}
          backgroundColor="#ffffff"
            name="close"
            size={30}
            color="#ffffff"
            onPress={() => {
              props.clearItem()
              setModalVisibleOther(false);

            }}
            style={{...styles.modalExit, zIndex: 1 , paddingTop: 4, paddingLeft: 8}}
          />
        </View>

        <ScrollView>
 
         <View
            style={{...styles.displayChoice, paddingTop: '30%'}}
          >
            <Text style={{ fontWeight:"bold" , fontSize: 25, paddingBottom: 9}}>
              {props.item.name}
            </Text>
            {props.item.kind === 'drinks' &&
              <Text style={{ color: 'grey', paddingBottom: 20}}>
                {props.item.size + " " + props.item.type + " " + props.item.cal + " cal." }
              </Text>
            }
            {props.item.kind === 'dipping' &&
              <Text style={{ color: 'grey', paddingBottom: 20}}>
                {props.item.cal + " cal." }
              </Text>
            }
          
            {(props.item.kind === 'sides' || props.item.kind === 'desserts') &&
              <Text style={{ color: 'grey', paddingBottom: 20}}>
                {props.item.description}
              </Text>
            }
        
            <Divider style={{ backgroundColor: 'grey'}} />
            </View>
            <View style={{...styles.displayChoice, paddingLeft:10, paddingRight: 10}}>
              <Input
                style={{width: '100%'}}
                placeholder="e.g. Peanut allegies for pizza...."
                label="Extra  Instructions"
                multiline={true}
                numberOfLines={4}
                onChangeText={text => props.updateItem({instruction: text})}
              />
            </View>

            <View style={{...styles.displayChoice,alignItems: 'center', paddingTop: 20, marginBottom: 100}}>
              <InputSpinner
                max={10}
                min={1} 
                value={props.item.quantity} 
                colorMax={"red"}
				        color={"purple"}
                onChange={e => props.updateItem({quantity: e})} 
                
              />
          </View>
        </ScrollView>
        <View style={{flexDirection: 'row', paddingBottom: 20, alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
          <Button 
            onPress={() => {
              let temp = props.items[props.item.kind];
              const item = props.item;
              item.id = uuidv4();
              temp.push(item);
              props.updateItems(props.item.kind, temp);

              props.clearItem();
              setModalVisibleOther(false);
              setFooter(true);
            
            }}
            title={`Add to Order\t\t\t${ props.item.price && props.item.quantity ? "$"+(props.item.price * props.item.quantity).toFixed(2): ''}`}
            buttonStyle={{borderRadius: 20, paddingRight: 40, paddingLeft: 40, alignItems: 'center', backgroundColor: "#5f6caf", justifyContent: 'center'}}
            titleStyle={{ textAlign: 'center'}}
          />
        </View>
      </Modal>

      <View >


      <StickyHeaderFooterScrollView
        makeScrollable = {true}
        renderStickyFooter={() => 
          <View  style={styles.shoppingButton}>
            { footer &&
              <Button 
                buttonStyle={{ borderRadius: 20, backgroundColor:'#ff6363'}}
                raised 
                title="View Order"
                onPress={() => {
                  if( counter!==0)
                    props.navigation.navigate("Review");
                }} 
                icon={<View style={styles.Icon}>
                        <Badge value={findNumberOfOrder(props.items)}  badgeStyle={{backgroundColor: "#ff6363"}}/>
                      </View>}
                
              />}
        </View>}
      >
        <View>
          <Tile
            imageSrc={require("../../images/pic2.jpg")}
            featured
            overlayContainerStyle
            activeOpacity={0.9}
          />
        </View>
        <View>
          <View>
            {pizzas && Object.keys(pizzas).length != 0 &&
            <View style={styles.foodItemHeader}>
              <Text h3>
                Pizzas
              </Text>
            </View>   
            }
            { pizzas && Object.keys(pizzas).length != 0 && pizzas.map((item, index)=>(
              
              <TouchableOpacity
                key={index}
                onPress={() => {
                  props.updatePizzaOrder({name: item.name, description: item.description,price: item.sizes[0].price, size: item.sizes[0].size})
                  props.copyPizzaMenu(item);
                  console.log("pizza item", item)
                  console.log("pizza item copy", props.pizzaMenu)
                  // updateTitle(item.name);
                  setModalVisible(true);
                }}
                activeOpacity={0.75}
              >
                <Card
                  key={index}
                  title={item.name}
                  titleStyle={{ fontWeight: "bold"}}
                  image={require("../../images/pep-pizza.jpg")}
                  containerStyle={styles.cardborder}
                >
                  <Text style={styles.foodItemDescription}>
                    {item.description}
                  </Text>
                  <Text style={styles.foodItemPrice}>{item.sizes[0].price}</Text>
                </Card>
              </TouchableOpacity>
            ))}
          </View>
          
          <View>
            {sides && Object.keys(sides).length!=0 &&
              <View style={styles.foodItemHeader}>
                <Text h3>Side dishes</Text>
              </View>
            }
            {sides && Object.keys(sides).length!=0 && sides.map((item,index)=>(
              <TouchableOpacity 
                key={index} 
                onPress={()=> {
                  props.updateItem({kind: 'sides',...item})
                  // console.log('--------***-------',props.item);
                  setModalVisibleOther(true);
                }}
              >
                  <Card 
                    key={index} 
                    containerStyle={styles.drinks}
                  >
                    <Text style={{ fontWeight:"bold" , paddingBottom: 9}}>
                        {item.name} 
                      </Text>
                    <Text style={styles.foodItemDescription}>
                      {item.description }
                    </Text>
                  <Text style={styles.foodItemPrice}>{item.price}</Text>
                </Card>
              </TouchableOpacity>
            ))}
          </View>


          <View>
          {drinks && Object.keys(drinks).length!=0 &&
            <View style={styles.foodItemHeader}>
              <Text h3>Drinks</Text>
            </View>
          }
            {drinks && Object.keys(drinks).length!=0 && drinks.map((item,index)=>(
              <TouchableOpacity 
                key={index} 
                onPress={()=> {
                  props.updateItem({kind: 'drinks',...item})
                  setModalVisibleOther(true);
                }}
              >
              <Card 
                key={index} 
                containerStyle={styles.drinks}
              >
                <Text style={{ fontWeight:"bold" , paddingBottom: 9}}>
                    {item.name} 
                  </Text>
                <Text style={styles.foodItemDescription}>
                  {item.size + " " + item.type + " " + `${!item.cal?" ": item.cal + " cal."}` }
                </Text>
              <Text style={styles.foodItemPrice}>{item.price}</Text>
            </Card>
            </TouchableOpacity>
            ))}
        </View>


      
            <View>
            {desserts && Object.keys(desserts).length!=0 &&
              <View style={styles.foodItemHeader}>
                <Text h3>Desserts</Text>
              </View>
            }
            {desserts && Object.keys(desserts).length!=0 && desserts.map((item,index)=>(
              <TouchableOpacity 
                key={index} 
                onPress={()=> {
                  props.updateItem({kind: 'desserts',...item})
                  setModalVisibleOther(true);
                }}
              >
                <Card 
                  key={index}
                  containerStyle={styles.drinks}
                >
                  <Text style={{ fontWeight:"bold" , paddingBottom: 9}}>
                    {item.name} 
                  </Text>
                  <Text style={styles.foodItemDescription}>
                    {item.description }
                  </Text>
                <Text style={styles.foodItemPrice}>{item.price}</Text>
              </Card>
              </TouchableOpacity>
              ))}
            </View>
        
          <View>
          {dippings && Object.keys(dippings).length!=0 &&
              <View style={styles.foodItemHeader}>
                <Text h3>Dipping Sauces</Text>
              </View>
            }
              {dippings && Object.keys(dippings).length!=0 && dippings.map((item,index)=>(
                <TouchableOpacity 
                key={index} 
                onPress={()=> {
                  props.updateItem({kind: 'dipping',...item})
                  setModalVisibleOther(true);
                }}
              >
                <Card 
                  key={index} 
                  containerStyle={styles.drinks}
                > 
                  <Text style={{ fontWeight:"bold" , paddingBottom: 9}}>
                    {item.name} 
                  </Text>
                  {item.cal &&
                  <Text style={styles.foodItemDescription}>
                    {!item.cal? "" : item.cal +" cal." }
                  </Text>
                  }
                <Text style={styles.foodItemPrice}>{item.price}</Text>
              </Card>
              </TouchableOpacity>
              ))}
            </View>
          </View>
        </StickyHeaderFooterScrollView>
      </View>
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
    backgroundColor: "#13aa52",
    borderRadius: 25,
    height: 45,
    width: '80%',
    marginTop: 20,
  },

  foodItemHeader: {
    paddingTop: 50,
    marginLeft: 15,
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
