import reducer from '../../reducers/reducers'
import {
  INIT_SLIDER_IMAGES,
  FETCH_IMAGES,
  UPDATE_SELECTED_IMAGE,
} from '../../constants/actionTypes'

describe('/ImagesGrid reducer', () => {


  describe(`${INIT_SLIDER_IMAGES}`, () => {

    it(`handles ${INIT_SLIDER_IMAGES}`, () => {
      const initialState = {}
      const action = {
        type: `${INIT_SLIDER_IMAGES}`,
      }
      const nextState = reducer(initialState, action)

      expect(nextState).toEqual({
        images: [{
          thumbnail: 'https://static.pexels.com/photos/3247/nature-forest-industry-rails.jpg'
        }],
        selectedImageIndex: 0,
      })
    })
  })


  describe(`${FETCH_IMAGES}`, () => {

    it(`handles ${FETCH_IMAGES}_REQUEST`, () => {
      const initialState = {}
      const action = {
        type: `${FETCH_IMAGES}_REQUEST`,
      }
      const nextState = reducer(initialState, action)

      expect(nextState).toEqual({
        isFetching: true,
        error: null,
      })
    })

    it(`handles ${FETCH_IMAGES}_SUCCESS`, () => {
      const initialState = {
        isFetching: true,
        error: null,
      }
      const imageUrls = ['a.jpg', 'b.jpg', 'c.jpg']
      const action = {
        type: `${FETCH_IMAGES}_SUCCESS`,
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
        images: imageUrls,
      })
    })

    it(`handles ${FETCH_IMAGES}_FAILURE`, () => {
      const initialState = {
        isFetching: true,
        error: null,
      }
      const action = {
        type: `${FETCH_IMAGES}_FAILURE`,
        error: 'some error',
      }
      const nextState = reducer(initialState, action)

      expect(nextState).toEqual({
        isFetching: false,
        error: 'some error',
      })
    })
  })


  describe(`${UPDATE_SELECTED_IMAGE}`, () => {

    it('handles when 0 < index < length', () => {
      const images = ['a.jpg', 'b.jpg', 'c.jpg']
      const initialState = {
        images,
        selectedImageIndex: 0,
      }
      const action = {
        type: `${UPDATE_SELECTED_IMAGE}`,
        imageIndex: 2,
      }
      const nextState = reducer(initialState, action)

      expect(nextState).toEqual({
        images,
        selectedImageIndex: 2,
      })
    })

    it('handles when index < 0', () => {
      const images = ['a.jpg', 'b.jpg', 'c.jpg']
      const initialState = {
        images,
        selectedImageIndex: 0,
      }
      const action = {
        type: `${UPDATE_SELECTED_IMAGE}`,
        imageIndex: -1,
      }
      const nextState = reducer(initialState, action)

      expect(nextState).toEqual({
        images,
        selectedImageIndex: 2,
      })
    })

    it('handles when index >= length', () => {
      const images = ['a.jpg', 'b.jpg', 'c.jpg']
      const initialState = {
        images,
        selectedImageIndex: 2,
      }
      const action = {
        type: `${UPDATE_SELECTED_IMAGE}`,
        imageIndex: 3,
      }
      const nextState = reducer(initialState, action)

      expect(nextState).toEqual({
        images,
        selectedImageIndex: 0,
      })
    })

  })

})
