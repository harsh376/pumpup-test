import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { fetchUserInfo } from '../../actions/actionCreators'
import { FETCH_USER_INFO } from '../../constants/actionTypes'
import nock from 'nock'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('/UserInfo: fetchUserInfo', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it(`creates ${FETCH_USER_INFO}_SUCCESS when fetching user has been done`, () => {

    // Mocking out API call
    nock('http://api.pumpup.com')
      .post('/1/classes/User/318381')
      .reply(201, {
        bio: 'I prefer my #puns intended @foo',
      })

    const expectedActions = [
      {
        type: `${FETCH_USER_INFO}_REQUEST`
      },
      {
        type: `${FETCH_USER_INFO}_SUCCESS`,
        user: {
          bio: 'I prefer my #puns intended @foo',
        }
      }
    ]
    const store = mockStore({})

    return store.dispatch(fetchUserInfo())
      .then(() => { // return of async actions
        expect(store.getActions()).toEqual(expectedActions)
      })
  })
})
