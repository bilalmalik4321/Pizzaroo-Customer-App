import { getOrders, getOrder } from '../api'; 
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
      dippings: [],
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


/**
 * This gets all orders from database
 * 
 */

export const getCustomerOrders = () => async (state) => {
  try {
  // console.log("cannot find user-----", state.user)
  state.setState({
    user: {
      ...state.user,
      loading: true
    }
  });
	// console.log("cannot find user", state.user)
  await getOrders(
    async (active, completed) => {
      state.setState({
        user: {
          ...state.user,
          active,
          completed,
          loading: false
        }
      })
    }
  )} catch (err) {
    console.log("***", err)
  }
}

// ------------ status -------------//
/**
 * 
 * @param {String || Object} key - key is the attributes in the checkout 
 * @param {Any} value - new value is the key for the string 'field'
 */
export const updateStatus = (key, value ) => state => {
  let status= {};

  if (typeof key === 'object') {
    const dataToAppend = key;
    status= {
      ...state.status,
      ...dataToAppend
    };
  } else {
    status = {
      ...state.status,
      [key]: value
    };
  }

  return {
    status
  };
};

/**
 * This functions retrieve order from the firestore 
 **/
export const getCustomerOrder = () => async state => {
  try {
    console.log("get Customer one order");

    state.setState({
      status: {
        ...state.status,
        loading: true
      }
    })
  
    const order = await getOrder(state.status.id);
  
    state.setState({
      status: {
        ...state.status,
        order,
        loading: false
      }
    })

  } catch (err) {
    console.log("error", err);
  }

}

export const updateCard = (key, value) => state => {
  let card = {};

  if (typeof key === 'object') {
    const dataToAppend = key;
    card = {
      ...state.card,
      ...dataToAppend
    };
  } else {
    card = {
      ...state.card,
      [key]: value
    };
  }

  return {
    card
  };
};
