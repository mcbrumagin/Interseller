//import { SimpleSchema } from 'meteor/aldeed:simple-schema'
//import { ValidatedMethod } from 'meteor/mdg:validated-method'

updateAbout = new ValidatedMethod({
  name: 'updateAbout',
  validate: new SimpleSchema({
    content: { type: String }
  }).validator(),
  run({content}) {
    // TODO: Pages.upsert({content})
    return {content}
  }
})
