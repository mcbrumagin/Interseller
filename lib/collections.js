import { Mongo } from 'meteor/mongo'

//const Files = new Mongo.Collection('files')
Blogs = new Mongo.Collection('blogs')
Pages = new Mongo.Collection('pages') // about, custom, etc

let editableContentSchema = {
  title: { type: String },
  content: { type: String },
  draft: { optional: true, type: String },
  created: { type: Date },
  updated: { type: Date },
  'revisions.$': { type: Object },
  'revisions.$.title': { type: String },
  'revisions.$.content': { type: String },
  'revisions.$.created': { type: Date }
}

var Schemas = {
  Blog: new SimpleSchema(editableContentSchema),
  Page: new SimpleSchema(editableContentSchema)
}

Blogs.attachSchema(Schemas.Blog)
Pages.attachSchema(Schemas.Page)
