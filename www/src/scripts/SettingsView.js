import React from 'react'
import { giver } from './App'

export default class SettingsView extends React.Component {

  constructor (_) {
    super(_)
    this.state = {}
  }

  componentDidMount() {

    giver
      .askFor('connections')
      .then(connections => {
        this.setState({ connections: connections })
      })

  }

  render() {

    if (!this.state.connections) {
      return <div>Getting connections...</div>
    }

    const label = (value) => {
      return (
        <label className="quarter-width">
          <input type="text" value={ value } disabled />
        </label>
      )
    }

    const connections = this.state.connections.map(_ => {
      return <li>{ label(_.nickname) }{ label(_.url) }{ label(_.user) }</li>
    })

    return (
      <div className="SettingsView">

        <form>
          <label className="quarter-width">
            Nickname
            <input type="text" placeholder="Prod DB" />
          </label>
          <label className="quarter-width">
            URL
            <input type="url" placeholder="mysql://dev-db.cow.com:3306" />
          </label>
          <label className="quarter-width">
            Username
            <input type="text" />
          </label>
          <label className="quarter-width">
            Password
            <input type="password" />
          </label>
        </form>

        <ul>{ connections }</ul>

      </div>
    )
  }

}