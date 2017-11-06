const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export default emails => {
  // trim will remove any spaces
  const invalidEmails = emails
    .split(',')
    // take all values (emails) and trim them
    .map(email => email.trim())
    // the regex is from emailregex.com
    // test the email using regex and return false ones
    .filter(email => re.test(email) === false);

  // If there is anything in the array, return invalid Emails
  if (invalidEmails.length) {
    return `These emails are invalid: ${invalidEmails}`;
  }
};
