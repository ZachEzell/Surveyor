const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

//Remember to call users before passport
require('./models/User');
require('./models/Survey');
require('./services/passport');

// Connect to Mongo
mongoose.connect(keys.mongoURI);

// use Express
const app = express();

// body-parser
// Any request (post, get, etc) has a request body
// bodyParser will assign it to the req.body request object
app.use(bodyParser.json());

// Command express to use cookies
// This is middleware
app.use(
  cookieSession({
    // how long can a cookie exist in browser, in milliseconds
    // 30 days * 24 hours * 60 minutes * 60 seconds * 1000 miliseconds
    maxAge: 2592000000,
    // encrypt user
    keys: [keys.cookieKey]
  })
);
// command express to use cookies

app.use(passport.initialize());

// command express to use cookies

app.use(passport.session());

//connects routes from authRoutes file to index.js file
//const authRoutes = require('./routes/authRoutes');
//authRoutes(app);
// can be condensed down into
require('./routes/authRoutes')(app);
//because the require statement is requiring (calling) a function
// in which it will be calling the app
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

// We began this process after adding client project
// NODE_ENV is set by Heroku, if it's on production, it must be
// our production server
if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets

  // if we do not know what we are looking for,
  // then look into client/build directory to hopefully find it
  app.use(express.static('client/build'));

  const path = require('path');

  // Express will serve up index.html if route is
  // unidentified
  // If we don't know what route this is, send them to index.html
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
