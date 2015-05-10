import React from 'react'
import GithubLogin from './GithubLogin'
import OrgsSelector from './OrgsSelector'

export default class TopHeader extends React.Component {

  constructor (_) {
    super(_)
  }

  render() {

    return (
      <header className="TopHeader">
        <h1><a href="#">ack.mo</a></h1>
        <div className="pull-right">
          <OrgsSelector></OrgsSelector>
          <GithubLogin user={ this.props.user } orgs={ this.props.orgs } isLoggingIn={ this.props.isLoggingIn } />
        </div>
      </header>
    )

  }

}