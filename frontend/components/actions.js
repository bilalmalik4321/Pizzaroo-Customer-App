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


export const updateOrder = (key, value) => state => {
  let order = {};

  if (typeof key === 'object') {
    const dataToAppend = key;
    order = {
      ...state.order,
      ...dataToAppend
    };
  } else {
    order = {
      ...state.order,
      [key]: value
    };
  }

  return {
   order
  };
};

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



//============ Menu ===============//

// copyMenu into global state menu variable

export const copyMenu = (payload) => state => {
  let menu = {
    ...payload
  };
  return {
    menu
  };
};

// copyMenu into global state menu variable

export const copyPizzaMenu = (payload) => state => {
  let pizzaMenu = {
    ...payload
  };
  return {
    pizzaMenu
  };
};

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


// ------------ google search places -------------//
export const updateSearch = (key, value ) => state => {
  let search= {};

  if (typeof key === 'object') {
    const dataToAppend = key;
    search= {
      ...state.search,
      ...dataToAppend
    };
  } else {
    search = {
      ...state.search,
      [key]: value
    };
  }

  return {
    search
  };
};
