import React from 'react'

export default class GithubLogin extends React.Component {

  constructor (_) {
    super(_)
  }

  login() {
    window.location.pathname = '/login'
  }

  render() {

    if (this.props.isLoggingIn) {
      return <div>Signing in...</div>
    }

    console.info('got user', this.props.user, this.props.orgs)

    var githubLogin = this.props.user
      ? <div>{ this.props.user.username }</div>
      : <a onClick={this.login.bind(this)}>Sign into Github</a>

    return (
      <div className="GithubLogin">
        { githubLogin }
      </div>
    )
  }

}