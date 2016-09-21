import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Meteor } from 'meteor/meteor'

import { PublicArea, Index, Blog, Shop } from './areas/public/public'
import About from './areas/public/about'
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
      {
        Meteor.settings.public.isAboutEnabled
        ? <Route path="about" name="About" component={ About } />
        : <Empty />
      }
      {
        Meteor.settings.public.isBlogEnabled
        ? <Route path="blog" name="Blog" component={ Blog } />
        : <Empty />
      }
      {
        Meteor.settings.public.isShopEnabled
        ? <Route path="shop" name="Shop" component={ Shop } />
        : <Empty />
      }
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
