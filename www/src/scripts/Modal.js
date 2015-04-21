import React from 'react'

/*
  @usage

    <Modal title="Foo">
      Content goes here
    </Modal>

 */

export default class Modal extends React.Component {

  constructor(_) {
    super(_)
  }

  render() {

    return (
      <div className="Modal { this.props.className }">
        <header>{ this.props.title }</header>
        <section>{ this.props.children }</section>
      </div>
    )

  }

}