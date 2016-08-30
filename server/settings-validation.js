Meteor.startup(() => {
  new SimpleSchema({
    'public.contactEmail': { type: String },
    'public.isAdminSignupEnabled': { type: Boolean },
    'public.isAboutEnabled': { type: Boolean },
    'public.isBlogEnabled': { type: Boolean },
    'public.isShopEnabled': { type: Boolean }
  }).validate(Meteor.settings)
})
