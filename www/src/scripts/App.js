/* @flow */

import $ from 'jQuery'
import React from 'react'
import { RouteHandler } from 'react-router'
import Giver from './Giver'
import SideBar from './SideBar'
import TopHeader from './TopHeader'

export let giver = new Giver

export default class App extends React.Component {

  constructor (_) {
    super(_)
    this.state = {
      orgs: null,
      user: null,
      isLoggingIn: false
    }
  }

  getConnections(): Promise {
    return new Promise((resolve, reject) => {
      $.get('/user/connections')
        .done(resolve)
        .fail(reject)
    })
  }

  getUser(): Promise {
    return new Promise((resolve, reject) => {
      $.get('/user')
        .done(resolve)
        .fail(reject)
    })
  }

  getOrgs(): Promise {
    return new Promise((resolve, reject) => {
      $.get('/user/orgs')
        .done(resolve)
        .fail(reject)
    })
  }

  componentDidMount() {

    giver
      .provide('connections', this.getConnections())
      .provide('orgs', this.getOrgs())
      .provide('user', this.getUser())

    this
      .setState({ isLoggingIn: true })

    Promise
      .all([
        this.getUser(),
        this.getOrgs()
      ])
      .then(([user, orgs]) => {
        this.setState({
          isLoggingIn: false,
          orgs: orgs,
          user: user
        })
      })
      .catch(_ => this.setState({ isLoggingIn: false }))

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