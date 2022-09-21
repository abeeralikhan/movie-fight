const debounce = (func, delay = 1000) => {
  let timeoutID;

  // for passing through the event object
  return (...args) => {
    // if previous network call exist, replace it with the new one
    // in other words, "debouncing the input"
    if (timeoutID) {
      clearInterval(timeoutID);
    }
    timeoutID = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};
