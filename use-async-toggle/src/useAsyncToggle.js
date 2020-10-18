import React from 'react';

const callAll = (errCallback, ...fns) => async (...args) => {
  for (let fn of fns) {
    try {
      let res = await fn?.(...args);
      console.log("from fn of fns", fn.name, res);
    } catch (error) {
      console.log(error.message);
      errCallback();
      break;
    }
  }
  console.log("callAll ends");
};

function toggleReducer(state, { type }) {
  switch (type) {
    case "toggle": {
      return { on: !state.on, pending: false };
    }
    case "start loading": {
      return { on: state.on, pending: true };
    }
    case "stop loading": {
      return { on: state.on, pending: false };
    }
    default: {
      throw new Error(`Unsupported type: ${type}`);
    }
  }
}

export default function useAsyncToggle({ initialOn = false, reducer = toggleReducer } = {}) {
  const { current: initialState } = React.useRef({
    on: initialOn,
    pending: false
  });
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { on, pending } = state;

  const toggle = () => {
    dispatch({ type: "toggle" });
  };
  const startLoading = () => dispatch({ type: "start loading", initialState });
  const stopLoading = () => dispatch({ type: "stop loading", initialState });
  const forwardError = (e) => {
    throw e;
  };
  function getTogglerProps({ onClick, ...props } = {}) {
    return {
      "aria-pressed": on,
      on,
      pending,
      onClick: callAll(stopLoading, startLoading, onClick, toggle),
      ...props
    };
  }

  return {
    on,
    pending,
    toggle,
    startLoading,
    stopLoading,
    getTogglerProps,
    forwardError // to be called in case error for custom onClick is being handled externally
  };
}