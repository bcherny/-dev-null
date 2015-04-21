import React from 'react'

export default class FavList extends React.Component {

  constructor (_) {
    super(_)
  }

  render() {

    if (!this.props.user || !this.props.orgs) {
      return <div />
    }

    // "_json" means something to the react transpiler :|
    const items = [
      { avatar_url: this.props.user['_json'].avatar_url, login: 'Mine' },
      { avatar: '', login: 'Public' }
    ]
      .concat(this.props.orgs || [])
      .map(_ => <li><img src={ _.avatar_url } />{ _.login }</li>)

    return (
      <section className="FavList">
        <h2>Favorites</h2>
        <ul>{ items }</ul>
      </section>
    )

  }

}