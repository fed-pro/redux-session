import {compose} from './compose.js'

export function applyMiddleware(...middlewares) {
  return function storeEnhancer(createStore) {
    return function newCreateStore(reducer, initialState) {
        const store = createStore(reducer, initialState);

        let dispatch;

        const middlewareApi = {
          getState: store.getState,
          dispatch: (action) => dispatch(action)
        }

        const chain = middlewares.map(middleware => middleware(middlewareApi));
        dispatch = compose(...chain)(store.dispatch); 

        return {
          ...store,
          dispatch
        }
    }
  
  }
}