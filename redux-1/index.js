const redux = require('redux')
const createStore = redux.createStore 

const BUY_CAKE = "BUY_CAKE"

// ACTION: Object that has a type property
// {
//     type: BUY_CAKE
// }

// ACTION CREATOR: function that creates an action (Returns the object that contains a type property)
function buyCake() {
    return {
        type: BUY_CAKE,
        info: 'REDUX Action to Buy a Cake' // more properties can be added as well :)
    }
}

// REDUCER: Specifies HOW the app's STATE changes in response to ACTIONS sent to the STORE
// (previousState, action) => newState

const initialState = {
    numOfCakes: 10
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case BUY_CAKE: return {
            ...state,
            numOfCakes: state.numOfCakes - 1
        }

        default: return state
    }
}

// REDUX STORE: one store for the entire application.
// Responsabilities:

// - Holds the application state
// - Allow access to the state via -> getState()
// - Allow state to be updated via -> dispatch(action)
// - Registers listeners via -> subscribe(listener)
// - Handles unregistering of listeners via the function returned by subscribe(listener)

const store = createStore(reducer)
console.log('Initial State: ', store.getState())
const unsubscribe = store.subscribe(() => console.log('Updated State: ', store.getState()))
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
unsubscribe()