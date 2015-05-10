import { toArray } from 'lodash'
import React from 'react'
import CodeMirror from 'codemirror'
import Sql from 'codemirror/mode/sql/sql'
import request from 'superagent'

export default class QueryBar extends React.Component {

  constructor (_) {
    super(_)
    this.state = {}
  }

  submit (query: string) {
    console.log('submit', query)

    request
      .post('/eval')
      .send({
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
    return (
      <textarea className="QueryBar" placeholder="Enter a query..." tabindex="0"></textarea>
    )
  }


}