require("dotenv").config();
const functions = require('firebase-functions');
const admin = require('firebase-admin');

const stripe = require('stripe')(process.env.STRIPE_SK);
const queryString = require('query-string');

const serviceAccount = require('./HelloTHere.json');
if(!admin.apps.length)
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://pizzaro-staging.firebaseio.com"

  });


exports.createPaymentIntent = functions.https
  .onRequest( async (req, res) => {
    // Allow all origins
    res.set("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
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
            token: 'tok_visa'
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
      const { customToken } = data;
      
      console.log(" get auth link", req.body);
    
      const args = {
        state: customToken,
        client_id: process.env.STRIPE_CLIENT_ID,
        response_type: 'code',
  
      }
      const qs = queryString.stringify(args);
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
