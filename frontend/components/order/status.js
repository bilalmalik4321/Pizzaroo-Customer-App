import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  Linking,
  YellowBox
} from 'react-native';
import { subscribe } from 'react-contextual';
import { Text, Divider ,Input, Icon} from 'react-native-elements';
import Steps from 'react-native-steps';
import { Modal } from 'react-native-paper';
import _ from 'lodash';
import moment from 'moment';
import {updateOrder} from '../api/api';
import firebase from '../../firebases'
// import SvgRenderer from 'react-native-svg-renderer';
const steps = {
  waiting: 0,
  confirmed: 1,
  enroute: 2,
  delivered: 3
}
const labels = ["Waiting","Confirmed","Out for delivery", "Delivered"];
const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize:30,
  separatorStrokeWidth: 3,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#fe7013',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#fe7013',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#fe7013',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#fe7013',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#fe7013',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#fe7013'
}
 
const Status = props => {
  YellowBox.ignoreWarnings(['componentWillReceiveProps']);
  console.log("user", props);

  const [text, setText] = useState('waiting');
  const uuid = props.status.uuid;
  // const { loading } = props.status;
  useEffect( ()=> {
      console.log("props----------------",props)
      console.log("status Id", props.status.id!== null)
      const fetchData =  async ()=>{
        try {
          await firebase.firestore()
            .collection('orders')
            .where('uuid', '==', uuid)
            .onSnapshot(querySnapshot => {
              querySnapshot.docChanges().forEach(change => {
              if (change.type === 'modified') {
                console.log("changed----", change.doc.data());
                props.updateStatus({ order: change.doc.data(), loading: false})
              }
            })
          })
      } catch (err) {
        console.log("error", err);
      }
    }
    fetchData();
    // return () => {};
  },[]);

  console.log("latest Use Effect -----", props.status)
  const [step, setStep] =useState(0);
  const convertDate = (time) => moment(time,'YYYY-MM-DD hh:mm:ss a').add(1,'day').format('LLL');

  // console.log("order***", props.status)

  return (
    <SafeAreaView style={{   
      flex: 1,
      width: '100%'
      }}>
      <ScrollView style={{padding: 20, backgroundColor: 'white'}}>

      {props.status.loading && 
      
      <Icon
        color="grey"
        size={100}
        containerStyle={{padding: 50, alignSelf: 'center' , marginTop: '20%'}}
        name="hourglass-empty"
      />}
      {!props.status.loading && 
      <View>
        <View style={{ padding: 35, justifyContent: 'center'}}>
          <Text style={{  fontSize: 15, fontWeight :'400'}}>
            Order ID: {props.status.id}
          </Text>
          <Text style={{ fontSize: 15, fontWeight :'300',color: 'grey'}}>
            Date: {convertDate(props.status.order.createdAt)}
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            
            <Text style={{ fontSize:15, fontWeight: '300', color: 'grey'}}>
             {props.status.order.store.name}
            </Text>
            <TouchableOpacity
              onPress={()=> Linking.openURL(`tel:${props.status.order.store.phone}`) }
            >
              <Text style={{ fontSize: 15 , fontWeight: '400', color: 'green' , alignItems: 'center'}}>
                Contact
              </Text>
            </TouchableOpacity>
 
          </View> 
        </View>
          
          <View
           style={{ paddingRight: 35, paddingLeft: 35, flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}
          
          >
            <Text style={{fontWeight: `${props.status.order.progressStep === 'waiting'? 'bold':'200'}`, color: `${props.status.order.progressStep === 'waiting'? 'green':'grey'}`}}>
              Waiting
            </Text>
            <Text style={{fontWeight: `${props.status.order.progressStep === 'confirmed'? 'bold':'200'}`, color: `${props.status.order.progressStep === 'confirmed'? 'green':'grey'}`}}>
              Confirmed
            </Text>
            <Text style={{fontWeight: `${props.status.order.progressStep === 'enroute'? 'bold':'200'}`, color: `${props.status.order.progressStep === 'enroute'? 'green':'grey'}`}}>
              Out for delivery
            </Text>
            <Text style={{fontWeight: `${props.status.order.progressStep === 'delivered'? 'bold':'200'}`, color: `${props.status.order.progressStep === 'delivered'? 'green':'grey'}`}}>
              Delivered
            </Text>


          </View>
          <View style={{ alignContent: 'center', alignSelf: 'center', marginTop: 100}}> 
            {props.status.order.progressStep=== 'waiting' && 
            <Image 
              width={100}
              height={100}
              source={require('../../images/direct2.png')}
            />}
            {
              props.status.order.progressStep === 'confirmed' && 
         
             <Image 
              width={100}
              height={100}
              source={require('../../images/buildings.png')}
            />   
            }
            {
              props.status.order.progressStep === 'enroute' &&
                <Image 
                width={100}
                height={100}
                source={require('../../images/fast1.png')}
              />
            }
           { props.status.order.progressStep === 'delivered' &&
            <Image 
              width={100}
              height={100}
              source={require('../../images/pizza.png')}
            />
           }
          

          </View>
          <View style={{ paddingBotom: 100, justifyContent: 'center'}}>
   
            </View>  
         
          <View style={{ paddingLeft: 35, paddingRight: 35,paddingBottom: 25,paddingTop: 80, justifyContent: 'center'}}>
            <Text style={{  fontSize: 15, fontWeight :'500'}}>
              Items
            </Text>
            { props.status.order.numberOfItems !== 0 && props.status.order.items.pizzas.map((item, index) =>(
              <Text key={index} style={{ fontWeight: '300', color: 'grey'}}>
              {item.quantity}x {item.name}
              </Text>
            ))}
            { props.status.order.numberOfItems !== 0 && props.status.order.items.sides.map((item, index) =>(
              <Text  key={index} style={{ fontWeight: '300', color: 'grey'}}>
              {item.quantity}x {item.name}
              </Text>
            ))}
            { props.status.order.numberOfItems !== 0 && props.status.order.items.drinks.map((item, index) =>(
              <Text key={index} style={{ fontWeight: '300', color: 'grey'}}>
              {item.quantity}x {item.name}
              </Text>
            ))}
            { props.status.order.numberOfItems !== 0 && props.status.order.items.desserts.map((item, index) =>(
              <Text key={index} style={{ fontWeight: '300', color: 'grey'}}>
              {item.quantity}x {item.name}
              </Text>
            ))}
            { props.status.order.numberOfItems !== 0 && props.status.order.items.dipping.map((item, index) =>(
              <Text key={index} style={{ fontWeight: '300', color: 'grey'}}>
              {item.quantity}x {item.name}
              </Text>
            ))}
       
         </View> 
         <View style={{paddingLeft: 35, paddingRight:25}}>
                  <Divider/>
          </View>
         <View style={{ padding: 35,paddingTop: 20, justifyContent: 'center'}}>
            <Text style={{  fontSize: 15, fontWeight :'500'}}>
              Address
            </Text>
            <Text style={{ fontWeight: '300', color: 'grey'}}>
              {props.status.order.address.street}
            </Text>
         </View>
{/* 
        <Input
         label="Status"
         onChangeText={e => setText(e.toLowerCase())}
        >
           
        </Input>
         <TouchableOpacity
          onPress={()=> updateOrder(props.status.order, props.status.id, text)}
         >
           <Text style={{paddingTop: 20, alignSelf:'center', color: 'green', fontWeight: 'bold',fontSize: 30}}>Change order</Text>
         </TouchableOpacity>
   */}
        </View> }
      </ScrollView>
    </SafeAreaView>
  
  )
}

export default subscribe()(Status);
