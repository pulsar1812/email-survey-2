const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default emails => {
  // To remove any trailing comma after the string
  // so that it won't result in invalid emails
  const emailsNoTrailingComma = emails.replace(/,\s*$/, "");

  const invalidEmails = emailsNoTrailingComma
    .split(",")
    .map(email => email.trim())
    .filter(email => re.test(email) === false);

  if (invalidEmails.length) {
    return `These emails are invalid: ${invalidEmails}`;
  }

  return;
};
