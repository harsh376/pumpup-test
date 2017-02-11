import { FETCH_USER_INFO } from '../constants/actionTypes'
import React from 'react'


/**
 * parses the bio and adds hyperlinks for hashtags and mentions
 *
 * @param  {String} bio
 * @return {[]} the bio with links
 */
function getParsedBio(bio) {
  const regex = /(?=[#@])(\S*)/g
  let parts = bio.split(regex)

  for (let i = 1; i < parts.length; i += 2) {
    let isHashTag = parts[i][0] === '#' ? true : false
    let linkedText = parts[i].substring(1)

    let hashLink = `https://twitter.com/hashtag/${linkedText}?src=hash`
    let mentionLink = `https://twitter.com/${linkedText}`
    const l = isHashTag ? hashLink : mentionLink

    parts[i] = <a key={'link' + i} href={l}>{parts[i]}</a>
  }
  return parts
}

function getNewState(state, user) {
  user.bio = getParsedBio(user.bio)

  const newState = Object.assign({}, state, {
    isFetching: false,
    data: user,
    error: null,
  })

  return newState
}


export default function (state = {}, action) {
  switch (action.type) {

  case `${FETCH_USER_INFO}_REQUEST`:
    return Object.assign({}, state, {
      isFetching: true,
      error: null,
    })

  case `${FETCH_USER_INFO}_SUCCESS`:
    return getNewState(state, action.user)

  case `${FETCH_USER_INFO}_FAILURE`:
    return Object.assign({}, state, {
      isFetching: false,
      error: String(action.error),
    })

  default:
    return state
  }
}
