 /**
 * This updates the pizzOrder state by key value pairs or if
 * an object is passed as the first arg, the values will
 * be appended. Refer to the store for the pizza order's data.
 * @param {String || Object} key - the key in the pizza order state or the object to append
 * @param {Any} value - the value for the key if first arg is a string
 */
export const updatePizzaOrder = (key, value) => state => {
  let pizzaOrder = {};

  if (typeof key === 'object') {
    const dataToAppend = key;
    pizzaOrder = {
      ...state.pizzaOrder,
      ...dataToAppend
    };
  } else {
    pizzaOrder = {
      ...state.pizzaOrder,
      [key]: value
    };
  }

  return {
    pizzaOrder
  };
};

/**
 * This clear all the value of the pizza order
 * @param {null} - no param
 * @return {object} - pizzaOrder object in the store
 */
export const clearPizzaOrder = () => state => {
  return {
    pizzaOrder: {
      name: '',
      size: '',
      description: '',
      price: '',
      quantity: 1,
      instruction: '',
    }
  }
}
/**
 * Items contains all the item that user has added into the chart
 * This updates the items state by key value pairs or if
 * an object is passed as the first arg, the values will
 * be appended. Refer to the store for the items's data.
 * @param {String || Object} key - the key in the items state or the object to append
 * @param {Any} value - the value for the key if first arg is a string
 */
export const updateItems = (key, value ) => state => {
  let items= {};

  if (typeof key === 'object') {
    const dataToAppend = key;
    items= {
      ...state.items,
      ...dataToAppend
    };
  } else {
    items = {
      ...state.items,
      [key]: value
    };
  }

  return {
    items
  };
};

/**
 * This resets the items list in store.
 */
export const clearItems = () => state =>{
  return {
    items: {
      pizzas: [],
      drinks: [],
      dipping: [],
      sides: [],
      desserts: []
    }
  }
}

/**
 * This updates an item such as side dishes, drinks, desserts...
 * @param {String || Object} key - the key is the name of the field
 * @param {Any} value  - the value is the price, or description of the attributes of the item
 */
export const updateItem = (key, value ) => state => {
  let item= {};

  if (typeof key === 'object') {
    const dataToAppend = key;
    item= {
      ...state.item,
      ...dataToAppend
    };
  } else {
    item = {
      ...state.item,
      [key]: value
    };
  }

  return {
    item
  };
};

/**
 * This resets the item list in store.
 */
export const clearItem = () => state => {
  return {    
    item: {
      kind: '',
      name: '',
      quantity: 1,
      price: '',
      description: '',
      cal: 0,
      type: '',
    }
  };
};

// ------------ checkout -------------//
/**
 * 
 * @param {String || Object} key - key is the attributes in the checkout 
 * @param {Any} value - new value is the key for the string 'field'
 */
export const updateCheckout = (key, value ) => state => {
  let checkout= {};

  if (typeof key === 'object') {
    const dataToAppend = key;
    checkout= {
      ...state.checkout,
      ...dataToAppend
    };
  } else {
    checkout = {
      ...state.checkout,
      [key]: value
    };
  }

  return {
    checkout
  };
};
