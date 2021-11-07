import React, { Component } from 'react'
import './App.css';
import CookBook from './screens/CookBook';

import { openCookBook, closeCookBook } from './utils/handler'

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

class App extends Component {
  constructor() {
    super();
    this.state = {
        answerDenied: "Denied",
        isActive: false,
        nav: true,
        meal: [],
        isLoading: false,
        isError: false
    };
}


async componentDidMount() {
    this.setState({ isLoading: true })
    const response = await fetch(`${API_ENDPOINT}/api/randomrecipes`)
    if (response.ok) {
      const meal = await response.json()
      this.setState({ meal, isLoading: false })
    } else {
      this.setState({ isError: true, isLoading: false })
    }
  }

getRecipe = async () => {
    this.setState({ isLoading: true })
    const response = await fetch(`${API_ENDPOINT}/api/randomrecipes`)
    if (response.ok) {
      const meal = await response.json()
      this.setState({ meal, isLoading: false, isActive: true })
    } else {
      this.setState({ isError: true, isLoading: false })
    }
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

  randomMeal = () => {
    return this.state.meal.map(user => {
      return (
        <div key={user.id}>
          <div>{user.meal}</div>
        </div>
      )
    })
  }

  handler = () => {
    const { meal, isError } = this.state

    if (isError) {
      return <div>Error</div>
    }
    return meal.length > 0
      ? (
        <>
            {this.randomMeal()}
        </>
      ) : (
        <div>
          No Meals.
        </div>
      )
  }

  render() {

    return (
    <div className="App">
    <div className="AddButton" onClick={this.toggleNav}>+</div>
        <CookBook />
        <div className="randommeal">
          {this.handler()}
        </div>
        <button onClick={this.getRecipe} className="displayButton">Create</button>

    </div>
      
    )
}


}

export default App;
