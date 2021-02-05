import MailJet from "node-mailjet";
const { mailjetAPI, mailjetSECRET } = Meteor.settings.private;

export const mailjetClient = MailJet.connect(mailjetAPI, mailjetSECRET);

// configure Meteor reset password
Accounts.emailTemplates.siteName = "La Carto'Nomades";
Accounts.emailTemplates.from =
  "La Carto'Nomades <ne-pas-repondre@lacartonomades.fr>";
Accounts.emailTemplates.headers = {
  "X-MC-AutoText": true,
};

Accounts.sendResetPasswordEmail = function (userId, email) {
  // Make sure the user exists, and email is one of their addresses.
  var user = Meteor.users.findOne(userId);
  if (!user) throw new Error("Can't find user");
  // pick the first email if we weren't passed an email.
  if (!email && user.emails && user.emails[0]) email = user.emails[0].address;
  // make sure we have a valid email

  var token = Random.secret();
  var when = new Date();
  var tokenRecord = {
    token: token,
    email: email,
    when: when,
  };
  Meteor.users.update(userId, {
    $set: {
      "services.password.reset": tokenRecord,
    },
  });
  // before passing to template, update user object with new token
  Meteor._ensure(user, "services", "password").reset = tokenRecord;

  const request = mailjetClient.post("send", { version: "v3.1" }).request({
    // SandboxMode: Meteor.isDevelopment,
    Messages: [
      {
        From: {
          Email: "<ne-pas-repondre@lacartonomades.fr>",
          Name: "La Carto'Nomades",
        },
        To: [
          {
            Email: email,
            Name: user.username,
          },
        ],
        TemplateID: 2200015,
        TemplateLanguage: true,
        Subject: "Perdu ton mot de passe ?",
        Variables: {
          LINK: `https://lacartonomades.fr/reset-password/${token}`,
        },
      },
    ],
  });
  return request
    .then((result) => {
      console.log(`reset password for ${user.emails[0].address}`);
      return true;
    })
    .catch((err) => {
      throw new Meteor.Error(
        "403",
        "There was an error while sending the email"
      );
    });
};
