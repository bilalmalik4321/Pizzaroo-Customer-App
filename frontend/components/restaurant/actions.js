/**
 * This makes a copy of the menu from restaurant to the menu screen
 * @param {Object} payload - payload is the selected menu by user
 *  
 */
export const copyMenu = (payload) => state => {
  let menu = {
    ...payload
  };
  return {
    menu
  };
};

/**
 * This makes a copy of Pizza menu from restaurant to the menu screen
 * @param {Object} payload 
 */
export const copyPizzaMenu = (payload) => state => {
  let pizzaMenu = {
    ...payload
  };
  return {
    pizzaMenu
  };
};

