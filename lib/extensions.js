import { Meteor } from 'meteor/meteor'

var defineGettersFor = (obj, getterMap) => {
  Object.keys(getterMap).forEach((name) => {
    Object.defineProperty(obj, name, { get: getterMap[name] })
  })
}

defineGettersFor(Meteor.user, {
  username: () => {
    let user = Meteor.user()
    if (user !== null) return user.username
  },
  id: () => {
    let user = Meteor.user()
    if (user !== null) return user._id
  },
  isLoggedIn: () => {
    let user = Meteor.user()
    return user !== null
  }
})

var contains = function (value) {
  return this.indexOf(value) > -1
}
Array.prototype.contains = contains
String.prototype.contains = contains

String.prototype.toCase = function toCase(type) {
  let validTypes = String.prototype.toCase.validTypes

  if (!type && typeof type !== 'string')
    throw new Error('Parameter "type" is required')

  if (!validTypes.contains(type))
    throw new Error(`Parameter "type" must be one of [${validTypes.join(', ')}]`)

  let transformedText = this.slice()

  if (type === 'kebab') {
    for (let i in transformedText) {
      let char = transformedText[i]
      if (char.toUpperCase && char === char.toUpperCase()) {
        transformedText = transformedText.slice(0,i)
          + '-' + transformedText[i].toLowerCase()
          + transformedText.slice(++i)
      }
    }
  }
  else if (type === 'snake') throw new Error('Unimplemented')
  else if (type === 'lower-camel') throw new Error('Unimplemented')
  else if (type === 'camel') throw new Error('Unimplemented')
  else if (type === 'upper-camel') throw new Error('Unimplemented')

  return transformedText
}
String.prototype.toCase.validTypes = ['kebab', 'snake', 'lower-camel', 'camel', 'upper-camel']
