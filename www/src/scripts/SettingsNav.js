import { get } from 'lodash'
import React from 'react'
import { Link } from 'react-router'
import { giver } from './App'

export default class SettingsNav extends React.Component {
  
  constructor(_) {
    super(_)
    this.state = {}
  }

  componentDidMount() {

    giver
      .askFor('connections')
      .then(connections => {
        this.setState({ connections: connections })
      })

  }

  render() {

    const db = (
      <svg x="0px" y="0px" width="100px" height="100px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" className="icon-db">
        <path d="M50,0C22.386,0,0,3.214,0,7.179v21.886c0,3.964,22.386,7.179,50,7.179c27.612,0,50-3.215,50-7.179V7.179  C100,3.214,77.612,0,50,0z"/>
        <path d="M50,46.24c-27.614,0-50-3.215-50-7.179v21.885c0,3.964,22.386,7.18,50,7.18c27.612,0,50-3.216,50-7.18V39.061   C100,43.025,77.612,46.24,50,46.24z"/>
        <path d="M50,78.116c-27.614,0-50-3.216-50-7.181v21.886C0,96.787,22.386,100,50,100c27.612,0,50-3.213,50-7.179V70.936   C100,74.9,77.612,78.116,50,78.116z"/>
      </svg>
    )

    const connection = <svg width="79.812px" height="79.812px" viewBox="0 0 79.812 79.812" enable-background="new 0 0 79.812 79.812">
        <path className="icon-connection-f" d="M22.75,10.342c-0.041-0.045-0.07-0.097-0.112-0.139l-8.965-8.965c-1.589-1.588-4.165-1.589-5.754,0
          L1.239,7.918c-1.589,1.59-1.589,4.167-0.001,5.755l8.965,8.965c0.042,0.042,0.094,0.071,0.138,0.113
          c-4.885,10.036-3.186,22.472,5.148,30.806l38.066-38.066C45.221,7.155,32.786,5.457,22.75,10.342z"/>
        <path className="icon-connection-m" d="M78.636,66.202l-8.964-8.965c-0.043-0.043-0.095-0.072-0.141-0.113c4.886-10.036,3.189-22.469-5.148-30.806
          L53.077,37.623l-6.09-6.09c-0.842-0.842-2.205-0.842-3.047,0c-0.842,0.842-0.841,2.205,0.001,3.046l6.09,6.09l-9.363,9.364
          l-6.09-6.09c-0.842-0.842-2.207-0.841-3.047,0c-0.841,0.84-0.841,2.205,0.001,3.046l6.09,6.09L26.316,64.384
          c8.337,8.338,20.771,10.035,30.807,5.148c0.042,0.045,0.071,0.098,0.114,0.141l8.965,8.963c1.588,1.59,4.165,1.59,5.755,0
          l6.679-6.68C80.225,70.366,80.225,67.79,78.636,66.202z"/>
      </svg>

    const endpoints = (this.state.connections || []).map (_ => {
      return (
        <li><Link to="settings/endpoints">{ db }{ _.nickname }</Link></li>
      )
    })

    return (
      <div className="SettingsNav">
        <h2>Settings</h2>
        <ul>
          <li>
            <Link to="settings/endpoints">{ connection }Endpoints <tiny-badge>{ (this.state.connections || []).length }</tiny-badge></Link>
            <ul>
              { endpoints }
            </ul>
          </li>
        </ul>
      </div>
    )
  }

}

SettingsNav.contextTypes = {
  router: React.PropTypes.func
}