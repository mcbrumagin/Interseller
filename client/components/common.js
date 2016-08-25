import React from 'react'

export class Empty extends React.Component {
  constructor(props) { super(props) }
  render() { return <span/> }
}

export class Icon extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    for (let propertyName in this.props) {
      return <i className={`fa fa-${propertyName.toCase('kebab')}`}></i>
    }
  }
}
