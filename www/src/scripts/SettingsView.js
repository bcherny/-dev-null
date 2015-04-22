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
        console.log('got connections', this.state.connections)
        this.state.connections = connections
      })

  }

  render() {

    if (!this.state.connections) {
      return <div>Getting connections...</div>
    }

    console.log('connections', this.state.connections)

    const connections = this.state.connections.map(_ => {
      <li>{ connection }</li>
    })

    return (
      <div className="SettingsView">

        <form>
          <label className="half-width">
            URL
            <input type="text" placeholder="mysql://dev-db.cow.com:3306" />
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