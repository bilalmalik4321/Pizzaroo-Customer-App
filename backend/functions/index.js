require("dotenv").config();
const functions = require('firebase-functions');
const admin = require('firebase-admin');

const stripe = require('stripe')(process.env.STRIPE_SK);
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

exports.getSessionToken = functions.https
  .onRequest( async( req, res) => {
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
    
    const { uid } = req.body;
   
    await admin.auth().createCustomToken(uid)
    .then(function(customToken) {
      return res.status(200).send({
        customToken
      })
    })
    .catch(function(error) {
      console.log('Error creating custom token:', error);
      return res.status(400).send({
        error: error.message
      })
    });
  
    
  });

exports.verifyTokenId = functions.https
  .onRequest( async (req,res) => {
   
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

    const { customToken }  = req.body;
  
    await admin.auth().verifyIdToken(customToken)
      .then( decodedToken => {
        let uid = decodedToken.uid;
        // console.log("success", decodedToken)
        return res.status(200).send({
          isMatched: true,
          uid
        })
      })
      .catch( error => {
        // console.log("failed to verify?". error)
        return res.status(400).send({
          isMatched: false,
          error
        })
      })
  })

exports.getAuthLink = functions.https.onRequest( async( req, res) => {
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


    const { customToken } = req.body;
    // console.log(" get auth link", req);
  
    const args = new URLSearchParams({
      state: customToken,
      client_id: process.env.STRIPE_CLIENT_ID,
      scope: "read_write",
      response_type: 'code',

    })
    const url = `https://dashboard.stripe.com/express/oauth/authorize?${args.toString()}`;
    const testMode = `https://dashboard.stripe.com/oauth/authorize?response_type=code&client_id=ca_HKSErf5hYOZiXLPdHqxfpJ2ytCbBuqT1`
    // const url = `https://connect.stripe.com/oauth/authorize?${args.toString()}`;
    return res.status(200).send({url});
   
})

exports.confirmAuth = functions.https.onRequest( async( req, res) => {
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


    const { customToken } = req.body;
    // console.log(" get auth link", req);
  
    await admin.auth().verifyIdToken(customToken)
    .then( async decodedToken => {
      let uid = decodedToken.uid;

      stripe.oauth.token({
        grant_type: 'authorization_code',
        code
      }).then(
        async(response) => {
          var connected_account_id = response.stripe_user_id;
          
          await admin.firestore().doc(`stores/${uid}`).set({ stripe_connected_account_id: connected_account_id }, {merge: true});
    
          return res.status(200).send({response})
        },
        (err) => {
          if (err.type === 'StripeInvalidGrantError') {
            return res.status(400).json({error: 'Invalid authorization code: ' + code});
          } else {
            return res.status(500).json({error: 'An unknown error occurred.'});
          }
        }
      );
    

      return res.status(200).send({
        isMatched: true,
        uid
      })
    })
    .catch( error => {
      // console.log("failed to verify?". error)
      return res.status(400).send({
        isMatched: false,
        error
      })
    })
})

// exports.authorizeOauth = functions.https.onRequest( async( req, res) => {

//   res.set("Access-Control-Allow-Origin", "*");

//   // This is a preflight request, and needs to be handled correctly.
//   if (req.method === 'OPTIONS') {

//     // Allowed methods for request
//     res.set("Access-Control-Allow-Methods", "POST");

//     // Allowed headers in preflight request.
//     res.set("Access-Control-Allow-Headers", "Content-Type,Authorization");

//     // Set max age
//     res.set("Access-Control-Max-Age", "3600");

//     // Return a status early for preflight.
//     return res.status(204).send('');
//   }

//   const { code, state } = req.body;
 
//   await admin.auth().verifyIdToken(state)
//     .then( async decodedToken => {
//       let uid = decodedToken.uid;

//       console.log("verify ?", uid)
//       const result =  await stripe.oauth.token({
//           grant_type: 'authorization_code',
//           code
//       })
      
//       console.log("result", result)
      
      
//       // .then( 
//       //  async (response) => {
//       //   var connected_account_id = response.stripe_user_id;
//       //   console.log(" auth the link", response);
//       //   try {

//       //   await admin.firestore().collection('stores').doc(uid).set({ stripe_connected_account_id: connected_account_id}, { merge: true});

//       //   return res.status(200).send({
//       //     isConnected: true,
//       //     response
//       //   })

//       //  } catch( error ) {
//       //   return res.status(403).send({
//       //     error: 'failed to save the connected account ',
//       //     isConnected: false
//       //   })
//       //  }

//       //  },
//       //  async(err) => {
//       //   if (err.type === 'StripeInvalidGrantError') {
//       //     return res.status(400).send({error: 'Invalid authorization code: ' + code,  isConnected: false});
//       //   } else {
//       //     return res.status(500).end({error: 'An unknown error occurred.', isConnected: false});
//       //   }
//       // })
     
//     }).catch( error => {
//       return res.status(403).send({
//         error: 'failed to save the connected account ',
//         isConnected: false
//       })
//      })
// })
