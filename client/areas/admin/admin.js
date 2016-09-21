import React from 'react'
import { Icon } from '../../components/common.js'
import { Link, browserHistory } from 'react-router'
import { Editor, EditorState } from 'draft-js'

export class Admin extends React.Component {

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

  render() {
    return <div id="dashboard">
      <h2>Admin Dashboard</h2>
      <div id="content">
        <p>
          {`Probably want to be able to CRUD blog posts.
            Probably want to be able to CRUD items in the shop.
            Probably want to be able to update the about page.
            Probably want to be able to update settings (ideally without restarting the site).
            For the about page and blog posts, I want to be able to add images, format text, and add/edit raw html and styles adhoc.
            Since I am a trusted admin, I don't need to worry about being trusted with this power.
            `}
        </p>
        <Editor editorState='# Hello' onChange={console.log.bind(console)}/>
      </div>
    </div>
  }
}
