import React from 'react';
import TrelloClient from "react-trello-client";
import colors from '../enums/colors';
import useAppState from '../hooks/useAppState';

const loginStyle = () => ({
    display        : 'flex',
    flexDirection  : 'column',
    justifyContent : 'center',
    alignItems     : 'center',

    'h1, h3' : {
        marginBottom : '1rem',
    }
})

const buttonStyle = () => ({
    borderRadius : '3px',
    color        : colors.white,
    background   : colors.accent,
    borderSize   : '1px',
    borderColor  : colors.accent,
    transition   : 'all .2s ease-in-out',
    padding      : '.5rem 1rem',
    fontSize     : '1rem',
    fontWeight   : 'bold',
})

const Login = () => {
    const { setTrelloToken } = useAppState();

    console.log(process.env.REACT_APP_TRELLO_KEY);

    return (
        <div css={loginStyle()}>
            <h1>Trello Clone</h1>
            <h3>Please login to use the app</h3>
            <TrelloClient
                apiKey={process.env.REACT_APP_TRELLO_KEY}
                clientVersion={1}
                apiEndpoint="https://api.trello.com"
                authEndpoint="https://trello.com"
                intentEndpoint="https://trello.com"
                authorizeName="React Trello Client Example"
                authorizeType="popup"
                authorizePersist
                authorizeInteractive
                authorizeScopeRead
                authorizeScopeWrite
                authorizeScopeAccount
                authorizeExpiration="never"
                authorizeOnSuccess={() => setTrelloToken(window.localStorage.trello_token)}
                authorizeOnError={() => console.log("Login error!")}
                autoAuthorize={false}
                authorizeButton
                buttonStyle="flat"
                buttonText="Login with Trello"
                buttonCustomStyles={buttonStyle()}
            />
        </div>
    );
}

export default Login;
