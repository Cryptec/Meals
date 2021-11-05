import React, { Component } from 'react'
import generate from './components/getMeals'
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
        answerDenied: "Denied",
        displayMeal: "",
        isActive: false
    };
}

generateMeal = () => {
   this.setState({
    displayMeal: generate(),
    isActive: true
   })
}

  render() {

    let displayMeal = this.state.displayMeal

  return (

    <div className="App">
      <div className="Home">

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
