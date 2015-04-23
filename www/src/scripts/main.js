import React from 'react'
import Router from 'react-router'
import App from './App'
import QueryView from './QueryView'
import SettingsView from './SettingsView'

const routes = (
  <Router.Route handler={App}>
    <Router.DefaultRoute handler={QueryView}/>
    <Router.Route name="settings/endpoints" path="settings/endpoints" handler={SettingsView}/>
    <Router.Route name="settings/endpoints/:nickname" path="settings/endpoints/:nickname" handler={SettingsView}/>
  </Router.Route>
)

Router.run(routes, function (Handler) {
  React.render(<Handler />, document.querySelector('#main'));
})