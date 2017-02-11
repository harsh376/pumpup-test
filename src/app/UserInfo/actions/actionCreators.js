import fetch from 'isomorphic-fetch'

import {
  FETCH_USER_INFO,
} from '../constants/actionTypes'


const SESSION_TOKEN = [
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3',
  'MiOjI3MDc3OTgsImV4cCI6MTUzOTUzNTI1OTM2OH0.U',
  'K2qP1yk9QLk_Bkx1Ly0RPaitRYtec8ojZhzYRc0D-g'
].join('')

/**
 *****************
 * FETCH_USER_INFO
 *****************
 */

function fetchUserInfoSuccess(user) {
  return {
    type: `${FETCH_USER_INFO}_SUCCESS`,
    user,
  }
}

function fetchUserInfoFailure(error) {
  return {
    type: `${FETCH_USER_INFO}_FAILURE`,
    error,
  }
}

export function fetchUserInfo() {
  return function fetchUser(dispatch) {
    dispatch({ type: `${FETCH_USER_INFO}_REQUEST` })

    return fetch('http://api.pumpup.com/1/classes/User/318381', {
      method: 'POST',
      headers: new window.Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        _method: 'GET',
        _version: '4.7.0',
        _SessionToken: SESSION_TOKEN,
      }),
    })
    .then((response) => {
      if (response.ok) {
        return response.json()
      }
      throw new Error('Fetch user info failed')
    })
    .then(user => dispatch(fetchUserInfoSuccess(user)))
    .catch(e => dispatch(fetchUserInfoFailure(e)))
  }
}
