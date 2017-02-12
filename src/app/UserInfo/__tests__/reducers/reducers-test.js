import reducer from '../../reducers/reducers'
import { FETCH_USER_INFO } from '../../constants/actionTypes'
import React from 'react'

describe('/UserInfo reducer', () => {

  it('should return initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({})
  })

  it(`handles ${FETCH_USER_INFO}_REQUEST`, () => {
    const initialState = {}
    const action = {
      type: `${FETCH_USER_INFO}_REQUEST`,
    }
    const nextState = reducer(initialState, action)

    expect(nextState).toEqual({
      isFetching: true,
      error: null,
    })
  })

  it(`handles ${FETCH_USER_INFO}_SUCCESS`, () => {
    const initialState = {
      isFetching: true,
      error: null,
    }
    const bio = 'I prefer my #puns intended @foo'

    const action = {
      type: `${FETCH_USER_INFO}_SUCCESS`,
      user: {
        bio,
      }
    }
    const nextState = reducer(initialState, action)

    const expected = {
      bio: [
        'I prefer my ',
        <a key='link1' href='https://twitter.com/hashtag/puns?src=hash' target="_blank">#puns</a>,
        ' intended ',
        <a key='link3' href='https://twitter.com/foo' target="_blank">@foo</a>,
        '',
      ]
    }

    expect(nextState).toEqual({
      isFetching: false,
      data: expected,
      error: null,
    })
  })

  it(`handles ${FETCH_USER_INFO}_FAILURE`, () => {
    const initialState = {
      isFetching: true,
      error: null,
    }
    const action = {
      type: `${FETCH_USER_INFO}_FAILURE`,
      error: 'some error',
    }
    const nextState = reducer(initialState, action)

    expect(nextState).toEqual({
      isFetching: false,
      error: 'some error',
    })
  })

})
