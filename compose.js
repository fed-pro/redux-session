export function compose(...functions) {
  if (functions.length === 0) {
    return (arg) => arg;
  }

  if (functions.length === 1) {
    return functions[0];
  }


  function composeFunctions(currentFunction, nextFunction) {
    return (...args) => currentFunction(nextFunction(...args));
  }

  return functions.reduce(composeFunctions)
}