import './main.css'
import React from 'react'
import Router from './router.js'
import { render } from 'react-dom'

Meteor.startup(() => render(
  <div id="wrapper">{Router}</div>,
  document.getElementById('react-root')
))
