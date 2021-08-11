import React, { useEffect, useState } from 'react';
import { Trello } from 'react-trello-client';
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';
import { HTML5Backend } from 'react-dnd-html5-backend';
import isMobile from 'ismobilejs';
import useAppState from '../hooks/useAppState';
import List from './List';

const boardStyle = () => ({
    height  : '100%',
    width   : '100%',
    padding : '1rem',

    h2 : {
        marginBottom : '1rem',
    }
});

const listContainerStyle = listAmount => ({
    display             : 'grid',
    gridTemplateRows    : '1fr',
    gridTemplateColumns : `repeat(${listAmount}, 1fr)`,
    columnGap           : '1rem',
})

const Board = () => {
    const {
        selectedBoard,
    } = useAppState();

    const [lists, setLists] = useState(null);

    const { userAgent } = navigator;
    const backend = isMobile(userAgent).any ? TouchBackend : HTML5Backend;

    const providerOpts = {};

    useEffect(() => {
        Trello.get(`/boards/${selectedBoard.id}/lists`, res => setLists(res), error => console.log(error));
    }, [])

    return (
        <div css={boardStyle()}>
            <h2>Board {selectedBoard.name}</h2>
            {lists && (
                <DndProvider backend={backend} options={providerOpts}>
                    <div css={listContainerStyle(lists.length)}>
                        {lists.map(list => (
                            <List list={list} key={`list_${list.id}`} />
                        ))}
                    </div>
                </DndProvider>
            )}
        </div>
    );
};

export default Board;
