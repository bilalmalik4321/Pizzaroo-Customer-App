import * as accountActions from '../account/actions';
import * as locationActions from '../location/actions';
import * as orderActions from '../order/actions';
import * as restaurantActions from '../restaurant/actions';

/**
 * This is the global state
 */
export default {

  // ------------ user --------------- // 
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
    previousScreen: '',
    justSignedUp: false,
    verifiedEmail: false,

  },

  // ------------ order --------------- // 
  checkout:{
    instruction: '',
    payment: 'cash' || 'card',
    selected_address: false,
    address: {
    },
    store: {

    }
  },

  items: {
    pizzas: [],
    drinks: [],
    dippings: [],
    sides: [],
    desserts: []
  },

  item: {
    id: '',
    kind: '',
    name: '',
    quantity: 1,
    price: '',
    description: '',
    cal: 0,
    type: '',
    size: ''
  },

  // ------------ location --------------- // 
  address : {
    title: '',
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

  // ------------ menu --------------- // 

  pizzaOrder :{
    kind: 'pizzas',
    id: '',
    name: '',
    size: '',
    description: '',
    price: '',
    quantity: 1,
    instruction: '',
    sizeDescription: ''
  },

  pizzaMenu : {

  },


  menu : {

  },
  // ------------ status --------------- // 
  status: {
    id: '',
    loading: true
  },

  // ------------ error --------------- // 
  errors: {
    error_signup: {
    },
    error_changePassword: {

    },
    error_changeEmail: {
      
    },
    error_signin: {
      
    }
  },

  // ------------ restaurants --------------- // 

  restaurants: {
    loading: false,
    stores: []
  },

  // ------------- card ----------------- //

  card : {
    "status": {
      "cvc": "",
      "expiry": "",
      "name": "",
      "number": "",
      "postalCode": "",
    },
    "valid": false,
    "values":  {
      "cvc": "",
      "expiry": "",
      "name": "",
      "number": "",
      "postalCode": "",
      "type": "",
    },
  },

  // ------------ actions --------------- // 
  // all the update date functions for each use case
  ...accountActions,
  ...locationActions,
  ...orderActions,
  ...restaurantActions,

}
