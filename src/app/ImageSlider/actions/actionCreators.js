import fetch from 'isomorphic-fetch'

import {
  INIT_SLIDER_IMAGES,
  FETCH_IMAGES,
  UPDATE_SELECTED_IMAGE,
} from '../constants/actionTypes'


const SESSION_TOKEN = [
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3',
  'MiOjI3MDc3OTgsImV4cCI6MTUzOTUzNTI1OTM2OH0.U',
  'K2qP1yk9QLk_Bkx1Ly0RPaitRYtec8ojZhzYRc0D-g'
].join('')

export function initImages() {
  return function initImages(dispatch) {
    dispatch({ type: INIT_SLIDER_IMAGES })
  }
}

export function updateSelectedImage(imageIndex) {
  return function updateSelectedImage(dispatch) {
    dispatch({
      type: UPDATE_SELECTED_IMAGE,
      imageIndex,
    })
  }
}

/**
 *****************
 * FETCH_IMAGES
 *****************
 */

function fetchImagesSuccess(images) {
  return {
    type: `${FETCH_IMAGES}_SUCCESS`,
    images,
  }
}

function fetchImagesFailure(error) {
  return {
    type: `${FETCH_IMAGES}_FAILURE`,
    error,
  }
}

export function fetchImages() {
  return function fetchImagesBatch(dispatch) {
    dispatch({ type: `${FETCH_IMAGES}_REQUEST` })

    return fetch('http://api.pumpup.com/1/functions/feed/profile/load-batch', {
      method: 'POST',
      headers: new window.Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        _method: 'POST',
        _version: '4.7.0',
        isThumbnailsOnly: true,
        limit: 5,
        userId: 2707798,
        _SessionToken: SESSION_TOKEN,
      }),
    })
    .then((response) => {
      if (response.ok) {
        return response.json()
      }
      throw new Error('Fetch images failed')
    })
    .then(images => dispatch(fetchImagesSuccess(images)))
    .catch(e => dispatch(fetchImagesFailure(e)))
  }
}
