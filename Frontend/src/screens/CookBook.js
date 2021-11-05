import React, { Component } from 'react';
import axios from 'axios'

import '../App.css'

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

class CookBook extends Component {
    constructor() {
        super()
        this.state = {
          Meal: '',
          status: 'Submit',
          isActive: false,
        }
      }


    render() {

        return (
            <div id="cookbook">
            <form onSubmit={this.handleSubmit.bind(this)} method='POST'>

            <br />
            <input
              className='form-group-signup'
              onChange={this.handleChange.bind(this)}
              id='meal'
              value={this.state.Meal}
              type='text'
              required
            />

          <button className='LoginButton'>Add</button>

        </form>
        </div>
        )
    }

    handleSubmit(event) {
    
        axios({
          method: 'POST',
          url: `${API_ENDPOINT}/api/recipes`,
          headers: { 'Content-Type': 'application/json' },
          data: {
            Meal: this.state.Meal,
          },
        }).then((response) => {
          if (response.data.answer === 'Success') {
            this.setState({
                Meal: '',
            })
            console.log('Form sent')
          } else if (response.data.answer === 'error') {
            console.log('Error')  
        }
      })}

      handleChange(event) {
        const field = event.target.id
        if (field === 'meal') {
          this.setState({ Meal: event.target.value })

        }
    }
}

export default CookBook