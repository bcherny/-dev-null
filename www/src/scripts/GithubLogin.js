import React from 'react'
import { giver } from './App'

export default class GithubLogin extends React.Component {

  constructor (_) {
    super(_)
    this.state = {}
  }

  componentDidMount() {

    giver
      .askFor('user')
      .then(user => this.setState({ user: user }))

  }

  login() {
    window.location.pathname = '/login'
  }

  render() {

    if (this.props.isLoggingIn && !this.state.user) {
      return <div className="GithubLogin">Signing in...</div>
    }

    var githubLogin = this.state.user
      ? <div>Signed in as <strong>{ this.state.user.username }</strong></div>
      : <a onClick={this.login.bind(this)}>Sign into Github</a>

    return (
      <div className="GithubLogin">
        { githubLogin }
      </div>
    )
  }

}