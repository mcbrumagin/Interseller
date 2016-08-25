import { Meteor } from 'meteor/meteor'

Accounts.validateNewUser((user) => {

  if (!Meteor.settings.public.isAdminSignupEnabled)
    throw new Meteor.Error(
      403, 'Error 403: Forbidden',
      "Signups are disabled, please contact the site owner: "
      + Meteor.settings.public.contactEmail
    )
  
  new SimpleSchema({
    _id: { type: String },
    username: { type: String },
    emails: { type: Array },
    'emails.$': { type: Object },
    'emails.$.address': { type: String },
    'emails.$.verified': { type: Boolean },
    createdAt: { type: Date },
    services: { type: Object, blackbox: true }
  }).validate(user)

  return true
})
