//import { SimpleSchema } from 'meteor/aldeed:simple-schema'
//import { ValidatedMethod } from 'meteor/mdg:validated-method'

let createUpsertHandler = (collection) => {
  let callback = (err) => err && console.error(err)

  return ({id, title, content}) => {
    let item = collection.findOne(id)
    if (item) {
      collection.update(id, {
        $set: {
          title: title,
          content: content,
          created: item.created,
          updated: new Date
        },
        /* TODO: $unshift: {
          title: item.title,
          content: item.content,
          created: item.updated
        } */
        $push: {
          revisions: {
            $each: [{
              title: item.title,
              content: item.content,
              created: item.updated
            }],
            $position: 0
          }
        }
      }, callback)
    } else {
      collection.insert({
        id, title, content,
        created: new Date,
        updated: new Date
      }, callback)
    }
  }
}

let editableContentRequestValidator = Validator({
  id: { type: String },
  title: { type: String },
  content: { type: String }
})

let upsertPage = createUpsertHandler(Pages)
savePage = new ValidatedMethod({
  name: 'savePage',
  validate: editableContentRequestValidator,
  run(page) {
    upsertPage(page)
  }
})

let upsertBlog = createUpsertHandler(Blogs)
saveBlog = new ValidatedMethod({
  name: 'saveBlog',
  validate: editableContentRequestValidator,
  run(blog) {
    upsertBlog(blog)
  }
})
