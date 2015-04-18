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
      didCheckLogin: false
    }
  }

  getUser() {
    return $.get('/user')
  }

  getOrgs() {
    return $.get('/user/orgs')
  }

  login() {
    window.location.pathname = '/login'
  }

  componentDidMount() {

    this

      // when the component loads, check if the user is signed in
      .getUser()
      .done(_ => this.setState({ user: _ }))
      .fail(_ => this.setState({ user: null }))
      .always(_ => this.setState({ didCheckLogin: true }))

      // then, fetch their github orgs
      .then(_ => this.getOrgs())
      .done(_ => this.setState({ orgs: _ }))
      .fail(_ => this.setState({ orgs: null }))
      .always(_ => this.setState({ didCheckLogin: true }))

  }

  render() {

    if (!this.state.didCheckLogin) {
      return <div>...</div>
    }

    console.info('got user', this.state.user, this.state.orgs)

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