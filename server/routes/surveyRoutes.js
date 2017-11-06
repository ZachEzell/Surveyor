// Mongo will complain sometimes if you require models several times
// to avoid this, require in mongo and then reference the actual model
// as shown on the const Survey = ...
const _ = require('lodash');
const Path = require('path-parser');
// a default integrated module
// has helpers for parsing URLs
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

// we want access to title, subject, body, recipients,
// this is the same as req.body.title, etc.
// remember to do routes before doing anything front-end
// order for our references to functions matters
module.exports = app => {
  app.get('/api/surveys/thanks', (req, res) => {
    res.send('Thanks for voting!');
  });

  app.post('/api/surveys/webhooks', (req, res) => {
    // when a person reqs a post from here
    // req.body is the req results

    // p is an object that will attempt to find the surveyId and Choice
    // and it'll test pathname for the path
    // this will just return the id and choice
    const p = new Path('/api/surveys/:surveyId/:choice');
    // A note here, when we completed this
    // we saw that we only wanted the email and url from
    // the event object, so we refactored the entire event
    // object to only give us the email and url
    // chain can be used to chain helpers together
    const events = _.chain(req.body)
      .map(({ email, url }) => {
        // find only the url   -- new URL(url).pathname

        // we are going to pull of the id, pass in pattern
        // and it'll pull off only the ID portion of the req and the
        // surveyId portion of the path

        const match = p.test(new URL(url).pathname);

        // if a match was found, return the match
        if (match) {
          return {
            email,
            surveyId: match.surveyId,
            choice: match.choice
          };
        }
      })
      // at some point, we will return an object that is undefined
      // so we will use a lodash method that removes undefined objects

      // compactEvents will return event objects, nothing undefined
      .compact()
      //this will remove any duplicates of those records
      // this passes in our filtered events object (compactEvents)
      // tells it to look at the email and surveyId properties
      // and if there are duplicates, remove them
      // duplicates may occur if someone clicks 'yes' twice
      .uniqBy('email', 'surveyId')
      .value();
    console.log(events);
    // tells sendgrid that everything is ok
    // just returns something
    res.send({});
  });

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      // note that there isn't a return statement here
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      // set the current user id
      _user: req.user.id,
      dateSent: Date.now()
    });

    // What's going on here?

    // The mailer combines recipients and puts them into one Mailer
    // object, a batch operation

    //This Mailer will describe the piece of mail, that's why were are passing it
    // the surveyTemplate is the html that will be rendered
    // here we will pass the survey model object into the survey template

    // first argument will be subject and recipient
    // second argument will be the html to use inside the body
    const mailer = new Mailer(survey, surveyTemplate(survey));
    // attempt to do this, catch any errors and send a response
    try {
      // this is an async function, it's going to take some time to get a
      // response
      await mailer.send();
      //save the survey, it will wait for this to complete before doing anything
      // else
      await survey.save();
      req.user.credits -= 1;
      // at this point, the user is stale, so we want to
      // save to the user and save to a variable
      const user = await req.user.save(); // lecture 136

      // update user model
      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
