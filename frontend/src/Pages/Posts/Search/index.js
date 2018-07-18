import React, { Component } from "react"
import Fuse from "fuse.js"
import PeopleJSON from "./3000.json";
import Display from "./Display"
import fuseConfig from "./fuseConfig"

class Search extends Component {
  state = {
    totalData: [],
    peopleFiltered: [],
    initData: false,
    onEnter: false,
    filters: [],
    returnedAmount: 25,
  };

  componentDidMount() {
    this.setState({
      totalData: PeopleJSON,
    });
  }

  handleKeyPress = (event) => {
    const enter = () => {
      if(event.key === "Enter"){
        keyUp()
      }
    }
    const keyUp = () => {
      var fuse = new Fuse(this.state.totalData, fuseConfig)
      this.setState({
        filters: event.target.value,
        peopleFiltered: fuse.search(event.target.value).slice(0,this.state.returnedAmount),
      })
    }
    this.state.onEnter ? enter() : keyUp()
  }

  render() {
    return (
      <div className="App">
        <Display peopleFiltered={this.state.peopleFiltered} onKeyPress={this.handleKeyPress} Filters={this.state.filters} />
      </div>
    )
  }
}

export default Search
