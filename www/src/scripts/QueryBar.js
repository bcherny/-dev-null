export default class QueryBar extends React.Component {

  constructor (props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <input className="QueryBar" placeholder="Enter a query..." type="text" />
    )
  }


}