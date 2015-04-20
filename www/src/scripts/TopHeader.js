import React from 'react'
import GithubLogin from './GithubLogin'
import SettingsGear from './SettingsGear'

export default class TopHeader extends React.Component {

  constructor (_) {
    super(_)
  }

  render() {

    return (
      <header className="TopHeader">
        <h1>ack.mo</h1>
        <div className="pull-right">
          <GithubLogin user={ this.props.user } orgs={ this.props.orgs } isLoggingIn={ this.props.isLoggingIn } />
          <SettingsGear />
        </div>
      </header>
    )

  }

}