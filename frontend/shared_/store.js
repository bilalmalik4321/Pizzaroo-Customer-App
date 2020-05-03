

import * as actions from '../components/actions';
export default {
  
  user : {
    id: '',
    name: '',
    phone: '',
    email: '',
    addresses: [],
    password: '',
    repeatPassword: '',
    isAccepted: false,
    loadingRegister: false,
    loggedIn: false,
    hasAddress: false,
    showList: true,

  },
  address : {
    tittle: '',
    uuid: '',
    apt: '',
    street: '',
    city:'',
    state: '',
    postalCode: '',
    country: '',
    lng: '',
    lat: '',
    instruction: '',
    modalVisible: false,
    newlySearch: true,
    createdAt: ''
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
