import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import theme from './theme.js';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Main from './components/Main';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faComments, faPen, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { createGlobalStyle } from 'styled-components';

const store = configureStore();

const icons = [
    faComments,
    faPlus,
    faPen,
    faTimes,
];
library.add(...icons);

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        height: 100vh;
        color: ${theme.colorBasic};
        font-size: ${theme.fontSizeBasic};
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
        "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
        sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
`;

function App () {
    return (
        <Provider store={store}>
            <GlobalStyle />
            <Main />
        </Provider>
    );
}

export default App;
