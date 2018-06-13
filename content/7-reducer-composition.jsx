/**
 * The previous example has the reducer handling
 * - how the state is updated
 * - how individual actions to update the state are implemented.
 * 
 * Reducer composition is a convention used to decouple this logic. The reducer handles state updates,
 * and within each action case, we call a composer function to recompose items in the state array.
 * 
 * Different reducers are responsible for updating different parts of the state tree in response to actions.
 * While there's a single top-level reducer managing the state of your app, it's convenient to express this main reducer 
 * in many smaller reducers that call on each other.
 */


// convention is the composer has these params: current state, new action
const todo = (state, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                id: action.id,
                text: action.text,
                completed: false
            };
        case 'TOGGLE_TODO':
            if (state.id !== action.id) {
                return state;
            };
            return {
                ...state,
                completed: !state.completed
            }
        default:
            return state;
    };
}

const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return todo(undefined, action);

        case 'TOGGLE_TODO':
            return state.map(t => todo(t, action));
        default:
            return state;
    }
};

const testAddTodo = () => {
    const stateBefore = [];
    const action = {
        type: 'ADD_TODO',
        id: 0,
        text: 'Learn Redux'
    };
    const stateAfter = [
        {
            id: 0,
            text: 'Learn Redux',
            completed: false
        }
    ];
    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(
        todos(stateBefore, action)
    ).toEqual(stateAfter);
}

const testToggleTodo = () => {
    const stateBefore = [
        {
            id: 0,
            text: 'Learn Redux',
            completed: false
        },
        {
            id: 1,
            text: 'Go shopping',
            completed: false
        }
    ];
    const action = {
        type: 'TOGGLE_TODO',
        id: 1
    };
    const stateAfter = [
        {
            id: 0,
            text: 'Learn Redux',
            completed: false
        },
        {
            id: 1,
            text: 'Go shopping',
            completed: true
        }
    ];

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(
        todos(stateBefore, action)
    ).toEqual(stateAfter);
}
testAddTodo();
testToggleTodo();
console.log('All tests passed!');

// More from Dan Abramov re: duplicating `switch` statements
/**
 *  ...I think you’re mistaken when you say switch statements are duplication. 
 * In a large app, you’ll have a `switch` statement inside every reducer, and some of them will handle the same actions. 
 * This is normal—not something to abstract away. With the approach you’re suggesting, you’re trading a visual duplication (`switch` statements) 
 * for logical duplication (code to update a single item in an array).
 */
