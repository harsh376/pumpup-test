import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { fetchImages } from '../../actions/actionCreators'
import { FETCH_IMAGES_POPULAR } from '../../constants/actionTypes'
import nock from 'nock'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('/ImagesGrid: fetchImages', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it(`creates ${FETCH_IMAGES_POPULAR}_SUCCESS when fetching images has been done`, () => {
    nock('http://api.pumpup.com')
      .post('/1/functions/feed/popular/load-batch')
      .reply(201, {
        results: {
          posts: ['a.jpg', 'b.jpg'],
        }
      })

    const expectedActions = [
      {
        type: `${FETCH_IMAGES_POPULAR}_REQUEST`
      },
      {
        type: `${FETCH_IMAGES_POPULAR}_SUCCESS`,
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
