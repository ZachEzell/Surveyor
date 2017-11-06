const keys = require('../../config/keys');
// Remember, we are using the survey argument
// from our survey model, which has several
// properties about our user, including the body
module.exports = survey => {
  // this is what the recipient will see in the email
  return `
    <html>
      <body>
      <div style="text-align: center;">
        <h3>I'd like your input!</h3>
        <p>Please answer the following question:</p>
        <p>${survey.body}</p>
      
        <div>
          <a href="${keys.redirectDomain}/api/surveys/${survey.id}/yes">Yes</a>
        </div>
        <div>
           <a href="${keys.redirectDomain}/api/surveys/${survey.id}/no">No</a>
        </div>
        </div>
      </body>
    </html>
  `;
};
