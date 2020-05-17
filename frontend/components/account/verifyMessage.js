import React from 'react';
import { View , Text, Image} from 'react-native';

import styles from '../style'
const Message = () => {

  return (
  <View style={styles.containerView} behavior="padding">
    <View style={{...styles.loginScreenContainer}}>
      <View style={{...styles.loginFormView, marginTop: -50}}> 
        <Image
          width="100"
          height="100"
          source={require('../../images/pizza.png')}
        />
        <Text style={styles.logoText}>Pizzaro</Text>         
        <View style={{ flexDirection: 'row', justifyContent: 'center', paddingTop: 10, marginBottom: 10}}>
         <Text style={{textAlign:'center', fontSize: 25, color: 'green', fontWeight: '300'}}>{"The verifcation link has been sent your email."}</Text>
        </View>
      </View>
    </View> 
  </View>
  );
}

export default Message;
