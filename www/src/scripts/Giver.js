/*

  Giver

  like pub/sub, but for getting data

  @usage

    let myGiver = new Giver

    myGiver.provide('foo/bar', () => 42)
    myGiver
      .askFor('foo/bar')
      .then(value => ...)

 */

export default class Giver {

  constructor (loud) {
    this.givers = {}
    this._outstanding = {}
    this.loud = loud || true
  }

  // (channel: string, fn: any): Giver
  provide (channel, fn) {

    let promise = new Promise(resolve => resolve(fn))

    if (this.loud) console.log('provide', channel, fn, promise)

    this.givers[channel] = promise

    if (this._outstanding[channel]) {
      this._outstanding[channel](promise)
    }

    return this

  }

  // (channel: string): Promise
  askFor (channel) {

    if (this.loud) console.info('askFor', channel, this.givers[channel])

    if (!this.givers[channel]) {
      return new Promise((resolve) => this._outstanding[channel] = resolve)
    }

    return this.givers[channel]

  }

}