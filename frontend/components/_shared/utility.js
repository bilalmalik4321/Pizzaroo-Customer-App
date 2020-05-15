import moment from 'moment';

/**
 * 
 * @param {String} time - Local timestamp 
 * @return {String} time - Date format e.g  May 12 2020 11:45 pm
 */
export const convertDate = (time) => moment(time,'YYYY-MM-DD hh:mm:ss a').add(1,'day').format('LLL');
