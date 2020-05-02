

import * as actions from '../components/actions';
export default {
  
  user : {
    name: '',
    phone: '',
    email: '',
    address: '',
    password: '',
    repeatPassword: '',
    isAccepted: false,
    loadingRegister: false,

  },

  order : {
    items: [],
    userId: '',
    size: null,
    description: '',
    address:'',
    type:'',
    paymentMethod: '',
    bill: '',
  },

  item: {
    name: null,
    quantity: 1,
    price: 14.99,
    size: 2,
    description: null, 
  },

  errors: {
    error_signup: {

    }
  },
  ...actions
}
