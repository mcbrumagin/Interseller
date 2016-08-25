import React from 'react'
import { Icon, Empty } from '../../components/common'
import { Form } from '../../components/form'
import { Link, browserHistory } from 'react-router'
import { SignupLink } from './signup'

export class Login extends React.Component {

  constructor(props) {
    super(props)
  }

  submitLogin(form) {
    Meteor.loginWithPassword(form.username, form.password, (err) => {
      if (err) console.error(err.message)
      else browserHistory.push('/admin')
    })
  }

  render() {
    let loginForm = {
      username: 'text',
      password: 'password'
    }

    return (
      <div id="login-form">
        <h1>Sign In to access Admin panel</h1>
        <Form onSubmit={this.submitLogin} inputs={loginForm}>
          <button type="submit">
            <Icon signIn />
            <span className="txt">Sign In</span>
          </button>
        </Form>
        { Meteor.settings.public.isAdminSignupEnabled ? <SignupLink /> : <Empty /> }
      </div>
    )
  }

}
