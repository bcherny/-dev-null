import { assign, uniqueId } from 'lodash'
import React from 'react'
import addons from 'react/addons'

const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup
const SHOW_TIME = 2000 // how long to show a notification for, in ms

export class Notifications extends React.Component {

  constructor (_) {
    super(_)
  }

  static renderNotifications (notifications: array) {
    React.render(
      <Notifications notifications={notifications} />,
      document.querySelector('#notifications')
    )
  }

  buildNotification (n: Notification) {
    return <NotificationElement
      key={ n.key }
      className={ n.className }
      onClose={ n.onClose }
      onMouseOver={ n.onMouseOver }
      onMouseOut={ n.onMouseOut }
    >
      { n.content }
    </NotificationElement>
  }

  render() {
    return (
      <ReactCSSTransitionGroup transitionName="slide-vertical">
        { this.props.notifications.map(this.buildNotification) }
      </ReactCSSTransitionGroup>
    );
  }

}

export default class Notification {

  close() {
    this.stopTimer()
    Notifications.renderNotifications([])
  }

  startTimer(): number {
    this.stopTimer()
    this.timeout = setTimeout(this.close.bind(this), SHOW_TIME)
  }

  stopTimer(): undefined {
    clearTimeout(this.timeout)
  }

  constructor (content: string, className: string) {

    assign(this, {
      key: uniqueId(),
      className: className,
      onClose: this.close.bind(this),
      onMouseOver: function(){}, // this.stopTimer.bind(this),
      onMouseOut: function(){}, // this.startTimer.bind(this),
      content: content,
      timeout: this.startTimer()
    })

    Notifications.renderNotifications([this])

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

// prime Notifications, so animations will trigger
Notifications.renderNotifications([])