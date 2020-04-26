

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

  },

  bill: {
    
  },

  errors: {
    error_signup: {

    }
  },
  ...actions
}
