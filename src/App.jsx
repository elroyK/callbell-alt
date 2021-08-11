import React from 'react';
import { Global } from "@emotion/react";
import ErrorBoundary from './components/ErrorBoundary';
import AppStateProvider from './components/AppStateProvider';
import Home from './components/Home';
import Layout from './components/Layout';
import colors from './enums/colors';

const globalStyle = () => ({
    body : {
        backgroundColor : colors.black,
        color           : colors.white,
        fontFamily      : 'OpenSans',
        fontSize        : '12px',
        height          : '100vh',
        width           : '100vw',
    },

    '.trello-login-button' : {
        borderRadius : '3px',
        color        : colors.white,
        background   : colors.accent,
        border       : `1px solid ${colors.accent} !important`,
        transition   : 'all .2s ease-in-out',
        outline      : 'none',
        padding      : '.5rem 1rem',
        boxShadow    : 'none',
        fontSize     : '1rem',
        fontWeight   : 'bold',

        '&:hover' : {
            background : `${colors.white} !important`,
            color      : `${colors.accent} !important`,
            cursor     : 'pointer !important',
        }
    },

    '*' : {
        margin    : 0,
        padding   : 0,
        boxSizing : 'border-box',
    },
})

const App = () => {
    console.log(process.env.REACT_APP_TRELLO_KEY)
    return (
        <>
            <Global styles={globalStyle()} />
            <ErrorBoundary>
                <AppStateProvider>
                    <Layout>
                        <Home />
                    </Layout>
                </AppStateProvider>
            </ErrorBoundary>
        </>
    );
}

export default App;