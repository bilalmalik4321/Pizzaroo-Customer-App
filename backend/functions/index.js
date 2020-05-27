require("dotenv").config();
const functions = require('firebase-functions');


const stripe = require('stripe')(process.env.STRIPE_SK);


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

