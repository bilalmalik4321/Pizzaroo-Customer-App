import moment from 'moment';

/**
 * Convert format of the date
 * @param {String} time - Local timestamp 
 * @return {String} time - Date format e.g  May 12 2020 11:45 pm
 */
export const convertDate = (time) => moment(time,'YYYY-MM-DD hh:mm:ss a').add(1,'day').format('LLL');

/**
 * Count the total price of an order
 * @param {Object} items - object contains orders of each kind of food
 * @return {Number} count - total price of the order
 */

export const total = (items) => {
  
  let count = 0;
  Object.keys(items).map((type) => {
    items[type].map((element) => {
      count = count + (element.quantity * element.price);
    })
  });

  return count;
}

/**
 * Count the total number of item in an ordeer
 * @param {Object} - items - object contains orders of each kind of food
 * @return {Number} - total items in an order
 */

export function findNumberOfOrder(items) {
  
  let count = 0;
  Object.keys(items).map((type) => {
      count = count + type.length;
  });

  return count;
}
