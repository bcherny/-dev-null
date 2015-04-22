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
    this.givers = new Map()
    this._outstanding = {}
    this.loud = loud || true
  }

  // (channel: any, fn: any): Giver
  provide (channel, fn) {

    let promise = new Promise(resolve => resolve(fn))

    if (this.loud) {
      console.log('provide', channel, fn, promise)
    }

    if (this.givers.has(channel)) {
      console.warn(`overriding existing value in channel ${ channel }:`, this.givers.get(channel))
    }

    this.givers.set(channel, promise)

    if (this._outstanding[channel]) {
      this._outstanding[channel](promise)
    }

    return this

  }

  // (channel: any): Promise
  askFor (channel) {

    const res = this.givers.get(channel)

    if (this.loud) {
      console.info('askFor', channel, res)
    }

    if (!res) {
      return new Promise((resolve) => this._outstanding[channel] = resolve)
    }

    return res

  }

}