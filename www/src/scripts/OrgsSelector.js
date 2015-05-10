import React from 'react'
import { giver } from './App'

export default class OrgsSelector extends React.Component {

  constructor (_) {
    super(_)
    this.state = {}
  }

  componentDidMount() {

    // TODO: store the user's currently selected org
    giver
      .askFor('orgs')
      .then(orgs => {
        this.setState({ orgs: orgs })
        giver.provide('org', orgs[0])
      })

  }

  onChange (option) {
    console.log('change', option)
    giver.provide('org', option)
  }

  render() {

    if (!this.state.orgs) {
      return <div className="OrgsSelector">Loading orgs...</div>
    }

    return (
      <div className="OrgsSelector">
        <select
          onChange={ this.onChange }
        >
          { this.state.orgs.map(org => <option value={ org.id }>{ org.login }</option>) }
        </select>
      </div>
    )

  }

}