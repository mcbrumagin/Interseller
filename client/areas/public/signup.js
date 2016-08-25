import React from 'react'
import { Icon } from '../../components/common.js'
import { Form } from '../../components/form.js'
import { Link, browserHistory } from 'react-router'

export class Signup extends React.Component {

  constructor(props) {
    super(props)
  }

  submitSignup(form) {
    Accounts.createUser(form, (err) => {
      if (err) console.error(err.message)
      else browserHistory.push('/admin')
    })
  }

  render() {
    let signupForm = {
      email: 'email',
      username: 'text',
      password: 'password'
    }

    return (
      <div id="signup-form">
        <h1>Sign In to access Admin panel</h1>
        <Form onSubmit={this.submitSignup} inputs={signupForm}>
          <button type="submit">
            <Icon checkSquare />
            <span className="txt">Sign Up</span>
          </button>
        </Form>
        <Link to="login">{`Back to login`}</Link>
      </div>
    )
  }

}

export class SignupLink extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div id="signup-link">
        <h3>{`Don't have an account?`}</h3>
        <Link to="/signup">Signup here!</Link>
      </div>
    )
  }
}
