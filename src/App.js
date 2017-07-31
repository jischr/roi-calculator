import React, { Component } from 'react';
import { Button } from 'react-bootstrap'
import './App.css';

class App extends Component {
  constructor() {
    super()

    this.state = {
      revenue: [
      {
        name: 'Item 1',
        oneTime: 100,
        monthly: 50
      },
      {
        name: 'Item 2',
        oneTime: 50,
        monthly: 25
      },
      {
        name: 'Item 3',
        oneTime: 25,
        monthly: 85
      }],
      expenses:[{
        name: 'Expense 1',
        oneTime: 500,
        monthly: 20.00
      },
      {
        name: 'Expense 2',
        oneTime: 200,
        monthly: 40
      }],
      oneTimeRevenue: 175.00,
      oneTimeExpense: 700,
      monthlyRevenue: 160,
      monthlyExpense: 60,
    }
    this.handleDelete = this.handleDelete.bind(this)
  }

  // Delete expense or revenue from list
  handleDelete(type, index) {
    // listType will be 'expenses' or 'revenue' depending on item delete
    let listType = this.state[type]
    // recalculate totals
    if (type === 'expenses') {
      this.setState({
        oneTimeExpense: this.state.oneTimeExpense - this.state.expenses[index]['oneTime'],
        monthlyExpense: this.state.monthlyExpense - this.state.expenses[index]['monthly'],
      })
    } else {
      this.setState({
        oneTimeRevenue: this.state.oneTimeRevenue - this.state.revenue[index]['oneTime'],
        monthlyRevenue: this.state.monthlyRevenue - this.state.revenue[index]['monthly'],
      })
    }
    // remove list item from state
    this.setState({
      [listType]: listType.splice(index, 1),
    })
  }

  render() {
    // create table rows from revenue state list
    let revenueTableData = this.state.revenue.map((item, index) => {
      return (
        <tr key={"revenue" + index}>
          <td>{item.name}</td>
          <td>${item.oneTime}</td>
          <td>${item.monthly}</td>
          <td><Button onClick={() => this.handleDelete('revenue', index)}>Delete</Button></td>
        </tr>
      )
    })
    // create table rows from expenses state list
    let expensesTableData = this.state.expenses.map((expense, index) => {
      return (
        <tr key={"expense" + index}>
          <td>{expense.name}</td>
          <td>${expense.oneTime.toFixed(2)}</td>
          <td>${expense.monthly.toFixed(2)}</td>
          <td><Button onClick={() => this.handleDelete('expenses', index)}>Delete</Button></td>
        </tr>
      )
    })

    // Calculations for totals
    let totalRevenue = this.state.oneTimeRevenue + (this.state.monthlyRevenue * 12)
    let totalExpense = this.state.oneTimeExpense + (this.state.monthlyExpense * 12)
    let monthlyContributionProfit = this.state.monthlyRevenue - this.state.monthlyExpense
    let totalContributionProfit = totalRevenue - totalExpense
    let contributionMargin = (totalContributionProfit / totalRevenue * 100).toFixed(0)
    let capitalROI = ((this.state.oneTimeExpense - this.state.oneTimeRevenue) / monthlyContributionProfit).toFixed(1)

    return (
      <div>
        <h1 className="text-center">ROI Calculator</h1>
        <div className="roi-tables">
          {/* Revenue Table */}
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
          {/* Expenses Table */}
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
          {/* Totals Table */}
          <table className="totals-table">
            <thead>
              <tr>
                <th></th>
                <th>One-Time</th>
                <th>Monthly</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Revenue</td>
                <td>${(this.state.oneTimeRevenue).toFixed(2)}</td>
                <td>${(this.state.monthlyRevenue).toFixed(2)}</td>
                <td>${totalRevenue.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Expenses</td>
                <td>${(this.state.oneTimeExpense).toFixed(2)}</td>
                <td>${(this.state.monthlyExpense).toFixed(2)}</td>
                <td>${totalExpense.toFixed(2)}</td>
              </tr>

              <br/>
              <tr>
                <td>Contribution Profit</td>
                <td></td>
                <td>${monthlyContributionProfit.toFixed(2)}</td>
                <td>${totalContributionProfit.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Contribution Margin</td>
                <td></td>
                <td></td>
                <td>{contributionMargin}%</td>
              </tr>
              <tr>
                <td>Capital ROI (monthly)</td>
                <td></td>
                <td></td>
                <td>{capitalROI}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
