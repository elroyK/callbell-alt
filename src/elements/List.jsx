import React, { useCallback, useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import { Trello } from 'react-trello-client';
import { object } from 'prop-types';
import Card from './Card';
import AddCard from './AddCard';
import dragTypes from '../enums/dragTypes';
import colors from '../enums/colors';

const listStyle = isOver => ({
    background   : 'rgba(255,255,255,.2)',
    borderRadius : '10px',
    padding      : '1rem',
    border       : '3px solid',
    borderColor  : isOver ? colors.accent : 'rgba(255,255,255,.2)'
});

const List = ({ list }) => {
    const [cards, setCards] = useState(null);

    const refreshList = useCallback(() => {
        Trello.get(`/lists/${list.id}/cards`, res => setCards(res), error => console.log(error));
    });

    useEffect(() => {
        refreshList();
    }, [])

    const [{ isOver }, drop] = useDrop({
        accept  : [dragTypes.CARD],
        canDrop : () => true,
        drop    : () => {
            return ({
                idList        : list.id,
                dropCallback  : () => refreshList(),
                currentObject : object,
            })
        },
        collect : monitor => ({
            isOver  : !!monitor.isOver(),
            canDrop : true,
        }),
    });

    return (
        <div css={listStyle(isOver)} ref={drop}>
            <h3>{list.name}</h3>
            {cards && cards.map(card => (
                <Card key={`card_${card.id}`} card={card} callback={refreshList} />
            ))}
            <AddCard idList={list.id} callback={refreshList} />
        </div>
    );
};

List.propTypes = {
    list : object.isRequired,
};

export default List;
