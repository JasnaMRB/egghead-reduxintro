// flips to-do completed/not
const toggleTodo = (todo) => {
    
    // Hard to maintain; if you add new properties, you have to remember to put them here too
    // ------
    //return {
    //    id: todo.id,
    //     text: todo.text,
    //    completed: !todo.completed
    //}

    // ES6 Object.assign
    // Corresponds with assignment operator
    // {} = object to be mutated, which is why we pass an empty one
    // the last property value assignment wins if there are multiple sources trying to mutate the same property,
    // so, we pass in the whole `todo` object, THEN the flipped `completed` property to override that specific property, superseding the `completed` value in `todo`
    // ------
    // return Object.assign({}, todo, {
    //    completed: !todo.completed
    // });

    // ES7 (?) Object ...spread operator, also available in babel
    // ------
    return {
        ...todo,
        completed: !todo.completed
    };
};

const testToggleTodo = () => {
    const todoBefore = {
        id: 0,
        text: 'Learn Redux',
        completed: false
    };

    const todoAfter = {
        id: 0, 
        text: 'Learn Redux',
        completed: true
    };
    deepFreeze(todoBefore);

    expect(
        toggleTodo(todoBefore)
    ).toEqual(todoAfter);

    expect(
        toggleTodo(todoAfter)
    ).toEqual(todoBefore);
};

testToggleTodo();
console.log('All tests passed!');