import React from 'react'
import { giver } from './App'

export default class SettingsView extends React.Component {

  constructor (_) {
    super(_)
    this.state = {}
  }

  componentDidMount() {

    giver
      .askFor('user')
      .then(user => {
        console.log('got user', this.state.user)
        this.state.user = user
      })

  }

  render() {

    if (!this.state.user) {
      return <div>Getting user...</div>
    }

    console.log('user', this.state.user)

    const connections = this.state.user.connections.map(_ => {
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