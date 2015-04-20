import React from 'react'

export default class QueryBar extends React.Component {

  constructor (_) {
    super(_)
    this.state = {}
  }

  render() {
    return (
      <input className="QueryBar" placeholder="Enter a query..." type="text" />
    )
  }


}