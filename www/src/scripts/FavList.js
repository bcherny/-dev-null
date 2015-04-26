import React from 'react'
import { giver } from './App'

export default class FavList extends React.Component {

  constructor (_) {
    super(_)
  }

  componentDidMount() {

    giver
      .askFor('orgs')
      .then(orgs => this.setState({ orgs: orgs }))

  }

  render() {

    if (!this.props.user || !this.state.orgs) {
      return <div />
    }

    // "_json" means something to the react transpiler :|
    const items = [
      { avatar_url: this.props.user['_json'].avatar_url, login: 'Mine' },
      { avatar: '', login: 'Public' }
    ]
      .concat(this.props.orgs || [])
      .map(_ => <li><a><img src={ _.avatar_url } />{ _.login }</a></li>)

    return (
      <section className="FavList">
        <h2>Favorites</h2>
        <ul>{ items }</ul>
      </section>
    )

  }

}