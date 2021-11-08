import React, { Component } from 'react'
import '../App.css'

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

class Table extends Component {
  constructor(props) {
    super(props)
    this.state = {
      meal: [],
      isLoading: false,
      isError: false
    }
  }


async componentDidMount() {
    this.setState({ isLoading: true })
    const response = await fetch(`${API_ENDPOINT}/api/recipes`)
    if (response.ok) {
      const meal = await response.json()
      this.setState({ meal, isLoading: false })
    } else {
      this.setState({ isError: true, isLoading: false })
    }
  }

render() {
  const { meal, isLoading, isError } = this.state

    if (isLoading) {
      return <div className="tableContainer">Loading...</div>
    }

    if (isError) {
      return <div className="tableContainer">Error</div>
    }

    return meal.length > 0
      ? (
        <div className="tableContainer">
        <table className="table">

          <tbody>
            {this.renderTableRows()}
          </tbody>
        </table>
        </div>
      ) : (
      <div className="table">
          No Meals.
      </div>
      )
  }


renderTableRows = () => {
  return this.state.meal.map(user => {
      return (
        <tr key={user.id}>
          <td className="tableData">{user.meal}</td>
          <td className="delButton" onClick={() => this.deleteTableRow(user.id)}>&#10005;</td>
        </tr>
      )
    })
  }

deleteTableRow = async (id) => {
    
  await fetch(`${API_ENDPOINT}/api/recipes/${id}`, {method: 'DELETE'})
  const response = await fetch(`${API_ENDPOINT}/api/recipes`)
  if (response.ok) {
    const meal = await response.json()
    this.setState({ meal, isLoading: false })
  } else {
    this.setState({ isError: true, isLoading: false })
  }
  }
}

export default Table