import React from 'react';
import useAppState from '../hooks/useAppState';
import Board from '../elements/Board';
import BoardPicker from '../elements/BoardPicker';
import Login from '../elements/Login';

const homeStyle = isBoardSelected => ({
    height         : '100vh',
    width          : '100%',
    display        : 'flex',
    flexDirection  : 'column',
    justifyContent : 'center',
    alignItems     : isBoardSelected ? 'flex-start' : 'center',
});

const Home = () => {
    const {
        trelloToken,
        selectedBoard,
    } = useAppState();

    if (!trelloToken) {
        return (
            <div css={homeStyle(false)}>
                <Login />
            </div>
        )
    }

    return (
        <div css={homeStyle(selectedBoard)}>
            {selectedBoard ? <Board /> : <BoardPicker />}
        </div>
    )
};

export default Home;
