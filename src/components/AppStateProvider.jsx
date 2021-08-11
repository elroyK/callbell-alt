import React, { createContext, useEffect, useState } from 'react';
import { Trello } from 'react-trello-client';
import { node } from 'prop-types';

export const AppStateContext = createContext(null);

export default function AppStateProvider({ children, ...props }) {
    const [trelloToken, setTrelloToken] = useState(null);
    const [selectedBoard, setSelectedBoard] = useState(null)

    useEffect(() => {
        if (!Trello.token()) {
            Trello.setToken(window.localStorage.trello_token);
        }
        setTrelloToken(window.localStorage.trello_token);
    }, []);

    const defaultState = {
        trelloToken,
        setTrelloToken,
        selectedBoard,
        setSelectedBoard,
    }

    return (
        <AppStateContext.Provider value={{
            ...defaultState,
            ...props,
        }}
        >
            {children}
        </AppStateContext.Provider>
    );
}

AppStateProvider.propTypes = {
    children : node.isRequired,
};
