import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

function configureStore(rootReducer, initialState) {
  const createStoreWithMiddleware = compose(
    applyMiddleware(
      thunk,
    ),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  )(createStore)

  return createStoreWithMiddleware(rootReducer, initialState)
}

export default configureStore
