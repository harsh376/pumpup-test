import { FETCH_IMAGES_POPULAR } from '../constants/actionTypes'

export default function (state = {}, action) {
  switch (action.type) {

  case `${FETCH_IMAGES_POPULAR}_REQUEST`:
    return Object.assign({}, state, {
      isFetching: true,
      error: null,
    })

  case `${FETCH_IMAGES_POPULAR}_SUCCESS`:
    return Object.assign({}, state, {
      isFetching: false,
      data: action.images.result.posts,
      error: null,
    })

  case `${FETCH_IMAGES_POPULAR}_FAILURE`:
    return Object.assign({}, state, {
      isFetching: false,
      error: String(action.error),
    })

  default:
    return state
  }
}
