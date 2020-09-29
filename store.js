export function createStore(reducer, initialState, storeEnhancer) {
  let state = initialState || null;
  const listeners = new Set();

  if(storeEnhancer) {
    return storeEnhancer(createStore)(reducer, initialState);
  }

  function getState() {
    return state;
  }

  function dispatch(action) {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  }

  function subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }

  dispatch({ type: '@@INIT' });
  return { getState, dispatch, subscribe };
}