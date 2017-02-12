import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {
  initImages,
  fetchImages,
  updateSelectedImage,
} from '../../actions/actionCreators'
import {
  INIT_SLIDER_IMAGES,
  FETCH_IMAGES,
  UPDATE_SELECTED_IMAGE,
} from '../../constants/actionTypes'
import nock from 'nock'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('/ImageSlider: actionCreators', () => {


  describe('initImages()', () => {

    it(`dispatches ${INIT_SLIDER_IMAGES}`, () => {
      const expectedActions = [
        { type: INIT_SLIDER_IMAGES },
      ]
      const store = mockStore({})

      store.dispatch(initImages())
      expect(store.getActions()).toEqual(expectedActions)
    })
  })


  describe('fetchImages()', () => {
    afterEach(() => {
      nock.cleanAll()
    })

    it(`creates ${FETCH_IMAGES}_SUCCESS when fetching images has been done`, () => {

      // Mocking out the API endpoint
      nock('http://api.pumpup.com')
        .post('/1/functions/feed/profile/load-batch')
        .reply(201, {
          results: {
            posts: ['a.jpg', 'b.jpg'],
          }
        })

      const expectedActions = [
        {
          type: `${FETCH_IMAGES}_REQUEST`
        },
        {
          type: `${FETCH_IMAGES}_SUCCESS`,
          images: {
            results: {
              posts: ['a.jpg', 'b.jpg'],
            }
          }
        }
      ]
      const store = mockStore({})

      return store.dispatch(fetchImages())
        .then(() => { // return of async actions
          expect(store.getActions()).toEqual(expectedActions)
        })
    })
  })


  describe('updateSelectedImage()', () => {

    it(`dispatches ${UPDATE_SELECTED_IMAGE}`, () => {
      const expectedActions = [
        { type: UPDATE_SELECTED_IMAGE, imageIndex: 3 },
      ]
      const store = mockStore({})

      store.dispatch(updateSelectedImage(3))
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

})
