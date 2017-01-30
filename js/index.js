import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'
import App from './App'
import Welcome from './Welcome'

render(
  (
    <Router history={hashHistory}>
      <Route component={ App }>
        <Route path="/" component={ Welcome } />
      </Route>
    </Router>
  ),
  document.getElementById('app')
)
