import fetch from 'isomorphic-fetch'

import {
  FETCH_IMAGES_POPULAR,
} from '../constants/actionTypes'


const SESSION_TOKEN = [
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3',
  'MiOjI3MDc3OTgsImV4cCI6MTUzOTUzNTI1OTM2OH0.U',
  'K2qP1yk9QLk_Bkx1Ly0RPaitRYtec8ojZhzYRc0D-g'
].join('')

/**
 *****************
 * FETCH_IMAGES_POPULAR
 *****************
 */

function fetchImagesSuccess(images) {
  return {
    type: `${FETCH_IMAGES_POPULAR}_SUCCESS`,
    images,
  }
}

function fetchImagesFailure(error) {
  return {
    type: `${FETCH_IMAGES_POPULAR}_FAILURE`,
    error,
  }
}

export function fetchImages() {
  return function fetchImagesPopular(dispatch) {
    dispatch({ type: `${FETCH_IMAGES_POPULAR}_REQUEST` })

    return fetch('http://api.pumpup.com/1/functions/feed/popular/load-batch', {
      method: 'POST',
      headers: new window.Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        _method: 'POST',
        _version: '4.7.0',
        isThumbnailsOnly: true,
        limit: 18,
        _SessionToken: SESSION_TOKEN,
      }),
    })
    .then((response) => {
      if (response.ok) {
        return response.json()
      }
      throw new Error('Fetch images popular failed')
    })
    .then(images => dispatch(fetchImagesSuccess(images)))
    .catch(e => dispatch(fetchImagesFailure(e)))
  }
}
