import firebase from '../../firebase';
import moment from 'moment';
import { convertDate } from '../_shared/utility';
import axios from 'axios';
// access the database

// const { firebase , firestore } = all;
// console.log("aall", all);
const db = firebase.firestore();
// timestamp
export const timestamp = moment().format('YYYY-MM-DD hh:mm:ss:SS:SSS a');

/**
 * firebase database is like json file using key-value pair 
 * each entitiy is called a collection
 * each row is called a document
 * in a document can contain many fields i.e primitive type, and object
 * 
 * How to do query for firebase:
 * @ Retrieve a document
 * option1: firebase.database().collection('users).doc('uid-123').get();
 * option2: firebase.database().doc(`users/${uid-123}`).get();
 * Explaination: to retrieve a document: we have specify path in the query
 * path: '/users/uid-123', option 1 is using finding 'users' collection first and then 
 * find the 'uid-123' unlike option 2 is using the '/users/uid-123' right away
 */
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
		
		signedUpUser.user.sendEmailVerification();
		// console.log("user sign up", signedUpUser)
    // send verification email TODO
    // signedUpUser.user.sendEmailVerification();

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

export const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}


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


export const getOrder = async (orderId) => {
	try{

		// console.log("getOrderwork?*******", orderId);
		const order = await db
			.collection('orders')
			.doc(orderId)
			.get();
		// console.log("order by id", order.data())
		return order.data();
	} catch (error ){
		console.log("error getOrder", error);
	}
}

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
				

				const getMinutesDiff = (date) => {
				
					const orderDate = (time) => moment(time,'YYYY-MM-DD HH:mm:ss a').format('LLL');
					const rightNow = orderDate(timestamp);
					const check = orderDate(date)
			
					return moment(rightNow).diff(check,'minutes');
			
				}
		
				snapshot.forEach( async doc => {
					
					if (getMinutesDiff(doc.data().updatedAt >= 20 && doc.data().progessStep === 'enroute')) {
						await firebase.firebase().doc(`orders/${doc.uid}`).update({
							progessStep: 'delivered',
							status: 'closed',
							updatedAt: timestamp
						})
					}
					
				})
			
				// console.log("today", today)
				snapshot.forEach( doc => (
					doc.data().status === 'open' && today === orderDate(doc.data().createdAt) && active.push({
						id: doc.id,
						...doc.data()
					})
				))
				snapshot.forEach( doc => (
					(doc.data().status === 'closed' || doc.data().status === 'cancelled')&&completed.push({
						id: doc.id,
						...doc.data()
					})
				))

			callback(active, completed);

			})

	} catch (error) {
		console.log("getOrders error", error);
	}
}

export const onListenOnOrder = async (uuid) => {
	try {
		console.log("does it run?")
		
		let observer = await db.collection('orders').where('uuid', '==', uuid)
		.onSnapshot(querySnapshot => {
			querySnapshot.docChanges().forEach(change => {
			
				if (change.type === 'modified') {
					console.log('*** changed---- ', change.doc.data());
					return true;
				}
			});
		});
		 
	} catch (err) {
		console.log("error onListenOnOrder",err);
	}
}
export const updateOrder = async (payload, orderId, status) => {
	try {	
		const userInfo = firebase.auth().currentUser;
		const { uid } = userInfo;
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


export const getRestaurants = async (updateRestaurant) => {
	try {
		return  await db
			.collection('stores')
			.where('isConnectedWithStripe', '==', true)
			.get()
			.then( snapshot => {
				const withinRange = [];
				// console.log("hello")
				snapshot.forEach( doc => (
					doc.stripe_connected_account_id !== '' && withinRange.push({
						storeId: doc.id,
						...doc.data()
					})

				))

				// console.log("data ---",withinRange)
				updateRestaurant(withinRange)
			})
	} catch (error) {
		
	}
}


export const createPaymentIntent = async ( params = {}) => {

	try {
		const res = await axios.post(`https://us-central1-pizzaro-staging.cloudfunctions.net/createPaymentIntent`,{ ...params });

		if(res.status !== 200)
			return false;
		if(!res.data)
			return false;

		return res.data;

	} catch (err) {
		console.log("error creating a payment", err);
		return false;
	
	}

}


export const callCloudFunctions = async (funcName, params = {} ) => {
	try {
		const isDevelopment = __DEV__ ;

		// ---------- if run emulators function add the url here -----------// 
		const localhostEmulator = `http://localhost:5001/pizzaro-staging/us-central1/${funcName}`
	
		console.log("localhost params", params)
		const url = `https://us-central1-${isDevelopment? 'pizzaro-staging' : 'pizzaroo-34b58'}.cloudfunctions.net/${funcName}`

		// doing firebase end point ==> use localhostEmulator
		const res = await axios.post(localhostEmulator, { ...params });
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
