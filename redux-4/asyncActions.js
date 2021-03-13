const redux = require('redux')
const createStore = redux.createStore

// REDUX-THUNK -> (MIDDLEWARE)
// - Define asynch ACTION CREATORS
const applyMiddleware =  redux.applyMiddleware

const thunkMiddleWare = require('redux-thunk').default

// AXIOS
// - Request to an API endpoint
const axios = require('axios')

const initialState = {
    loading: false,
    users: [],
    error: ''
}

const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST'
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE'

const fetchUsersRequest = () => {
    return {
        type: FETCH_USERS_REQUEST
    }
}

const fetchUsersSuccess = users => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
}

const fetchUsersFailure = error => {
    return {
        type: FETCH_USERS_FAILURE,
        payload: error
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_USERS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_USERS_SUCCESS:
            return {
                loading: false,
                users: action.payload,
                error: ''
            }
        case FETCH_USERS_FAILURE:
            return {
                loading: false,
                users: [],
                error: action.payload
            }
    }

}

const fetchUsers = () => {
    return function(dispatch) {

        dispatch(fetchUsersRequest()) // just set loading to true!

        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                const users = response.data
                dispatch(fetchUsersSuccess(users.map(user => user.name)))
                // response.data is the array of users
            })
            .catch(error => {
                // error.message is the error description
                dispatch(fetchUsersFailure(error.message))
            })
    }
}

const store = createStore(reducer, applyMiddleware(thunkMiddleWare))
store.subscribe(() => { console.log(store.getState()) })
store.dispatch(fetchUsers())