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
      githubOauthState: Math.random()*100000000000000000
    }
  }

  login() {

    const scope = ['user:email', 'read:org'].join(',')

    window.location.href = `https://github.com/login/oauth/authorize?client_id=${ this.state.githubOauthClientId }&state=${ this.state.githubOauthState }&scope=${ scope }`

  }

  render() {

    var code = null,
        state = null

    try {
      code = window.location.search.match(/code=([^&]+)/)[1]
      state = window.location.search.match(/state=([^&]+)/)[1]
    } catch (e){}

    console.log(code, state, this.state.githubOauthState)

    if (code && state && !this.state.token) {

      // if (state != this.state.githubOauthState) {
      //   throw new Error ('states don\'t match, possible XSF attack. aborting!')
      // }

      $
      .post(`https://github.com/login/oauth/access_token/client_id=${ this.state.githubOauthClientId }&client_secret=af9b23df713de6a5cfc819a92e0ae6f799a800b3&code=${ code }`)
      .then((data) => {
       console.log(data.token)
      })

    }

    var githubLogin = code
      ? <div>logged in!</div>
      : <a href="#" onClick={this.login.bind(this)}>Sign into Github</a>

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