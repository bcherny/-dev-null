import React from 'react'
import QueryBar from './QueryBar'

export default class QueryView extends React.Component {

  constructor (_) {
    super(_)
  }

  render() {
    return (
      <div className="QueryView">
        <QueryBar />
      </div>
    )
  }

}