/* @flow */

import $ from 'jQuery'
import React from 'react'
import { RouteHandler } from 'react-router'
import SideBar from './SideBar'
import TopHeader from './TopHeader'

export default class App extends React.Component {

  constructor (_) {
    super(_)
    this.state = {
      orgs: null,
      user: null,
      isLoggingIn: false
    }
  }

  getUser(): Promise {
    return $.get('/user')
  }

  getOrgs(): Promise {
    return $.get('/user/orgs')
  }

  componentDidMount() {

    this
      .setState({ isLoggingIn: true })

    this

      // when the component loads, check if the user is signed in
      .getUser()
      .done(_ => this.setState({ user: _ }))
      .fail(_ => this.setState({ user: null }))
      .always(_ => this.setState({ isLoggingIn: false }))

      // then, fetch their github orgs
      .then(_ => this.getOrgs())
      .done(_ => this.setState({ orgs: _ }))
      .fail(_ => this.setState({ orgs: null }))
      .always(_ => this.setState({ isLoggingIn: false }))

  }

  render() {
    return (
      <div>
        <TopHeader user={ this.state.user } orgs={ this.state.orgs } isLoggingIn={ this.state.isLoggingIn } />
        <section className="MainView">
          <RouteHandler />
        </section>
        <SideBar user={ this.state.user } orgs={ this.state.orgs } isLoggingIn={ this.state.isLoggingIn } />
      </div>
    )
  }

}