import React, { useEffect, useState } from 'react';
import { Trello } from 'react-trello-client';
import useAppState from '../hooks/useAppState';
import Button from './Button';

const boardPickerStyle = () => ({
    display        : 'flex',
    flexDirection  : 'column',
    justifyContent : 'center',
    alignItems     : 'center',
})

const buttonContainerStyle = () => ({
    display       : 'flex',
    flexDirection : 'column',

    button : {
        margin : '.5rem 0'
    }
})

const BoardPicker = () => {
    const {
        setSelectedBoard,
    } = useAppState();
    const [boards, setBoards] = useState(null);

    useEffect(() => {
        Trello.get('/members/me/boards', res => setBoards(res), error => console.log(error));
    }, [])

    return (
        <div css={boardPickerStyle}>
            <h2>Please select a board</h2>
            <div css={buttonContainerStyle}>
                {boards && boards.map(board => (
                    <Button type="button" onClick={() => setSelectedBoard(board)} key={`button_${board.id}`}>
                        {board.name}
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default BoardPicker;
