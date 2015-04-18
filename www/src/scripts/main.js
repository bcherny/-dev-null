class App extends React.Component {

  constructor (props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
        <GithubLogin></GithubLogin>
        <QueryBar></QueryBar>
      </div>
    )
  }


}

class GithubLogin extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      githubOauthClientId: '5dda5e640b390bc40468',
      githubOauthState: Math.random()*100000000000000000,
      didCheckLogin: false
    }
  }

  // TODO: do this better
  user() {
    return $.get('/user')
  }

  login() {

    window.location.pathname = '/login'

    // $.get('/login').then(console.log)

    // const scope = ['user:email', 'read:org'].join(',')

    // window.location.href = `https://github.com/login/oauth/authorize?client_id=${ this.state.githubOauthClientId }&state=${ this.state.githubOauthState }&scope=${ scope }`

  }

  componentDidMount() {

    this
      .user()
      .done(_ => this.setState({ user: _ }))
      .fail(_ => this.setState({ user: null }))
      .always(_ => this.setState({ didCheckLogin: true }))

  }

  render() {

    if (!this.state.didCheckLogin) {
      return <div>checking...</div>
    }

    console.log('user', this.state.user)

    var githubLogin = this.state.user
      ? <div>logged in!</div>
      : <a onClick={this.login.bind(this)}>Sign into Github</a>

    return (
      githubLogin
    )
  }

}

class QueryBar extends React.Component {

  constructor (props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <input className="QueryBar" type="text" />
    )
  }


}

React.render(
  <App />,
  document.querySelector('#main')
)