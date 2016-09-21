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

let sampleContent = `
# This is a heading

This is a paragraph!

- This is a list item!
- So is this!

Here is a link:
http://www.google.com/
`

if (Meteor.isServer) {
  Meteor.publish('pages', function (title) {
    if (title) {
      return Pages.find({title: title})
    }

    return Pages.find()
  })

  Meteor.publish('blogs', function (title) {
    if (title) {
      return Blogs.find({title: title})
    }

    return Blogs.find()
  })
}

Meteor.startup(() => {
  if (Meteor.isServer) {

    if (!Pages.findOne({title: 'splash'})) savePage.call({
      id: '',
      title: 'splash',
      content: sampleContent
    })

    if (!Pages.findOne({title: 'about'})) savePage.call({
      id: '',
      title: 'about',
      content: sampleContent
    })

  }
})
