import React, { Component } from 'react'
import Aux from '../../../hoc/Aux/Aux'
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {
  // componentDidUpdate() {
  //   console.log('[OrderSummary] DidUpdate')
  // }
  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => {
      return (
        <li key={igKey}>
          <span style={{ textTransfrom: 'capitalize' }}>{igKey}</span>:{' '}
          {this.props.ingredients[igKey]}
        </li>
      )
    })
    return (
      <Aux>
        <h3>Your order</h3>
        <p>Your amazing burger with following ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <p>
          <strong>Total price: {this.props.price.toFixed(2)}</strong>
        </p>
        <p>Continue to check out?</p>
        <Button buttonType="Danger" clicked={this.props.purchaseCancelled}>
          CANCEL
        </Button>
        <Button buttonType="Success" clicked={this.props.purchaseContinued}>
          CONTINUE
        </Button>
      </Aux>
    )
  }
}

export default OrderSummary
