import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import { ValidatedMethod } from 'meteor/mdg:validated-method'

// TODO: REMOVE?
export const login = new ValidatedMethod({
  name: 'test', // probably don't need this?
  validate: new SimpleSchema({
    username: { type: String },
    password: { type: String }
  }).validator(),
  run(loginParams) {
    console.log({loginParams})
  }
})
