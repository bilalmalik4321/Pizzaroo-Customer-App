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
  ButtonGroup,
  Badge
} from "react-native-elements";
import StickyHeaderFooterScrollView from 'react-native-sticky-header-footer-scroll-view';
import InputSpinner from "react-native-input-spinner";
import {subscribe} from "react-contextual";

function MenuScreen(props) {

  const [modalVisible, setModalVisible] = useState(false);
  const [state, setState] = useState(0);
  const buttons = ["S", "M", "L", "XL"];
  const [footer, setFooter] = useState(false);
  const [quantity, setQuantity] = useState(1);

  console.log("props--- menu", props.menu);
  const { pizza, desserts, drinks, sides, dipping } = props.menu;
  console.log("drink", drinks);
  const prices = {
    '0': 10.99,
    '1': 12.99,
    '2': 14.99,
    '3': 17.99,
    
  }
  function updateTitle (food) {
    props.updateItem({
      name: food,
    })
  }

  function updateIndex (index) {
    props.updateItem({
      price: prices[index] * quantity,
      size: index,
    })
  }

  function updateQuantity (value) {
    setQuantity(value);
    props.updateItem({
      quantity: value,
      price: prices[props.item.size] * value
    })
  
  }

  function updateOrderSize (total) {
    props.updateOrder({
      size: total,
    })
  }

  return (
    <SafeAreaView>
      <Modal visible={modalVisible} animationType="slide" >
      <View style={[styles.centeredView, modalVisible ? {backgroundColor: 'rgba(0,0,0,0.5)'} : '']}>
      <View style={styles.modalView}>
          <Icon
            name="close"
            size={30}
            color="black"
            onPress={() => {
              setModalVisible(false);
            }}
            style={styles.modalExit}
          />
          <Text style={styles.modalItemHeader}>
            How Many?
          </Text>
          <View style={{...styles.modalInput, textAlign: 'center'}}>
          <InputSpinner
            max={10}
            min={1} 
            value={quantity} 
            colorMax={"#f04048"}
            colorMin={"#40c5f4"}
            onChange={e => updateQuantity(e)} 
            
          />
          </View>
          <Text style={styles.modalItemHeader}>
            Size
          </Text>
          <View style={styles.modalInput}>
            <ButtonGroup buttons={buttons} containerStyle={{ height: 50 }} selectedIndex={props.item.size} onPress={updateIndex} selectedButtonStyle={{backgroundColor:"purple"}}/>
          </View>
          <View style={styles.modalInput2}>
            <Input
              placeholder="new cutter, extra cheese..."
              label="Other Specifics?"
              multiline={true}
              numberOfLines={4}
            />
          </View>
          <Text style={styles.modalPrice}>
            Price: $ {props.item.price}
          </Text>

          <Button
            onPress={() => {
              setModalVisible(false);
              setFooter(true);
              setState(state + 1);
            }}
            title="Add to Order"
            buttonStyle={styles.foodAddOrder}
          />

        </View>
        </View>
      </Modal>
      <View >
      <StickyHeaderFooterScrollView
        makeScrollable = {true}
        renderStickyFooter={() => { return (
        <View  style={styles.shoppingButton}>
          {
            footer &&
            <Button 
            raised 
            title="View Order"
            onPress={() =>{
              props.navigation.navigate("Order");updateOrderSize(state);
            }} 
            icon={
            <View style={styles.Icon}><Badge value={state} status="primary" /></View>
          } />
          }
        </View>
      )}}
      >
        <View>
          <Tile
            imageSrc={require("../images/pic2.jpg")}
            featured
            overlayContainerStyle
            activeOpacity={0.9}
          />
        </View>
        <View>
          <View>
            <View style={styles.foodItemHeader}>
              <Text h3>Pizzas</Text>
            </View>
            { pizza && Object.keys(pizza).length != 0 && pizza.map((item, index)=>(
              
              <TouchableOpacity
                key={index}
                onPress={() => {
                  updateTitle(item.name);
                  setModalVisible(true);
                }}
                activeOpacity={0.75}
              >
                <Card
                  key={index}
                  title={item.name}
                  titleStyle={{ fontWeight: "bold"}}
                  image={require("../images/pep-pizza.jpg")}
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
            <View style={styles.foodItemHeader}>
              <Text h3>Side dishes</Text>
            </View>
            {sides && Object.keys(sides).length!=0 && sides.map((item,index)=>(
              
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
            ))}
          </View>


          <View>
            <View style={styles.foodItemHeader}>
              <Text h3>Drinks</Text>
            </View>
            {drinks && Object.keys(drinks).length!=0 && drinks.map((item,index)=>(
              
              <Card 
                key={index} 
                containerStyle={styles.drinks}
                // wrapperStyle={}
              >
                <Text style={{ fontWeight:"bold" , paddingBottom: 9}}>
                    {item.name} 
                  </Text>
                <Text style={styles.foodItemDescription}>
                  {item.size + " " + item.type + " " + item.cal + " cal." }
                </Text>
              <Text style={styles.foodItemPrice}>{item.price}</Text>
            </Card>
            ))}
          </View>


          <View>
          <View>
            <View style={styles.foodItemHeader}>
              <Text h3>Desserts</Text>
            </View>
            {desserts && Object.keys(desserts).length!=0 && desserts.map((item,index)=>(
                <Card 
                  key={index}
                  containerStyle={styles.drinks}
                  // wrapperStyle={}
                >
                  <Text style={{ fontWeight:"bold" , paddingBottom: 9}}>
                    {item.name} 
                  </Text>
                  <Text style={styles.foodItemDescription}>
                    {item.description }
                  </Text>
                <Text style={styles.foodItemPrice}>{item.price}</Text>
              </Card>
              ))}
            </View>
         </View>
         <View>
            <View style={styles.foodItemHeader}>
              <Text h3>Dipping Sauces</Text>
            </View>
            {dipping && Object.keys(dipping).length!=0 && dipping.map((item,index)=>(
                <Card 
                  key={index} 
                  containerStyle={styles.drinks}
                  // wrapperStyle={}
                > 
                  <Text style={{ fontWeight:"bold" , paddingBottom: 9}}>
                    {item.name} 
                  </Text>
                  <Text style={styles.foodItemDescription}>
                    {item.cal + " cal." }
                  </Text>
                <Text style={styles.foodItemPrice}>{item.price}</Text>
              </Card>
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
    backgroundColor: "purple",
    borderRadius: 25,
    height: 45,
    width: 125,
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
    left:1,
    padding:5,
    position:"absolute",
  },

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
