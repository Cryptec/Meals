import React, { Component } from 'react'
import generate from './components/getMeals'
import './App.css';

import { openCookBook, closeCookBook } from './utils/handler'
import CookBook from './screens/CookBook';

class App extends Component {
  constructor() {
    super();
    this.state = {
        answerDenied: "Denied",
        displayMeal: "",
        isActive: false,
        nav: true
    };
}

generateMeal = () => {
   this.setState({
    displayMeal: generate(),
    isActive: true
   })
}

toggleOpen = () => {
  openCookBook()
  this.setState({nav: true})
}

toggleClose = () => {
  closeCookBook()
  this.setState({ nav: false })
}

toggleNav = () => {
  this.state.nav ? this.toggleClose() : this.toggleOpen();
}

  render() {

    let displayMeal = this.state.displayMeal

  return (

    <div className="App">
      <div className="Home">
      <CookBook />
      <div className="AddButton" onClick={this.toggleNav}>+</div>
      <div className="displayContainer">
      {this.state.isActive ? <p className="displayText">{displayMeal}</p>  : null }
      </div>

        <button onClick={this.generateMeal} className="displayButton">Create</button>

      </div>
    </div>
  );
  
}


}

export default App;
