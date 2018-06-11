// the reducer
const counter = (state = 0, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        // If something else is returned, convention is to return whatever the previous state would've returned
        default:
            return state;
    }
};

const { createStore } = Redux;
// destructuring ^; aka
// var createStore = Redux.createStore;
// aka, using npm
// import { createStore } from 'redux';

// Store binds together 3 principles of Redux, holds current app state object, dispatch actions.
// When created, you need to specify the reducer that tells how state is updated with actions.
const store = createStore(counter);

console.log(store.getState()); // runs current state of Redux store; 0

store.dispatch({ type: 'INCREMENT' }); // most commonly used store method; dispatches actions to change state
console.log(store.getState());

// a React component
// it's "dumb"; no business logic
const Counter = ({
    value,
    onIncrement,
    onDecrement
  }) => (
    <div>
      <h1>{value}</h1>
      <button onClick={onIncrement}>+</button>
      <button onClick={onDecrement}>-</button>
    </div>
  );

// render without React; compare to `render`
const renderPlain = () => {
    document.body.innerText = store.getState();
};

// render with React
const render = () => {
    ReactDOM.render(
        <Counter value={store.getState()} 
        onIncrement={() =>
            store.dispatch({
                type: 'INCREMENT'
            }) 
        }
        onDecrement={() => 
            store.dispatch({
                type: 'DECREMENT'
            })
        }
        />,
        document.getElementById('root')
    )
};

// registers callback that Store calls when an action is dispatched
// whenever the store changes, call `render`
store.subscribe(render);


// On load
render();