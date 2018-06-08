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
  }

expect(
    counter(0, { type: 'INCREMENT' })
).toEqual(1)

expect(
    counter(1, { type: 'INCREMENT' })
).toEqual(2)

expect(
    counter(2, { type: 'DECREMENT' })
).toEqual(1)

expect(
    counter(1, { type: 'DECREMENT' })
).toEqual(0)

expect(
    counter(1, { type: 'SOMETHING_ELSE' }) 
  ).toEqual(1);
  

console.log('Tests passed!') 

const { createStore } = Redux; 
// destructuring ^; aka
// var createStore = Redux.createStore;
// aka, using npm
// import { createStore } from 'redux';

// Store binds together 3 principles of Redux, holds current app state object, dispatch actions.
// When created, you need to specify the reducer that tells how state is updated with actions.
const store = createStore(counter);

console.log(store.getState()); // runs current state of Redux store; 0

store.dispatch({ type: 'INCREMENT'}); // most commonly used store method; dispatches actions to change state
console.log(store.getState());

const render = () => {
    document.body.innerText = store.getState();
}
// registers callback that Store calls when an action is dispatched
store.subscribe(render);


// On load
render();

document.addEventListener('click', () => {
    store.dispatch({ type: 'INCREMENT' });
});