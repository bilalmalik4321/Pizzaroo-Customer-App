import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  Linking
} from 'react-native';
import { subscribe } from 'react-contextual';
import { Text, Divider , Button} from 'react-native-elements';
import StepIndicator from 'react-native-step-indicator';
import { Modal } from 'react-native-paper';
import SvgUri from 'react-native-svg-uri';
 
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
  
  const [step, setStep] =useState(0);

  return (
    <SafeAreaView style={{   
      flex: 1,
      width: '100%'
      }}>
      <ScrollView style={{padding: 20, backgroundColor: 'white'}}>
        <View style={{ padding: 35, justifyContent: 'center'}}>
          <Text style={{  fontSize: 15, fontWeight :'bold'}}>
            Order ID: 123-12-123
          </Text>
          <Text style={{ fontSize: 15, fontWeight :'bold',color: 'grey'}}>
            Date: May 10 2020
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            
            <Text style={{ fontSize:15, fontWeight: 'bold', color: 'grey'}}>
              Tenko Sushi
            </Text>
            <TouchableOpacity
              onPress={()=> Linking.openURL(`tel:${2262808363}`) }
            >
              <Text style={{ fontSize: 15 , fontWeight: 'bold', color: 'green' , alignItems: 'center'}}>
                Contact
              </Text>
            </TouchableOpacity>
 
          </View> 
        </View>
        
            <StepIndicator
              stepCount={4}
              customStyles={customStyles}
              currentPosition={step}
              labels={labels}
            />
          <View style={{ paddingTop: 100, paddingBotom: 100, justifyContent: 'center'}}>
              <SvgUri
                style={{alignSelf: 'center'}}
                width="100"
                height="100"
                source={require('../../images/direct.svg')}
              />
            </View>  

          {/* <View style={{paddingLeft: 35, paddingRight:25, paddingTop: 80}}>
                  <Divider/>
          </View> */}
          <View style={{ paddingLeft: 35, paddingRight: 35,paddingBottom: 25,paddingTop: 80, justifyContent: 'center'}}>
            <Text style={{  fontSize: 15, fontWeight :'bold'}}>
              Items
            </Text>
            <Text style={{ fontWeight: '300', color: 'grey'}}>
              2x Pizza Pepporoi
            </Text>
            <Text style={{ fontWeight: '300', color: 'grey'}}>
              2x 10 pcs. Chicken Wings
            </Text>
            <Text style={{ fontWeight: '300', color: 'grey'}}>
              2x Diet Coke
            </Text>
            <Text style={{ fontWeight: '300', color: 'grey'}}>
              2x Sweet and chilly chicken 
            </Text>
         </View> 
         <View style={{paddingLeft: 35, paddingRight:25}}>
                  <Divider/>
          </View>
         <View style={{ padding: 35,paddingTop: 20, justifyContent: 'center'}}>
            <Text style={{  fontSize: 15, fontWeight :'bold'}}>
              Address
            </Text>
            <Text style={{ fontWeight: '300', color: 'grey'}}>
              2x Pizza Pepporoi
            </Text>
         </View> 
         {/* <View style={{ paddingTop: 100, paddingBotom: 100, justifyContent: 'center'}}>
            <SvgUri
              style={{alignSelf: 'center'}}
              width="100"
              height="100"
              source={require('../../images/noodles.svg')}
            />
          </View>  
          <View style={{ paddingTop: 100, paddingBotom: 100, justifyContent: 'center'}}>
            <SvgUri
              style={{alignSelf: 'center'}}
              width="100"
              height="100"
              source={require('../../images/delivery-truck.svg')}
            />
          </View>  */}
  
    
      </ScrollView>
        

    </SafeAreaView>
  
  )
}

export default subscribe()(Status);
