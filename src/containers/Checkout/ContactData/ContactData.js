import React, { useState } from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css'
import axios from '../../../axios-order'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import { connect } from 'react-redux'
import { updateObject, checkValidity } from '../../../shared/utility'
import * as actions from '../../../store/actions/index'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'

const contactData = (props) => {
  const [orderForm, setOrderForm] = useState({
    name: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Your name',
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    street: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Street',
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    zipCode: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'ZIP Code',
      },
      value: '',
      validation: {
        required: true,
        minLength: 5,
        maxLength: 5,
      },
      valid: false,
      touched: false,
    },
    country: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Country',
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Your E-Mail',
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    deliveryMethod: {
      elementType: 'select',
      elementConfig: {
        options: [
          { value: 'fastest', displayValue: 'Fastext' },
          { value: 'cheapest', displayValue: 'Cheapest' },
        ],
      },
      value: 'fastest',
      validation: {},
      valid: true,
    },
  })

  const [formIsValid, setFormIsValid] = useState(false)

  const orderHandler = (event) => {
    event.preventDefault()
    const formData = {}
    for (let formElementIdentifier in orderForm) {
      formData[formElementIdentifier] = orderForm[formElementIdentifier].value
    }
    const order = {
      ingredients: props.ingredients,
      price: props.totalPrice,
      orderData: formData,
      userId: props.userId,
    }
    props.onOrderBurger(order, props.token)
  }

  const changedInputHandler = (event, inputIdentifier) => {
    // { ...updatedOrderForm[inputIdentifier] }
    const updatedFormElement = updateObject(orderForm[inputIdentifier], {
      value: event.target.value,
      valid: checkValidity(
        event.target.value,
        orderForm[inputIdentifier].validation
      ),
      touched: true,
    })
    const updatedOrderForm = updateObject(orderForm, {
      [inputIdentifier]: updatedFormElement,
    })

    updatedOrderForm[inputIdentifier] = updatedFormElement
    let formIsValid = true
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
    }
    setOrderForm(updatedOrderForm)
    setFormIsValid(formIsValid)
  }

  let formElementsArray = []
  for (let key in orderForm) {
    formElementsArray.push({
      id: key,
      config: orderForm[key],
    })
  }

  let form = (
    <form onSubmit={orderHandler}>
      {formElementsArray.map((formElement) => (
        <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          invalid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
          value={formElement.config.value}
          changed={(event) => changedInputHandler(event, formElement.id)}
        />
      ))}

      <Button buttonType="Success" disabled={!formIsValid}>
        ORDER
      </Button>
    </form>
  )
  if (props.loading) {
    form = <Spinner />
  }
  return (
    <div className={classes.ContactData}>
      <h4>Enter your contact data</h4>
      {form}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.idToken,
    userId: state.auth.userId,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(actions.pusrchaseBurger(orderData, token)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(contactData, axios))
