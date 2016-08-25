import React from 'react'
import { Route, IndexRoute, Link } from 'react-router'

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

export const PublicArea = React.createClass({
  propTypes: {
    children: React.PropTypes.element.isRequired,
  },
  render() {
    return <div id="public-area">
      {getPublicNavigation()}
      {this.props.children}
    </div>
  }
})

export const Index = React.createClass({
  render() {
    return <div id="index">
      <h1>Welcome!</h1>
      <p>This page is pretty much empty</p>
    </div>
  }
})

export const About = React.createClass({
  render() {
    return <div id="about">
      <h1>About</h1>
    </div>
  }
})

export const Blog = React.createClass({
  render() {
    return <div id="blog">
      <h1>Blog</h1>
    </div>
  }
})

export const Shop = React.createClass({
  render() {
    return <div id="shop">
      <h1>Shop</h1>
    </div>
  }
})
