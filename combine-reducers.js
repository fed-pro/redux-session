export function combineReducers(reducerMap) {
  return (state, action) => {
    const nextState = {};

    Object.keys(reducerMap).forEach(key => {
      nextState[key] = reducerMap[key](state[key], action);
    })

    return nextState;
  }
}

