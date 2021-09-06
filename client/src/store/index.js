import {createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import appReducers  from './reducers';

const ReduxStore = () => {
    // to let the browser know we're using redux, connection with dev tools
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(
        //reducers
        appReducers,
        composeEnhancers(applyMiddleware(thunk))
    )
    return store;
}

export default ReduxStore;
