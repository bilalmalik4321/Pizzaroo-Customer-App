 /**
 * updateAddress is used for temporary address to edit or add a new address
 * This updates the address state by key value pairs or if
 * an object is passed as the first arg, the values will
 * be appended. Refer to the store for the address's data.
 * @param {String || Object} key - the key in the user state or the object to append
 * @param {Any} value - the value for the key if first arg is a string
 */

export const updateAddress = (key, value) => state => {
  let address = {};

  if (typeof key === 'object') {
    const dataToAppend = key;
    address = {
      ...state.address,
      ...dataToAppend
    };
  } else {
    address = {
      ...state.address,
      [key]: value
    };
  }

  return {
    address
  };
};

