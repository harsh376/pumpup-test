import reducer from '../../reducers/reducers'
import { FETCH_IMAGES_POPULAR } from '../../constants/actionTypes'

describe('/ImagesGrid reducer', () => {

  it('should return initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({})
  })

  it(`handles ${FETCH_IMAGES_POPULAR}_REQUEST`, () => {
    const initialState = {}
    const action = {
      type: `${FETCH_IMAGES_POPULAR}_REQUEST`,
    }
    const nextState = reducer(initialState, action)

    expect(nextState).toEqual({
      isFetching: true,
      error: null,
    })
  })

  it(`handles ${FETCH_IMAGES_POPULAR}_SUCCESS`, () => {
    const initialState = {
      isFetching: true,
      error: null,
    }
    const imageUrls = ['a.jpg', 'b.jpg', 'c.jpg']
    const action = {
      type: `${FETCH_IMAGES_POPULAR}_SUCCESS`,
      images: {
        result: {
          posts: imageUrls,
        },
      },
    }
    const nextState = reducer(initialState, action)

    expect(nextState).toEqual({
      isFetching: false,
      error: null,
      data: imageUrls,
    })
  })

  it(`handles ${FETCH_IMAGES_POPULAR}_FAILURE`, () => {
    const initialState = {
      isFetching: true,
      error: null,
    }
    const action = {
      type: `${FETCH_IMAGES_POPULAR}_FAILURE`,
      error: 'some error',
    }
    const nextState = reducer(initialState, action)

    expect(nextState).toEqual({
      isFetching: false,
      error: 'some error',
    })
  })

})
