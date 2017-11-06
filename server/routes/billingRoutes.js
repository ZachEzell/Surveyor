const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
// requireLogin is a middleware that can be used to detect if
// a user is NOT logged in
const requireLogin = require('../middlewares/requireLogin');
// 1. Bill user
// This is configured so that only ap/stripe goes through middleware
// The purpose of requireLogin can be found in Lecture 104
// One of the references must return something to express
module.exports = app => {
  app.post('/api/stripe', requireLogin, async (req, res) => {
    // if no user signed in
    // passport did not find a user assigned to the cookie

    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '$5 for 5 credits',
      // remember, this is happening because of body-parser
      source: req.body.id
    });

    // We wired this up in passport with initialize and session
    // This references the CURRENT user
    // So after Billing user (Step 1), apply credits to THAT user

    req.user.credits += 5;
    // Remember, saving models is an async request, so must add
    // await
    // req.user is attached through passport.initialize and passport.session

    //by convention, assign to a variable to update the returned user
    const user = await req.user.save();

    // Return user model back to app
    res.send(user);
  });
};
