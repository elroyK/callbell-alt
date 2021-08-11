import { func, object } from 'prop-types';
import React from 'react';
import { useDrag } from 'react-dnd';
import dragTypes from '../enums/dragTypes';
import methods from '../enums/methods';
import fetchTrelloAPI from '../utils/fetchTrelloAPI';
import IconButton from './IconButton';

const cardStyle = isGrabbing => ({
    background     : 'rgba(255,255,255,.2)',
    borderRadius   : '3px',
    padding        : '1.5rem',
    margin         : '.5rem 0',
    transition     : 'all .2s ease-in-out',
    display        : 'flex',
    justifyContent : 'space-between',
    cursor         : isGrabbing ? 'grabbing' : 'grab',
    opacity        : isGrabbing ? 0.3 : 1,

    '&:hover' : {
        background : 'rgba(255,255,255,.3)',
    }
})

const Card = ({ card, callback }) => {
    const deleteCard = () => {
        fetchTrelloAPI(`/cards/${card.id}`, methods.DELETE, {}, callback)
    };

    const [{ isDragging }, drag] = useDrag({
        type : dragTypes.CARD,
        item : {
            type   : dragTypes.CARD,
            id     : card.id,
            object : card,
        },
        collect : monitor => ({
            isDragging : monitor.isDragging(),
        }),
        end : (target, monitor) => {
            if (monitor.didDrop()) {
                const { idList, dropCallback } = monitor.getDropResult();
                const params = {
                    idList,
                };
                fetchTrelloAPI(`/cards/${card.id}`, methods.PUT, params, () => {
                    callback();
                    dropCallback();
                });
            }
        },
    });

    return (
        <div css={cardStyle(isDragging)} ref={drag}>
            <h4>
                {card.name}
            </h4>
            <div>
                <IconButton type="trash" onClick={deleteCard} />
            </div>
        </div>
    );
}

Card.propTypes = {
    card     : object.isRequired,
    callback : func.isRequired,
};

export default Card;