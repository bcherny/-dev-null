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

  getEndpoints (org: string): Promise {
    return new Promise((resolve, reject) => {
      $.get(`/orgs/${ org }`)
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
      $.get('/orgs')
        .done(resolve)
        .fail(reject)
    })
  }

  componentDidMount() {

    giver
      .provide('orgs', this.getOrgs())
      .provide('user', this.getUser())

    this
      .setState({ isLoggingIn: true })

    Promise.all([
      giver.askFor('orgs'),
      giver.askFor('user')
    ])
      .then(([orgs, user]) => {
        this.setState({
          isLoggingIn: false,
          orgs: orgs,
          user: user
        })
        giver.provide('endpoints', this.getEndpoints(orgs[0].id))
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
        <SideBar user={ this.state.user } isLoggingIn={ this.state.isLoggingIn } />
      </div>
    )
  }

}