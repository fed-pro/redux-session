import { createStore } from './store.js'
import { combineReducers } from './combine-reducers.js'
import { applyMiddleware } from './apply-middleware.js';

function uiReducer(ui, action) {
  const { type, payload } = action;

  if (type === 'setLoading') {
    return { ...ui, loading: payload }
  }

  return ui;
}

function usersReducer(users, action) {
  const { type, payload } = action;

  if (type === 'setUsers') {
    return [...users, payload]
  }

  return users;
}

const appState = {
  users: [],
  ui: { loading: false }
};

const rootReducer = combineReducers({
  users: usersReducer,
  ui: uiReducer
})


function apiMiddleware({getState}) {
  return function nextMiddlewareInLine(next) {
    return function actionHandler(action) {
      if(action.type === 'API_REQUEST') {
        console.log('stop here and go to server');
        next({type: 'setLoading', payload: true})
      }
    }
  }
}

const store = createStore(rootReducer, appState, applyMiddleware(apiMiddleware));

store.subscribe(() => {
  console.log('subscription:', store.getState());
})

const fetchUsers = {
  type: 'API_REQUEST',
  metadata: {
    url: 'https://jsonplaceholder.typicode.com/users',
    method: 'GET',
  },
}

store.dispatch(fetchUsers);





