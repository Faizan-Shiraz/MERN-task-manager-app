const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const welcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "faixanshirax@gmail.com",
    subject: "Thanks for joing in",
    text: `Welcome to the app ${name}. Let me know how you get along with the app.`
  });
};

const cancellationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "faixanshirax@gmail.com",
    subject: "Thanks for your time with us",
    text: `Thank you for using our app ${name}. Hope you enjoyed a good experiance with it.`
  });
};

module.exports = { welcomeEmail, cancellationEmail };
