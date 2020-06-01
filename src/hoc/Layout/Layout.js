import React, { useState } from 'react'
import Aux from '../Aux/Aux'
import classes from './Layout.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import { connect } from 'react-redux'

const layout = (props) => {
  const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false)

  const closeSideDrawerHandler = () => {
    setSideDrawerIsVisible(false)
  }

  const sideDrawerToggleHandler = () => {
    setSideDrawerIsVisible(!sideDrawerIsVisible)
  }

  return (
    <Aux>
      <Toolbar
        isAuthenticated={props.isAuthenticated}
        drawerToggleClicked={sideDrawerToggleHandler}
      />
      <SideDrawer
        isAuthenticated={props.isAuthenticated}
        show={sideDrawerIsVisible}
        closed={closeSideDrawerHandler}
      />
      <main className={classes.Content}>{props.children}</main>
    </Aux>
  )
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.idToken !== null,
  }
}

export default connect(mapStateToProps)(layout)
