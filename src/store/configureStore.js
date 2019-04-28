import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
// import createLogger from 'redux-logger';
import rootReducer from '../reducers';

export default function configureStore (preloadedState) {
    const store = createStore(
        rootReducer,
        undefined,
        // preloadedState,
        applyMiddleware(thunkMiddleware)
    );

    if (process.env.NODE_ENV !== 'production' && module.hot) {
        module.hot.accept('../reducers', () => store.replaceReducer(rootReducer))
    }

    return store;
}
