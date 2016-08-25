import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Meteor } from 'meteor/meteor'

import { PublicArea, Index, About, Blog, Shop } from './areas/public/public'
import { Admin, Dashboard } from './areas/admin/admin'
import { Login } from './areas/public/login'
import { Signup } from './areas/public/signup'
import { Empty } from './components/common'

const requireAuth = (nextState, replace) => {
  if (!Meteor.loggingIn() && !Meteor.userId()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname },
    })
  }
}

export default (
  <Router history={ browserHistory }>
    <Route path="/" component={ PublicArea }>
      <IndexRoute name="Home" component={ Index } />
      <Route path="about" name="About" component={ About } />
      <Route path="blog" name="Blog" component={ Blog } />
      <Route path="shop" name="Shop" component={ Shop } />
    </Route>
    <Route path="login" component={ Login } />
    {
      Meteor.settings.public.isAdminSignupEnabled
      ? <Route path="signup" component={ Signup } />
      : <Empty />
    }
    <Route path="admin" component={ Admin } onEnter={ requireAuth } >
      <IndexRoute name="test" component={ Dashboard } />
    </Route>
  </Router>
)
