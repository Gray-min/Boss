import { combineReducers } from 'redux'

function a (state = 0, actions) {
  switch (actions.type) {
    case 1:
      return state
    default:
      return state
  }
}

export default combineReducers({ a })