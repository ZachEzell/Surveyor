// This middleware is for exiting invalid requests
module.exports = (req, res, next) => {
  // next means it passes the completed data
  // to the NEXT middleware
  if (!req.user) {
    return res.status(401).send({ error: 'You must log in!' });
  }
  // next() is only called if no issue is found
  next();
};
