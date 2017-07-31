import React, { Component } from 'react';
import { Button } from 'react-bootstrap'
import './App.css';

class App extends Component {
  constructor() {
    super()

    this.state = {
      revenue: [
      {
        oneTime: '100.00',
        monthly: '50.00'
      },
      {
        oneTime: '50.00',
        monthly: '25.00'
      }],
      expenses:[{
        oneTime: '500.00',
        monthly: '20.00'
      },
      {
        oneTime: '200.00',
        monthly: '40.00'
      }]
    }
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleDelete(type, index) {
    console.log(type, index)
  }

  render() {
    let revenueTableData = this.state.revenue.map((item, index) => {
      return (
        <tr key={"revenue" + index}>
          <td>Item {index + 1}</td>
          <td>${item.oneTime}</td>
          <td>${item.monthly}</td>
          <td><Button onClick={() => this.handleDelete('revenue', index)}>Delete</Button></td>
        </tr>
      )
    })

    let expensesTableData = this.state.expenses.map((expense, index) => {
      return (
        <tr key={"expense" + index}>
          <td>Expense {index + 1}</td>
          <td>${expense.oneTime}</td>
          <td>${expense.monthly}</td>
          <td><Button onClick={() => this.handleDelete('expense', index)}>Delete</Button></td>
        </tr>
      )
    })

    return (
      <div>
        <h1 className="text-center">ROI Calculator</h1>
        <div className="roi-tables">
          <table className="revenue-table">
            <thead>
              <tr>
                <th></th>
                <th>One-Time</th>
                <th>Monthly</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {revenueTableData}
            </tbody>
          </table>
          <table className="expenses-table">
            <thead>
              <tr>
                <th></th>
                <th>One-Time</th>
                <th>Monthly</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {expensesTableData}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
