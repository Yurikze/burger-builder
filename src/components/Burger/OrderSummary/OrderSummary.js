import React from 'react'
import Aux from '../../../hoc/Aux/Aux'
import Button from '../../UI/Button/Button'

const orderSummary = props => {
  // componentDidUpdate() {
  //   console.log('[OrderSummary] DidUpdate')
  // }
    const ingredientSummary = Object.keys(props.ingredients).map(igKey => {
      return (
        <li key={igKey}>
          <span style={{ textTransfrom: 'capitalize' }}>{igKey}</span>:{' '}
          {props.ingredients[igKey]}
        </li>
      )
    })
    return (
      <Aux>
        <h3>Your order</h3>
        <p>Your amazing burger with following ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <p>
          <strong>Total price: {props.price.toFixed(2)}</strong>
        </p>
        <p>Continue to check out?</p>
        <Button buttonType="Danger" clicked={props.purchaseCancelled}>
          CANCEL
        </Button>
        <Button buttonType="Success" clicked={props.purchaseContinued}>
          CONTINUE
        </Button>
      </Aux>
    )
}

export default orderSummary
