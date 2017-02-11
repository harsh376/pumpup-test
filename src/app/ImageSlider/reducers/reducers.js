import {
  INIT_SLIDER_IMAGES,
  FETCH_IMAGES,
  UPDATE_SELECTED_IMAGE,
} from '../constants/actionTypes'

const initialImages = [
  {
    thumbnail: 'https://static.pexels.com/photos/3247/nature-forest-industry-rails.jpg'
  },
]

function updateSelectedImage(state, newIndex) {
  const totalImages = state.images.length
  let index = newIndex

  if (index < 0) {
    index = totalImages - 1
  } else if (index >= totalImages) {
    index = 0
  }

  return Object.assign({}, state, {
    selectedImageIndex: index,
  })
}

export default function (state = {}, action) {
  switch (action.type) {

  case INIT_SLIDER_IMAGES:
    return Object.assign({}, state, {
      images: initialImages,
      selectedImageIndex: 0,
    })

  case UPDATE_SELECTED_IMAGE:
    return updateSelectedImage(state, action.imageIndex)

  case `${FETCH_IMAGES}_REQUEST`:
    return Object.assign({}, state, {
      isFetching: true,
      error: null,
    })

  case `${FETCH_IMAGES}_SUCCESS`:
    return Object.assign({}, state, {
      isFetching: false,
      images: action.images.result.posts,
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
