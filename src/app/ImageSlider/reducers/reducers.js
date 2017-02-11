import { FETCH_IMAGES } from '../constants/actionTypes'

export default function (state = {}, action) {
  switch (action.type) {

  case `${FETCH_IMAGES}_REQUEST`:
    return Object.assign({}, state, {
      isFetching: true,
      error: null,
    })

  case `${FETCH_IMAGES}_SUCCESS`:
    return Object.assign({}, state, {
      isFetching: false,
      data: action.images.result.posts,
      error: null,
    })

  case `${FETCH_IMAGES}_FAILURE`:
    return Object.assign({}, state, {
      isFetching: false,
      error: String(action.error),
    })

  default:
    return state
  }
}
