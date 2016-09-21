//import { SimpleSchema } from 'meteor/aldeed:simple-schema'
//import { ValidatedMethod } from 'meteor/mdg:validated-method'

let createUpsertHandler = (collection) => {
  let callback = (err, res) => {
    if (err) console.error(err)
    else console.log(res)
  }

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

let editableContentRequestValidator = new Validator({
  id: { type: String, optional: true },
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
