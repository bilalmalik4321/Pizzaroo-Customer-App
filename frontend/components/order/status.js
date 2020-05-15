import React, { useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  Linking,
  Dimensions
} from 'react-native';
import { subscribe } from 'react-contextual';
import { Text, Divider, Icon} from 'react-native-elements';

import firebase from '../../firebases';
import { convertDate } from '../_shared/utility';

// Status screen 
// This screen shows that status of an order
// waiting-confirmed-prepareing-enroute-delivered
// Once the status value is changed, it will update automatically

const Status = props => {

  const uuid = props.status.uuid;
  
  useEffect(()=> {
    // fetchData is listening on the order document
    // Once the value is changed, get the latest snapshot data and updat the gloabl orders
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

  },[]);

  // return the step in numeric based on progressStep
  const trackStep = step => {
    switch (step) {
      case 'waiting' : return 1;
      case 'confirmed': return 2;
      case 'preparing': return 3;
      case 'enroute': return 4;
      case 'delivered': return 5;
    }
  }
  
  // get width of the screen
  const width =  Dimensions.get('window').width;
  // calculate the step bar width dynamically
  const widthBar = (width - 35*8)/4;

  // styling for step bar and completed step bar
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
    <SafeAreaView style={{flex: 1, width: '100%'}}>
      <ScrollView style={{padding: 20, backgroundColor: 'white'}}>

      {props.status.loading && 
        <Icon
          color="grey"
          size={100}
          containerStyle={{padding: 50, alignSelf: 'center' , marginTop: '20%'}}
          name="hourglass-empty"
        />
      }

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
              <Text style={trackStep(props.status.order.progressStep) <= 3 ? {...stepBarText} : {...stepBarTextCompleted }}>
              3
              </Text>
            </View> 

            <View style={trackStep(props.status.order.progressStep) >3 ? {...barCompleted} : {...bar}} />
            <View style={ trackStep(props.status.order.progressStep) <=4 ? {...stepBar} : {...stepBarCompleted }} >         
              <Text style={trackStep(props.status.order.progressStep) <=4? {...stepBarText} : {...stepBarTextCompleted }}>
              4
              </Text>
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
            {props.status.order.progressStep === 'waiting' && 
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

            {props.status.order.progressStep === 'preparing' && 
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
            
            {props.status.order.progressStep === 'confirmed' && 
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
            {props.status.order.progressStep === 'enroute' && 
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
            {props.status.order.progressStep === 'delivered' && 
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
          
          <View style={{ paddingLeft: 35, paddingRight: 35,paddingBottom: 25,paddingTop: 80, justifyContent: 'center'}}>  
            <Text style={{  fontSize: 15, fontWeight :'500'}}>
              Items
            </Text>

            { props.status.order.numberOfItems !== 0 && Object.keys(props.status.order.items).map((typeOf, index) => {
              return props.status.order.items[typeOf].map((item, indexItem)=> {
                return (
                  <Text key={indexItem} style={{ fontWeight: '300', color: 'grey'}}>
                  {item.quantity}x {item.name}
                  </Text>
                )
              })
            })}
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
        </View>}
      </ScrollView>
    </SafeAreaView>
  )
}

export default subscribe()(Status);
