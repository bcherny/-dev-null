import React from 'react'
import FavList from './FavList'
import SettingsNav from './SettingsNav'
import moment from 'moment'

export default class SideBar extends React.Component {

  constructor(_) {
    super(_)
  }

  render() {

    return (
      <div className="SideBar">
        <FavList user={ this.props.user } orgs={ this.props.orgs } isLoggingIn={ this.props.isLoggingIn } />
        <SettingsNav user={ this.props.user } />
        { this.props.isLoggingIn ? <em>Loading orgs...</em> : <small>Last updated { moment().format('h:mma') }</small> }
      </div>
    )

  }

}