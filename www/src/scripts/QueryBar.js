import { toArray } from 'lodash'
import React from 'react'
import CodeMirror from 'codemirror'
import Sql from 'codemirror/mode/sql/sql'
import request from 'superagent'
import { giver } from './App'

export default class QueryBar extends React.Component {

  constructor (_) {
    super(_)
    this.state = {}
  }

  componentDidMount() {

    // TODO: store the user's currently selected org
    giver
      .askFor('org')
      .then(org => {
        this.setState({ org: org })
      })

  }

  submit (query: string) {
    console.log('submit', query)

    request
      .post('/eval')
      .send({
        settings: {

        },
        query: query,
        type: 'db',
        flavor: 'mysql'
      })
      .end((err, res) => {
        if (err) throw err
        console.log('response!', res)
      })
  }

  componentDidUpdate() {

    if (!this.state.org) {
      return
    }

    // TODO: figure out a better way to clean up old codemirror instances
    toArray(document.querySelectorAll('.CodeMirror'))
      .forEach(e => e.parentNode.removeChild(e))

    let editor = CodeMirror
      .fromTextArea(document.querySelector('.QueryBar'), {
        autofocus: true,
        extraKeys: {
          'Cmd-Enter': () => {
            this.submit(editor.getValue())
          }
        },
        mode: 'sql',
        theme: 'monokai'
      })

  }

  render() {

    if (!this.state.org) {
      return <div></div>
    }

    return (
      <textarea className="QueryBar" placeholder="Enter a query..." tabindex="0"></textarea>
    )
  }


}