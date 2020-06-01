import { takeEvery } from 'redux-saga/effects'
import * as actionTypes from '../actions/actionTypes'
import {logoutSaga, checkAuthTimeoutSaga, authUserSaga, authCheckStateSaga} from './auth'
import {initIngredientsSaga} from './burgerBuilder'
import {purchaseBurgerSaga ,fetchOrdersSaga} from './orders'

export function* watchAuth () {
    yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)
    yield takeEvery(actionTypes.AUTH_USER, authUserSaga)
    yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga)
    yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga)
}

export function* watchBurderBuilder () {
    yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga)
}

export function* watchOrders () {
    yield takeEvery(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga)
    yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga)
}