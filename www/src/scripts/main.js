import React from 'react'
import { Route, DefaultRoute, RouteHandler, Link } from 'react-router'
import Router from 'react-router'
import App from './App'
import QueryView from './QueryView'
import SettingsView from './SettingsView'

const routes = (
  <Router.Route handler={App}>
    <Router.DefaultRoute handler={QueryView}/>
    <Router.Route name="settings" path="settings" handler={SettingsView}/>
  </Router.Route>
)

Router.run(routes, function (Handler) {
  React.render(<Handler />, document.querySelector('#main'));
})