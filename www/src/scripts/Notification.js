import React from 'react'
import addons from 'react/addons'

const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup

let id = 0

export default class Notification {

  constructor (content, className) {

    let div = document.createElement('div')
    document.body.appendChild(div)

    let onClose = () => React.unmountComponentAtNode(div)

    React.render(
      <NotificationElement className={ className } id={ id++ } onClose={ onClose }>
        { content }
      </NotificationElement>,
      div
    )

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
      <ReactCSSTransitionGroup transitionName="slideIn">
        <div className={ className } key={ this.props.id }>
          { this.props.children }
          <a className="close-button" onClick={ this.props.onClose }>&times;</a>
        </div>
      </ReactCSSTransitionGroup>
    )

  }

}