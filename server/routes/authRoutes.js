const passport = require('passport');
// when user clicks to go to google, use auth strategy 'google'
// ask for permissions 'profile' and 'email'

module.exports = app => {
  // Step 2 in Oauth, user requests to sign in
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );
  //when user clicks on profile, authenticate with google and pass back data
  // to the google strategy

  // google callsback to us with data
  // and attaches it to profile.id
  // at this point the code inside the url has been passed
  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/surveys');
    }
  );

  app.get('/api/logout', (req, res) => {
    // passport also adds functionality to req
    // takes cookie and kills it
    req.logout();
    res.redirect('/');
  });
  //Once user is set, the user model is attached to req
  app.get('/api/current_user', (req, res) => {
    //passport automatically attaches user data to req
    res.send(req.user);
  });
};
