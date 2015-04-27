import React from 'react'

const SHOW_TIME = 2000 // how long to show a notification for, in ms

export default class Notification {

  constructor (content, className) {

    let timeout = null

    let div = document.createElement('div')
    document.body.appendChild(div)

    let close = () => {
      stopTimer()
      React.unmountComponentAtNode(div)
    }

    let startTimer = () => timeout = setTimeout(close, SHOW_TIME)
    let stopTimer = () => {
      clearTimeout(timeout)
      timeout = null
    }

    React.render(
      <NotificationElement className={ className } onClose={ close } onMouseOver={ stopTimer } onMouseOut={ startTimer }>
        { content }
      </NotificationElement>,
      div
    )

    startTimer()

  }

}

export class SuccessNotification {
  constructor (content) {
    return new Notification(content, 'success')
  }
}

export class InfoNotification {
  constructor (content) {
    return new Notification(content, 'info')
  }
}

export class WarningNotification {
  constructor (content) {
    return new Notification(content, 'warning')
  }
}

export class DangerNotification {
  constructor (content) {
    return new Notification(content, 'danger')
  }
}

class NotificationElement extends React.Component {
  
  constructor(_) {
    super(_)
  }

  render() {

    const className = `Notification ${ this.props.className }`

    return (
      <div
        className={ className }
        onMouseOver={ this.props.onMouseOver }
        onMouseOut={ this.props.onMouseOut }
      >
        { this.props.children }
        <a className="close-button" onClick={ this.props.onClose }>&times;</a>
      </div>
    )

  }

}