import { FETCH_USER_INFO } from '../constants/actionTypes'

export default function (state = {}, action) {
  switch (action.type) {

  case `${FETCH_USER_INFO}_REQUEST`:
    return Object.assign({}, state, {
      isFetching: true,
      error: null,
    })

  case `${FETCH_USER_INFO}_SUCCESS`:
    return Object.assign({}, state, {
      isFetching: false,
      data: action.user,
      error: null,
    })

  case `${FETCH_USER_INFO}_FAILURE`:
    return Object.assign({}, state, {
      isFetching: false,
      error: String(action.error),
    })

  default:
    return state
  }
}
