import React, { useState, useEffect } from 'react'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from './Auth.css'
import { updateObject, checkValidity } from '../../shared/utility'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import * as actions from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'

const auth = props => {
  const [authForm, setAuthForm] = useState({
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'Your email',
          placeholder: 'email',
        },
        value: '',
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Your password',
        },
        value: '',
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    })
    const [isSignup, setIsSignup] = useState(true)
  

    useEffect(() => {
      if (!props.buildingBurger && props.authRedirectPath !== '/') {
        props.setAuthRedirectPath()
    }}, [])
  


  const inputChangeHndler = (event, controlName) => {
    const changedControls = updateObject(authForm, {
      [controlName]: updateObject(authForm[controlName], {
        value: event.target.value,
        touched: true,
        valid: checkValidity(
          event.target.value,
          authForm[controlName].validation
        ),
      }),
    })

    setAuthForm(changedControls)
  }

  const submitHandler = (event) => {
    event.preventDefault()
    props.onAuth(
      authForm.email.value,
      authForm.password.value,
      isSignup
    )
  }

  const switchAuthModeHandler = () => {
    setIsSignup(!isSignup)
  }

    let authRedirect = null
    if (props.isAuthenticated) {
      authRedirect = <Redirect to={props.authRedirectPath} />
    }

    let formElementsArray = []
    for (let key in authForm) {
      formElementsArray.push({
        id: key,
        config: authForm[key],
      })
    }

    let form = formElementsArray.map((formElement) => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        value={formElement.config.value}
        changed={(event) => inputChangeHndler(event, formElement.id)}
      />
    ))

    if (props.loading) {
      form = <Spinner />
    }

    let errorMessage = null

    if (props.error) {
      console.log(props.error.message)
      errorMessage = <p>{props.error.message}</p>
    }

    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMessage}
        <form onSubmit={submitHandler}>
          {form}
          <Button buttonType="Success">SUBMIT</Button>
        </form>
        <Button clicked={switchAuthModeHandler} buttonType="Danger">
          SWITCH TO {isSignup ? 'SIGNIN' : 'SIGNUP'}
        </Button>
      </div>
    )
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.idToken !== null,
    authRedirectPath: state.auth.authRedirectPath,
    buildingBurger: state.burgerBuilder.building,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(auth)
