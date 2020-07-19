import firebase from '../../firebase';
import moment from 'moment';
import axios from 'axios';

const db = firebase.firestore();
// timestamp
export const timestamp = moment().format('YYYY MM DD hh:mm:ss:SS:SSS a');

/**
 * createUser - register user with firebase auth and save the user info in the database
 * @param {object} - users information 
 * @return {bolean} true/false
 */
export const createUser = async payload => {
  try {
    
    // sign up user with firebase auth
    const signedUpUser = await firebase.auth()
      .createUserWithEmailAndPassword(
        payload.email,
        payload.password
      );
		
		// send verification email
		signedUpUser.user.sendEmailVerification();

    // delete password to secure
    const userInfo = payload;
    delete userInfo.password;

    // user is created in auth but not in the collection
		await db
			.collection('customers')
			.doc(signedUpUser.user.uid)
			.set({
				...userInfo
			},{merge: true});

		// return true after success
		return {
			result: true,
			error: ''
		}
    
  } catch (error) {
		console.log('create user fails',error.message);
		return {
			result: false,
			error: error.message
		}
  }
};

/**
 * edit addresses of the user by updating the user doc
 * @param {addresses} addresses - addresses input from the location screen
 */

export const editAddresses = async (addresses) => {
	try  {
		const user = firebase.auth().currentUser;
		// console.log("fire", user);
		const res = await  db
		.collection('customers')
		.doc(user.uid)
		.set({
			addresses
		}, 
		{merge: true}
		);

	} catch (err) {
		console.log("Error edit addresses", err)
		return {
			error: err.message
		}
	}
}

/**
 * getUser - return user info from the database
 * @param {string} uid - the user id
 * @return {object} the user details
 */

export const getUser = async uid => {
	try {
		let id = uid;
		const userInfo = firebase.auth().currentUser;
		if(!id)
			id = userInfo.uid;
		// console.log("fire", user);
		// get user ref
		const user = await db
			.collection('customers')
			.doc(id)
			.get();
		// console.log("return from user collecion", user.data());
		return {
			...user.data(),
			id: uid
		};

	} catch (error) {
		console.log('getUser failed',error);
	}
};

/**
 * Generate the unique id 
 * @return {String} uuid - return the unqiue string id
 */
export const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * Create an order for the user
 * @param {Object} payload - orders info and the status of the order
 */
export const createOrder = async (payload) => {
	try {	
		const userInfo = firebase.auth().currentUser;
		const { uid } = userInfo;
		return await db
			.collection('orders')
			.add({
				uuid: uuidv4(),
				customerId: uid,
				createdAt: timestamp,
				updatedAt: timestamp,
				status: 'open',
				progressStep: 'waiting',
				...payload
			});
	} catch (error) {
		console.log('createOrder failed', error);
	}
}

/**
 * get an order from the firestore
 * @param {String} orderId - the order id passed to get the order details
 */

export const getOrder = async (orderId) => {
	try{

		const order = await db
			.collection('orders')
			.doc(orderId)
			.get();

		return order.data();
	} catch (error ){
		console.log("error getOrder", error);
	}
}
/**
 * get all the orders and separate them by the status
 * @param {functions} callback - update orders function to update the global store of the order
 */
export const getOrders = async (callback) => {
	try {

		const userInfo = firebase.auth().currentUser;
		const { uid } = userInfo;

		return await db
			.collection('orders')
			.where('customerId', '==', uid)
			.onSnapshot( snapshot => {
				const active = [];
				const completed = [];
			  const orderDate = (time) => moment(time,'YYYY-MM-DD').format('L');
				const today = moment().format('MM/DD/YYYY');
				
				/**
				 * find the diff of minutes between 2 dats
				 * @param {Date} date - date of updatedAt of an order
				 */
				const getMinutesDiff = (date) => {
					const rightNow = moment();
					const check = moment(date,'YYYY MM DD hh:mm a');
					return rightNow.diff(check,'minutes');
				}
		
				// if the progressStep is enroute and the updatedAt has been 20mn 
				// then close the order
				snapshot.forEach( async doc => {
					if (getMinutesDiff(doc.data().updatedAt) >= 20 && doc.data().progressStep === 'enroute') {
						try {
							await db.doc(`orders/${doc.id}`).update({
								progressStep: 'delivered',
								status: 'closed',
								updatedAt: timestamp
							});
						} catch( err) {
							console.log("err update progressStep", err);
						}
					}
				});
			
				// filter to find the open and today's orders
				snapshot.forEach( doc => (
					doc.data().status === 'open' && today === orderDate(doc.data().createdAt) && active.push({
						id: doc.id,
						...doc.data()
					})
				))

				// filter to find the closed orders
				snapshot.forEach( doc => (
					(doc.data().status === 'closed' || doc.data().status === 'cancelled')&&completed.push({
						id: doc.id,
						...doc.data()
					})
				))
		
				// apply call back
				// this will update the order in the global state
				callback(active, completed);

			});
	} catch (error) {
		console.log("getOrders error", error);
	}
}

/**
 * Update the order based on the editting 
 * @param {Object} payload - order info
 * @param {String} orderId - order id
 * @param {String} status - order status
 */
export const updateOrder = async (payload, orderId, status) => {
	try {	
	
		return await db
			.doc(`orders/${orderId}`)
			.set({
				...payload,
				progressStep: status,
				updatedAt: timestamp,
			}, {
				merge: true
			});

	} catch (error) {
		console.log('createOrder failed', error);
	}
}

/**
 * Get all the restaurants to display menus
 * @param {function} updateRestaurant - callback funtion to update the global store
 */
export const getRestaurants = async (updateRestaurant) => {
	try {
		return  await db
			.collection('stores')
			.where('isConnectedWithStripe', '==', true)
			.get()
			.then( snapshot => {
				const withinRange = [];
		
				snapshot.forEach( doc => (
					doc.stripe_connected_account_id !== '' && withinRange.push({
						storeId: doc.id,
						...doc.data()
					})
				));

				// apply the callback to update the store data
				updateRestaurant(withinRange)
			});

	} catch (error) {
		console.log("error getting the restaurant", error);
	}
}

/**
 * call cloud functions template for all the function
 * check the production/localhost/development and use the url respectively
 * @param {*} funcName - name the function
 * @param {*} params - param as the payload in the body of the request
 */

export const callCloudFunctions = async (funcName, params = {} ) => {
	try {

		const isDevelopment = __DEV__ ;
		isDevelopment = true;
		// ---------- if run emulators function add the url here -----------// 
		const localhostEmulator = `http://localhost:5001/pizzaro-staging/us-central1/${funcName}`
	
		console.log("localhost params", localhostEmulator)
		const url = `https://us-central1-${isDevelopment? 'pizzaro-staging' : 'pizzaroo-34b58'}.cloudfunctions.net/${funcName}`
		const hi = `https://us-central1-pizzaro-staging.cloudfunctions.net/createPaymentIntent`;
		const host = `http://localhost:5001/pizzaro-staging/us-central1/createPaymentIntent`
		// doing firebase end point ==> use localhostEmulator
		const res = await axios.post(url, { ...params });
		
		console.log('res', params)
		if(res.status !== 200)
			return false;
		if(!res.data)
			return false;

		return res.data;

	} catch (err) {
		console.log("error get address", err);
		return false;
	}
}
