const createStore = (reducer) => {
    let state;
    let listeners = [];

    const getState = () => state;
    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach(listener => listener());
    };

    const subscribe = (listener) => {
        listeners.push(listener);
        return () => {
            listeners = listeners.filter(l => l !== listener); // built-in `unsubscribe`
        }
    }

    dispatch({}); // have initial state populated with dummy state

    return { getState, dispatch, subscribe };
}