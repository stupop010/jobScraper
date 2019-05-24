const sgMail = require("@sendgrid/mail");
const keys = require("../config/keys");
const { emailData } = require("../scraping/lib/updateData");

sgMail.setApiKey(keys.sendGridAPIKey);

const sendNewJobs = async () => {
  const email = await emailData();
  sgMail.send({
    from: "no-reply@stuart-doney.com",
    subject: "New jobs in the past 5 hours",
    templateId: "d-f58dab00fb34489d88154bca3bb89b23",
    personalizations: [
      {
        to: {
          name: "Stuart Doney",
          email: "stupop010@hotmail.co.uk"
        },
        dynamic_template_data: { job: email }
      }
    ]
  });
};

module.exports = {
  sendNewJobs
};
