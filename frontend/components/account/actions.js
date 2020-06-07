 /**
 * This updates the user state by key value pairs or if
 * an object is passed as the first arg, the values will
 * be appended. Refer to the store for the user's data.
 * @param {String || Object} key - the key in the user state or the object to append
 * @param {Any} value - the value for the key if first arg is a string
 */
export const updateUser = (key, value) => state => {
  let user = {};

  if (typeof key === 'object') {
    const dataToAppend = key;
    user = {
      ...state.user,
      ...dataToAppend
    };
  } else {
    user = {
      ...state.user,
      [key]: value
    };
  }

  return {
    user
  };
};

/**
 * Clear user store and reset the value to the default state
 */
export const clearUser = () => state => {
  return {
    user: {
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
      justSignedUp: false
    }
   }
}

/**
 * This updates the error in store.
 * @param {String || Object} key - key is string for the attribute or the object
 * @param {String} value - value is error message
 */

export const updateError = (key, value) => state => {
  let errors = {};

  if (typeof key === 'object') {
    const dataToAppend = key;
    errors = {
      ...state.errors,
      ...dataToAppend
    };
  } else {
    errors = {
      ...state.errors,
      [key]: value
    };
  }

  return {
    errors
  };
};
