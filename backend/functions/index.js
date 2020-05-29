require("dotenv").config();
const functions = require('firebase-functions');
const admin = require('firebase-admin');

const queryString = require('query-string');
const axios = require('axios');
// production until the hard launch we use test keys, same as development
// stripe.sk
// stripe.pk
// stripe.client_id
// development stripe test mode api keys
// stripe.test_sk
// stripe.test_pk
// stripe.test_client_id
const stripe_test_sk = functions.config().stripe.test_sk;
const stripe_test_pk = functions.config().stripe.test_pk;
const stripe_test_client_id = functions.config().stripe.test_client_id;
const stripe_sk = functions.config().stripe.sk;
const stripe_ok = functions.config().stripe.pk;
const stripe_client_id = functions.config().stripe.client_id;
const firebaseConfig = process.env.FIREBASE_CONFIG;
const adminConfig = JSON.parse(firebaseConfig);

const isDevelopment = adminConfig.projectId.includes('staging')
const stripe = require('stripe')( isDevelopment ? stripe_test_sk : stripe_sk);
// console.log("env--------",stripe_test_sk);
// console.log("env--------",stripe_test_pk);
// console.log("env--------",stripe_client_id);
// set up firebase admin config

const environment = isDevelopment ? 'development' : 'production';
const serviceAccount = require(`./serviceAccount.${environment}.json`);
if(!admin.apps.length)
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: isDevelopment ? "https://pizzaro-staging.firebaseio.com" : "https://pizzaroo-34b58.firebaseio.com"
  });


exports.createPaymentIntent = functions.https
  .onRequest( async (req, res) => {
    // Allow all origins
    res.set("Access-Control-Allow-Origin", "*");
    
    // This is a preflight request, and needs to be handled correctly.
    if (req.method === 'OPTIONS') {

      // Allowed methods for request
      res.set("Access-Control-Allow-Methods", "POST");

      // Allowed headers in preflight request.
      res.set("Access-Control-Allow-Headers", "Content-Type,Authorization");

      // Set max age
      res.set("Access-Control-Max-Age", "3600");

      // Return a status early for preflight.
      return res.status(204).send('');
    }

    try {
     
      const data = req.body;
      // console.log("data\n\n", data);
      const { customerEmail, connectedAccount, amount, token} = data;
      const result = await stripe.paymentIntents.create({
        confirm: true,
        amount: amount * 100,
        currency: 'cad',
        payment_method_types: ['card'],
        payment_method_data: {
          type: 'card',
          card: {
            token
          }
          
        },
        receipt_email: customerEmail,
        transfer_data: {
          destination: connectedAccount
        }

      })
      
      return res.status(200).send({
        result
      });
  
    } catch( err) {
      console.log("errror",err);
      return res.status(400).send({
        error: err
      })
    }

  });

exports.getAuthLink = functions.https.onRequest( async( req, res) => {
  res.set("Access-Control-Allow-Origin", "*");

  // This is a preflight request, and needs to be handled correctly.
  if (req.method === 'OPTIONS') {

    // Allowed methods for request
    res.set("Access-Control-Allow-Methods", "POST");

    // Allowed headers in preflight request.
    res.set("Access-Control-Allow-Headers", "Content-Type,Authorization");
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
    // Set max age
    res.set("Access-Control-Max-Age", "3600");

    // Return a status early for preflight.
    return res.status(204).send('');
  }

    try {
      const  data  = req.body;
      const { customToken , redirect_uri } = data;
      
      console.log(" get auth link", req.body);
    
      const args = {
        state: customToken,
        client_id: stripe_test_client_id,
        response_type: 'code',
        redirect_uri: redirect_uri.toString()
  
      }
      const qs = queryString.stringify(args);
      console.log("redirect",);
      // const url = `https://dashboard.stripe.com/express/oauth/authorize?${args.toString()}`;
      // const testMode = `https://dashboard.stripe.com/oauth/authorize?response_type=code&client_id=ca_HKSErf5hYOZiXLPdHqxfpJ2ytCbBuqT1`
  
      const url = `https://connect.stripe.com/express/oauth/authorize?${qs}`;
      return res.status(200).send({url});
    } catch (err) {
      console.log("errr get auth link", err)
      return res.status(400).send({ error: 'could redirect to stripe.... error !!!'})
    }
    
   
})

exports.confirmAuth = functions.https.onRequest( async( req, res) => {
  res.set("Access-Control-Allow-Origin", "*");

  // This is a preflight request, and needs to be handled correctly.
  if (req.method === 'OPTIONS') {

    // Allowed methods for request
    res.set("Access-Control-Allow-Methods", "POST");

    // Allowed headers in preflight request.
    // res.set("Access-Control-Allow-Headers", "Content-Type,Authorization");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");

    // Set max age
    res.set("Access-Control-Max-Age", "3600");

    // Return a status early for preflight.
    return res.status(204).send('');
  }


    const { code, state } = req.body;
    // console.log(" get auth link", req);
    try{

    const userInfo = await admin.auth().verifyIdToken(state)
   
    const response = await stripe.oauth.token({
      client_secret: stripe_test_client_id,
      grant_type: 'authorization_code',
      code
    })
  
    return res.status(200).send({
      isConnected: true,
      uid: userInfo.uid,
      response
    })
    
    } catch (error ) {
      return res.status(400).send({
        isConnected: false,
        error: 'Invalid authorization code or state'
      })
    }
   
})

exports.geoCodeAutoComplete = functions.https.onRequest( async( req, res) => {
  res.set("Access-Control-Allow-Origin", "*");

  // This is a preflight request, and needs to be handled correctly.
  if (req.method === 'OPTIONS') {

    // Allowed methods for request
    res.set("Access-Control-Allow-Methods", "POST");

    // Allowed headers in preflight request.
    // res.set("Access-Control-Allow-Headers", "Content-Type,Authorization");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");

    // Set max age
    res.set("Access-Control-Max-Age", "3600");

    // Return a status early for preflight.
    return res.status(204).send('');
  }
    const {
      query, 
      language, 
      queryFields, 
      buildLocationQuery, 
      buildCountryQuery, 
      buildTypesQuery,
      buildSessionQuery
    } = req.body;
  
    try {
      const { data } = await axios.get(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${
        query
      }&key=${functions.config().google.geo_apikey}&inputtype=textquery&language=${
        language
      }&fields=${
        queryFields
      }${buildLocationQuery}${buildCountryQuery}${buildTypesQuery}${buildSessionQuery}`
      )
      
    return res.status(200).send({...data});
    } catch (error) {
      return res.status(400).send({error: 'failed to search address'})
    }
})

exports.geoCodeSearchDetail = functions.https.onRequest( async( req, res) => {
  res.set("Access-Control-Allow-Origin", "*");

  // This is a preflight request, and needs to be handled correctly.
  if (req.method === 'OPTIONS') {

    // Allowed methods for request
    res.set("Access-Control-Allow-Methods", "POST");

    // Allowed headers in preflight request.
    // res.set("Access-Control-Allow-Headers", "Content-Type,Authorization");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");

    // Set max age
    res.set("Access-Control-Max-Age", "3600");

    // Return a status early for preflight.
    return res.status(204).send('');
  }
    const {
      id,
      language, 
      queryFields, 
      buildSessionQuery
    } = req.body;
   
    try {

      const {data} = await axios.get(
        `https://maps.googleapis.com/maps/api/place/details/json?placeid=${id}&key=${functions.config().google.geo_apikey}&fields=${queryFields}&language=${language}${buildSessionQuery}`
      )

      return res.status(200).send({...data});

    } catch (error) {
      return res.status(400).send({error: 'failed to search address'})
    }
})
