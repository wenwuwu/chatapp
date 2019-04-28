import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
// import { Router, Route, browserHistory } from 'react-router';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Main from './components/Main';
// import { save } from './api';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faPen, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

// const store = configureStore(window.initialState);
const store = configureStore();
// store.subscribe(() => save(store.getState()));

const icons = [
    faComments,
    faPlus,
    faPen,
    faTimes,
];
library.add(...icons);

function App () {
    return (
        <Provider store={store}>
            <Router>
                <Route path="/" exact component={Main} />
            </Router>
        </Provider>
    );
}

export default App;
