const sendgrid = require('sendgrid');
// Helper is just a sendgrid helper
const helper = sendgrid.mail;
const keys = require('../config/keys');

// Mailer class extends helper.Mail
// extending Mailer makes Mailer inherit helper.Mail
// we are adding onto the Mail object

//This will pull off the subject and recip
// from where we called it

// content is the HTML information
class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
    super();
    // just do this
    this.sgApi = sendgrid(keys.sendGridKey);
    // Who is this from?
    this.from_email = new helper.Email('no-reply@emaily.com');
    // What's the subject?
    this.subject = subject;
    // What's the content?
    this.body = new helper.Content('text/html', content);
    // Who are the recipients?
    // formatAddresses just turns
    // the emails into a helper object
    this.recipients = this.formatAddresses(recipients);
    console.log(this.recipients);

    // this is a helper.Mail helper function
    // and stuff the content of this.body into it
    this.addContent(this.body);
    // Sendgrid replaces our links with their own
    // so sendgrid can monitor when a link is clicked
    this.addClickTracking();
    // Take the converted helper objects
    // and add them to the Mailer
    this.addRecipients();
  }

  // Format the emails
  // will receive our recipients
  // extract emails and return them
  // email is just the email from the recipients
  formatAddresses(recipients) {
    return recipients.map(({ email }) => {
      return new helper.Email(email);
    });
  }
  // just do this
  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }
  // just do this
  addRecipients() {
    const personalize = new helper.Personalization();
    // for each of our recipients
    this.recipients.forEach(recipient => {
      personalize.addTo(recipient);
    });
    // add the entire personalize object
    this.addPersonalization(personalize);
  }
  // take the entire Mailer and send it off
  // Any time there is an api request
  // think async/await
  async send() {
    // sgApi is the key we just created
    const request = this.sgApi.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      // converts everything to JSON and sends it
      // off
      body: this.toJSON()
    });
    // send it
    // it's a request, so await
    const response = await this.sgApi.API(request);
    // we'll get a response back, and then return it
    return response;
  }
}

module.exports = Mailer;

// const sendgrid = require('sendgrid');
// // Helps create the mailer
// const helper = sendgrid.mail;
// // API KEY
// const keys = require('../config/keys');

// // Mail is an object that takes configuration
// // and spits out a mailer
// class Mailer extends helper.Mail {
//   // Whenever calling "new" key word, use a constructor
//   // we expect to receive a subject and a recipient
//   // second argument is the content
//   constructor({ subject, recipients }, content) {
//     // read up on this
//     super();
//     // just pass in sendgrid Key. just do it
//     this.sgApi = sendgrid(keys.sendGridKey);
//     // whenever we create a new email, use this email
//     // this means don't respond to this email
//     this.from_email = new helper.Email('no-reply@emaily.com');
//     this.subject = subject;
//     // we are using text/html, and we are inputting the content
//     this.body = new helper.Content('text/html', content);
//     // we are going to format addresses
//     this.recipients = this.formatAddresses(recipients);

//     // addContent is a built-in function from Mail that adds the content
//     this.addContent(this.body);
//     // enable click-tracking, which is a sendgrid thing that allows
//     // us to tell if a user clicked a link
//     // this is not built-in
//     this.addClickTracking();
//     // this will process our Recipients
//     // take our formatted list of emails and register them with an email
//     this.addRecipients();
//   }

//   formatAddresses(recipients) {
//     // just going to extract the email and return it
//     // (({ email })) means pull off email property
//     // format it with helper and return it
//     return recipients.map(({ email }) => {
//       // this just turns it into an object sendgrid can read
//       return new helper.Email(email);
//     });
//   }
//   addClickTracking() {
//     // just write this code...to enable click-tracking, no explanation here
//     const trackingSettings = new helper.TrackingSettings();
//     const clickTracking = new helper.ClickTracking(true, true);

//     trackingSettings.setClickTracking(clickTracking);
//     this.addTrackingSettings(trackingSettings);
//   }
//   addRecipients() {
//     // just write this code...
//     const personalize = new helper.Personalization();
//     // iterate over our recipients and add them to our personalize object
//     this.recipients.forEach(recipient => {
//       personalize.addTo(recipient);
//     });
//     // add our personalize object
//     this.addPersonalization(personalize);
//   }
//   // send it to sendgrid, mail it off to people
//   // this is an api request to sendgrid, use async/await promise
//   async send() {
//     // more sendgrid stuff, just write it
//     const request = this.sgApi.emptyRequest({
//       //some config options
//       method: 'POST',
//       path: '/v3/mail/send',
//       //convert to JSON
//       body: this.toJSON()
//     });
//     // send it
//     const response = this.sgApi.API(request);
//     return response;
//   }
// }

// module.exports = Mailer;
