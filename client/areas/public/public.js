import React from 'react'
import { composeWithTracker } from 'react-komposer'
import { Route, IndexRoute, Link } from 'react-router'
import { Editor, EditorState, ContentState, RichUtils } from 'draft-js'

const getPublicNavigation = () => {
  let linkNames = ['Home', 'About', 'Blog', 'Shop']
  let linkItems = linkNames.map((name) => {
    let link = '/'
    if (name !== 'Home') {
      link = name[0].toLowerCase() + name.slice(1)
    }
    return <li key={name}><Link to={link}>{name}</Link></li>
  })
  return <ul>{linkItems}</ul>
}

export class PublicArea extends React.Component {
  render() {
    return <div id="public-area">
      {getPublicNavigation()}
      {this.props.children}
    </div>
  }
}
PublicArea.propTypes = {
  children: React.PropTypes.element.isRequired
}

export class Index extends React.Component {
  render() {
    return <div id="index">
      <h1>Welcome!</h1>
      <p>This page is pretty much empty</p>
    </div>
  }
}

export class Blog extends React.Component {
  render() {
    return <div id="blog">
      <h1>Blog</h1>
    </div>
  }
}

export class Shop extends React.Component {
  render() {
    return <div id="shop">
      <h1>Shop</h1>
    </div>
  }
}
