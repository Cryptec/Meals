import React, { Component } from 'react';
import axios from 'axios'

import '../App.css'
import Table from '../components/Table';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

class CookBook extends Component {
    constructor() {
        super()
        this.state = {
          meal: "",
          isActive: false,
          count: 0
        }
      }


    render() {

        return (
            <div id="cookbook">
            <Table key={this.state.count}/>
            <div className="input">
            <form onSubmit={this.handleSubmit.bind(this)} method='POST'>

            <br />
            <input
              className="inputfield"
              onChange={this.handleChange.bind(this)}
              id='meal'
              value={this.state.meal}
              type='text'
              required
            />

          <button className='addButton'>Add</button>

        </form>
        </div>
        </div>
        )
    }

    handleChange(event) {
        const field = event.target.id
        if (field === 'meal') {
          this.setState({ meal: event.target.value })

        }
    }
    
    handleSubmit(event) {
      event.preventDefault();

        axios({
          method: 'POST',
          url: `${API_ENDPOINT}/api/recipes`,
          headers: { 'Content-Type': 'application/json' },
          data: {
            meal: this.state.meal,
          },
        }).then((response) => {
          if (response.data.answer === 'Success') {
            this.setState({
                meal: '',
                count: this.state.count + 1 
            })
            console.log('Meal added')
          } else if (response.data.answer === 'error') {
            console.log('Error')  
        }
      })}
}

export default CookBook