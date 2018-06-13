const addCounter = (list) => {

    // BAD: modifies original array
    // list.push(0);
    // return list;

    // Fine:
    // return list.concat([0]);

    // But more concise with the ES6 spread operator
    return [...list, 0];

};

const testAddCounter = () => {
    const listBefore = [];
    const listAfter = [0];

    // `deepFreeze` enforces immutability 
    deepFreeze(listBefore);

    expect(
        addCounter(listBefore)
    ).toEqual(listAfter);
};

const removeCounter = (list, index) => {
    // BAD: modifies original array
    // list.splice(index, 1);
    // return list;

    // `List.slice(a, b)` returns a List from index a to index b
    // Here, get beginning of list to specified index, 
    // then concat with list from specified index +1 to the end
    // e.g. const list = [5,9,1,3]
    // removeCounter(list, 2) => [5,9] ++ [3] == [5,9,3]
    // return list
    //     .slice(0, index)
    //     .concat(List.slice(index + 1))

    // With ES6, spread operator again
    return [
        ...list.slice(0, index),
        ...list.slice(index + 1)
    ];
};

const testRemoveCounter = () => {
    const listBefore = [0, 10, 20];
    const listAfter = [0, 20];

    deepFreeze(listBefore);

    expect(
        removeCounter(listBefore, 1)
    ).toEqual(listAfter);
}

const incrementCounter = (list, index) => {
    // BAD, mutates
    //    list[index]++;
    //    return list;

    // immutable ES5 
    // return list
    //    .slice(0, index)
    //    .concat(list[index] + 1)
    //    .concat(list.slice(index + 1));

    // immutable ES6
    return [
        ...list.slice(0, index),
        list[index] + 1,
        ...list.slice(index + 1)
    ];
};

const testIncrementCounter = () => {
    const listBefore = [0, 10, 20];
    const listAfter = [0, 11, 20];

    deepFreeze(listBefore);

    expect(
        incrementCounter(listBefore, 1)
    ).toEqual(listAfter);
}

testAddCounter();
testRemoveCounter();
testIncrementCounter();
console.log('All tests passed!')