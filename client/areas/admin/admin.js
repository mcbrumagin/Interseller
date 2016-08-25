import React from 'react'
import { Icon } from '../../components/common.js'
import { Link, browserHistory } from 'react-router'

export class Admin extends React.Component {
  constructor(props) {
    super(props)
  }

  logout() {
    Meteor.logout(() => browserHistory.push('/login'))
  }

  render() {
    return <div id="admin">
      <button onClick={this.logout}>
        <Icon signOut />
        <span>Logout</span>
      </button>
      {this.props.children}
    </div>
  }
}

Admin.propTypes = {
  children: React.PropTypes.element.isRequired
}

export class Dashboard extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <div id="dashboard">
      {`This is a test of the emergency react broadcast?`}
    </div>
  }
}
