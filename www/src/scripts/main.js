class App extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      orgs: null,
      user: null,
      isLoggingIn: false
    }
  }

  getUser() {
    return $.get('/user')
  }

  getOrgs() {
    return $.get('/user/orgs')
  }

  componentDidMount() {

    this
      .setState({ isLoggingIn: true })

    this

      // when the component loads, check if the user is signed in
      .getUser()
      .done(_ => this.setState({ user: _ }))
      .fail(_ => this.setState({ user: null }))
      .always(_ => this.setState({ isLoggingIn: false }))

      // then, fetch their github orgs
      .then(_ => this.getOrgs())
      .done(_ => this.setState({ orgs: _ }))
      .fail(_ => this.setState({ orgs: null }))
      .always(_ => this.setState({ isLoggingIn: false }))

  }

  render() {
    return (
      <div>
        <GithubLogin user={ this.state.user } orgs={ this.state.orgs } isLoggingIn={ this.state.isLoggingIn } />
        <QueryBar />
        <FavList orgs={ this.state.orgs } isLoggingIn={ this.state.isLoggingIn } />
      </div>
    )
  }


}

class FavList extends React.Component {

  constructor (props) {
    super(props)
  }

  render() {

    const items = ['Mine', 'Public']
      .map(_ => { return { login: _ }}) // damn es6 is weird
      .concat(this.props.orgs || [])
      .map(_ => <li>{ _.login }</li>)

    return (
      <section className="FavList">
        <h2>Favorites</h2>
        <ul>{ items }</ul>
        { this.props.isLoggingIn ? <em>Loading orgs...</em> : <small>Last updated { moment().format('h:ma') }</small> }
      </section>
    )

  }

}

class GithubLogin extends React.Component {

  constructor (props) {
    super(props)
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
      ? <div>logged in!</div>
      : <a onClick={this.login.bind(this)}>Sign into Github</a>

    return (
      <div className="GithubLogin">
        { githubLogin }
      </div>
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
      <input className="QueryBar" placeholder="Enter a query..." type="text" />
    )
  }


}

React.render(
  <App />,
  document.querySelector('#main')
)