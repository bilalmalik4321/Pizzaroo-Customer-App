import moment from 'moment';

/**
 * Convert format of the date
 * @param {String} time - Local timestamp 
 * @return {String} time - Date format e.g  May 12 2020 11:45 pm
 */
export const convertDate = (time) => moment(time,'YYYY-MM-DD hh:mm:ss a').format('LLL');

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
  Object.keys(items).map((type,index) => {
      count = count + items[type].length;
  });

  return count;
}
export function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}


export const isPostalCode = (code) => {
  console.log("code", code);
  const reg = new RegExp(/^[ABCEGHJ-NPRSTVXY][0-9][ABCEGHJ-NPRSTV-Z] [0-9][ABCEGHJ-NPRSTV-Z][0-9]$/);
  return reg.test(code.toString());
}
