import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  Linking,
  YellowBox,
  Dimensions
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

  const trackStep = step => {
    switch (step) {
      case 'waiting' : return 1;
      case 'confirmed': return 2;
      case 'preparing': return 3;
      case 'enroute': return 4;
      case 'delivered': return 5;
    }
  }
  // console.log("order***", props.status)
  const width =  Dimensions.get('window').width;
  const widthBar = (width - 35*8)/4;
  const stepBar = {
    height: 35,
    width: 35,
    borderColor: '#ffd31d',
    borderRadius: 50,
    justifyContent: 'center',
    borderWidth: 4,
    alignItems: 'center'

  }
  const stepBarCompleted = {
    height: 35,
    width: 35,
    borderColor: '#ffd31d',
    borderRadius: 50,
    justifyContent: 'center',
    borderWidth: 4,
    alignItems: 'center',
    backgroundColor: '#ffd31d'

  }
  const stepBarText = {
    color: 'grey',
    fontWeight: '300'
  }

  const stepBarTextCompleted = {
    color: 'white', 
    fontWeight: 'bold'
  }
  const bar = {
    backgroundColor: '#dae1e7',
    alignSelf: 'center', 
    height:5 ,
    width: widthBar

  }
  const barCompleted ={
    backgroundColor: '#ffd31d',
    alignSelf: 'center', 
    height:5 ,
    width: widthBar
  }
  const stepBar2 = {
    width: 60,
    justifyContent: 'center',
    alignItems: 'center'

  }
 
  const stepBarText2 = {
    color: 'black',
    fontSize: 10,
    fontWeight: 'normal'
  }


  const bar2 = {
    backgroundColor: 'white',
    alignSelf: 'center', 
    height:5

  }


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


          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
            <View style={ trackStep(props.status.order.progressStep) == 1 ? {...stepBar} : {...stepBarCompleted }} > 
              <Text style={trackStep(props.status.order.progressStep) == 1 ? {...stepBarText} : {...stepBarTextCompleted }}>
              1
              </Text>
            </View> 
            <View style={trackStep(props.status.order.progressStep) !== 1 ? {...barCompleted} : {...bar}} />



            <View style={ trackStep(props.status.order.progressStep) <= 2 ? {...stepBar} : {...stepBarCompleted}} > 
              <Text style={trackStep(props.status.order.progressStep) <= 2 ? {...stepBarText} : {...stepBarTextCompleted }}>
              2
              </Text>
            </View> 



            <View style={trackStep(props.status.order.progressStep) <= 2 ? {...bar} : {...barCompleted}} />
            <View style={ trackStep(props.status.order.progressStep) <= 3 ? {...stepBar} : {...stepBarCompleted }} > 
              {/* <Text>🚀</Text> */}
              <Text style={trackStep(props.status.order.progressStep) <= 3 ? {...stepBarText} : {...stepBarTextCompleted }}>
            3
              </Text>
            </View> 



            <View style={trackStep(props.status.order.progressStep) >3 ? {...barCompleted} : {...bar}} />
            <View>
                <View style={ trackStep(props.status.order.progressStep) <=4 ? {...stepBar} : {...stepBarCompleted }} > 
              {/* <Text>🚀</Text> */}
              <Text style={trackStep(props.status.order.progressStep) <=4? {...stepBarText} : {...stepBarTextCompleted }}>
            4
              </Text>
            </View> 


            </View>
        

            <View style={trackStep(props.status.order.progressStep) == 5 ? {...barCompleted} : {...bar}} />
            <View style={ trackStep(props.status.order.progressStep) < 5 ? {...stepBar} : {...stepBarCompleted }} > 
            
              <Text style={trackStep(props.status.order.progressStep) < 5 ? {...stepBarText} : {...stepBarTextCompleted }}>
              5
              </Text>
            </View> 
          
          </View>


        <View style={{paddingTop: 5,paddingLeft:20, paddingRight: 20,flex: 1, flexDirection: 'row', justifyContent: 'space-evenly'}}>
         
          <View {...stepBar2} > 
          
            <Text style={{...stepBarText2}}>
            Waiting
            </Text>
          </View> 
          <View style={{...bar2}} />

          <View {...stepBar2} > 
           
            <Text style={{...stepBarText2}}>
            Confirmed
            </Text>
          </View> 
          <View style={{...bar2}} />



          <View {...stepBar2} > 
           
            <Text style={{...stepBarText2}}>
            Preparing
            </Text>
          </View> 
          <View style={{...bar2}} />



          <View {...stepBar2} > 
          
            <Text style={{...stepBarText2}}>
            Enroute
            </Text>
          </View> 
          <View style={{...bar2}} />



          <View {...stepBar2} > 
          
            <Text style={{...stepBarText2}}>
            Delivered
            </Text>
          </View> 
          <View style={{...bar2}} />
        </View>



          <View style={{ alignContent: 'center', alignSelf: 'center', marginTop: 50}}> 
            
            {
             props.status.order.progressStep === 'waiting' && 
              <View>
              <Text style={{ alignSelf: 'center', marginBottom: 30 , fontWeight: `${props.status.order.progressStep === 'waiting'? 'bold':'200'}`, color: `${props.status.order.progressStep === 'waiting'? 'green':'grey'}`}}>
               Waiting
              </Text>
             <Image 
              width={100}
              height={100}
              source={require('../../images/direct2.png')}
            /> 
              </View>
            
            }

            { 
              props.status.order.progressStep === 'preparing' && 
              <View>
              <Text style={{ alignSelf: 'center', marginBottom: 30 , fontWeight: `${props.status.order.progressStep === 'preparing'? 'bold':'200'}`, color: `${props.status.order.progressStep === 'preparing'? 'green':'grey'}`}}>
              Preparing
              </Text>
             <Image 
              width={100}
              height={100}
              source={require('../../images/food-and-restaurant.png')}
            /> 
              </View>
             
            }
            {

              props.status.order.progressStep === 'confirmed' && 
              <View>
              <Text style={{ alignSelf: 'center', marginBottom: 30 , fontWeight: `${props.status.order.progressStep === 'confirmed'? 'bold':'200'}`, color: `${props.status.order.progressStep === 'confirmed'? 'green':'grey'}`}}>
              Confirmed
              </Text>
             <Image 
              width={100}
              height={100}
              source={require('../../images/buildings.png')}
            /> 
              </View>
             
            }
            {
              props.status.order.progressStep === 'enroute' && 
              <View>
              <Text style={{ alignSelf: 'center', marginBottom: 30 , fontWeight: `${props.status.order.progressStep === 'enroute'? 'bold':'200'}`, color: `${props.status.order.progressStep === 'enroute'? 'green':'grey'}`}}>
             Enroute
              </Text>
             <Image 
              width={100}
              height={100}
              source={require('../../images/fast1.png')}
            /> 
              </View>
          
            }
          {
            props.status.order.progressStep === 'delivered' && 
              <View>
              <Text style={{ alignSelf: 'center', marginBottom: 30 , fontWeight: `${props.status.order.progressStep === 'delivered'? 'bold':'200'}`, color: `${props.status.order.progressStep === 'delivered'? 'green':'grey'}`}}>
              Delivered
              </Text>
             <Image 
              width={100}
              height={100}
              source={require('../../images/pizza.png')}
            /> 
              </View>
            
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

         <View style={{ padding: 35,paddingTop: 20, paddingBottom: 40, justifyContent: 'center'}}>
            <Text style={{  fontSize: 15, fontWeight :'500'}}>
              Address
            </Text>
            <Text style={{ fontWeight: '300', color: 'grey'}}>
              {props.status.order.address.street}
            </Text>
         </View>

        </View>
    
      }
      </ScrollView>
    </SafeAreaView>
  )
}

export default subscribe()(Status);
