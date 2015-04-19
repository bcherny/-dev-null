import FavList from './FavList'
import TopHeader from './TopHeader'
import QueryBar from './QueryBar'

export default class App extends React.Component {

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
        <TopHeader user={ this.state.user } orgs={ this.state.orgs } isLoggingIn={ this.state.isLoggingIn } />
        <QueryBar />
        <FavList user={ this.state.user } orgs={ this.state.orgs } isLoggingIn={ this.state.isLoggingIn } />
      </div>
    )
  }

}